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
# wf-card.liquid is rendered with {% render %}, so it is a snippet even though
# it sits next to the sections in the variant directory. It was only being
# copied into sections/, which is why every local preview came back with an
# empty product grid and no card was ever measured here.
cp "$SRC"/wf-card.liquid       "$OUT/snippets/"
cp "$SRC"/wf.css "$SRC"/wf-pdp.css "$OUT/assets/"
cp "$SRC"/stylesheets.liquid   "$OUT/snippets/"
cp "$SRC"/header-group.json "$SRC"/footer-group.json "$OUT/sections/"
cp "$SRC"/settings_data.json   "$OUT/config/"
for f in "$SRC"/index.json "$SRC"/collection.json "$SRC"/product*.json; do
  cp "$f" "$OUT/templates/"
done
echo "staged $OUT"
