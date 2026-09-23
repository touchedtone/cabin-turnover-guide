#!/bin/bash
# Renders dist/print.html to dist/turnover-guide.pdf with headless Chrome (macOS).
set -e
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --allow-file-access-from-files --no-pdf-header-footer \
  --print-to-pdf="$PWD/dist/turnover-guide.pdf" "file://$PWD/dist/print.html"
echo "-> dist/turnover-guide.pdf"
