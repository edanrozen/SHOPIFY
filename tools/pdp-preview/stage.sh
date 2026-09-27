#!/bin/sh
# Assembles a renderable theme tree from the showcase variant on top of the
# base theme, so the harness measures what is actually deployed rather than
# the stale `theme/` mirror. Points at a scratch dir; nothing in the repo moves.
set -e
SRC=variants/showcase
OUT=${1:?usage: stage.sh <out-dir>}
rm -rf "$OUT"
cp -r theme "$OUT"
cp "$SRC"/wf-*.liquid          "$OUT/sections/"
cp "$SRC"/wf.css "$SRC"/wf-pdp.css "$OUT/assets/"
cp "$SRC"/stylesheets.liquid   "$OUT/snippets/"
cp "$SRC"/header-group.json "$SRC"/footer-group.json "$OUT/sections/"
cp "$SRC"/settings_data.json   "$OUT/config/"
for f in "$SRC"/index.json "$SRC"/collection.json "$SRC"/product*.json; do
  cp "$f" "$OUT/templates/"
done
echo "staged $OUT"
