#!/bin/bash
# Screenshot einer Seite: scripts/shot.sh "<pfad?query>" out.png [breite] [höhe]
# Erwartet einen laufenden Server: python3 -m http.server 8765 (im Projektordner).
url="http://localhost:8765/$1"; out="$2"; w="${3:-1440}"; h="${4:-900}"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=3000 --window-size="$w,$h" --screenshot="$out" "$url" >/dev/null 2>&1
echo "$out"
