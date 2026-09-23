#!/bin/bash
# Renders dist/print.html -> dist/turnover-guide.pdf with headless Chrome (macOS locally, google-chrome in CI).
set -e
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --no-sandbox --disable-gpu --allow-file-access-from-files --no-pdf-header-footer \
  --print-to-pdf="$PWD/dist/turnover-guide.pdf" "file://$PWD/dist/print.html"
echo "-> dist/turnover-guide.pdf"
