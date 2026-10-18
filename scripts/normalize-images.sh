#!/bin/bash
# Wandelt raw/<id>.* in img/<id>.jpg um (max. 1200 px breit, weißer Hintergrund).
# Spiegeln nach Ansicht: scripts/normalize-images.sh --flip <id> ...
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ "${1:-}" = --flip ]; then shift; for id in "$@"; do sips -f horizontal "img/$id.jpg" >/dev/null; echo "gespiegelt $id"; done; exit; fi
mkdir -p img
for f in raw/*; do
  id=$(basename "${f%.*}"); out="img/$id.jpg"
  [ -s "$out" ] && continue
  case "$f" in
    *.svg|*.png)
      # Mit Chrome auf weißem Hintergrund rendern (Transparenz wird weiß), Höhe nach Seitenverhältnis
      if [ "${f##*.}" = svg ]; then
        tag=$(tr '\n' ' ' < "$f" | grep -o '<svg[^>]*>' | head -1)
        w=$(echo "$tag" | grep -oE ' width="[0-9.]+' | grep -oE '[0-9.]+$'); h=$(echo "$tag" | grep -oE ' height="[0-9.]+' | grep -oE '[0-9.]+$')
        if [ -z "$w" ]; then read -r w h < <(echo "$tag" | grep -o 'viewBox="[^"]*"' | tr -d '"' | awk '{print $3, $4}'); fi
      else
        w=$(sips -g pixelWidth "$f" | awk '/pixelWidth/{print $2}'); h=$(sips -g pixelHeight "$f" | awk '/pixelHeight/{print $2}')
      fi
      H=$(awk -v w="$w" -v h="$h" 'BEGIN{printf "%d", 1200*h/w}')
      printf '<html><body style="margin:0;background:#fff"><img src="%s" style="width:1200px;display:block"></body></html>' "$(pwd)/$f" > /tmp/imgwrap.html
      "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --window-size=1200,$H --screenshot=/tmp/imgwrap.png "file:///tmp/imgwrap.html" >/dev/null 2>&1
      sips -s format jpeg /tmp/imgwrap.png --out "$out" >/dev/null ;;
    *) sips -s format jpeg -Z 1200 "$f" --out "$out" >/dev/null ;;
  esac
  echo "$out"
done
