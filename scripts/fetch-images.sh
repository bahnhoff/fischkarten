#!/bin/bash
# Lädt die Ersatzbilder von Wikimedia Commons nach raw/ (langsam wegen Rate-Limit).
set -u
cd "$(dirname "$0")/.."
mkdir -p raw
BASE=https://upload.wikimedia.org/wikipedia/commons/
UA="fischkarten-lernseite/1.0"
while IFS=$'\t' read -r id path; do
  ext=$(echo "${path##*.}" | tr A-Z a-z); out="raw/$id.$ext"
  [ -s "$out" ] && continue
  for try in 1 2 3; do
    code=$(curl -s -A "$UA" -o "$out" -w '%{http_code}' "$BASE$path")
    [ "$code" = 200 ] && break
    echo "$id: HTTP $code, warte" >&2; rm -f "$out"; sleep 90
  done
  echo "$id $code"
  sleep 10
done < scripts/images.tsv
