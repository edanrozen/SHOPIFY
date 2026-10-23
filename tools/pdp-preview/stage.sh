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
# Everything rendered with {% render %} is a snippet even though it sits next
# to the sections in the variant directory. wf-card was the first; the rating,
# the buy box, the icon set and the review card followed and were each missing
# here, which is why a staged preview rendered the reviews section with no
# stars and the product page with no buy box.
for f in wf-card wf-rating wf-buybox wf-icon wf-review-card; do
  cp "$SRC/$f.liquid" "$OUT/snippets/"
  rm -f "$OUT/sections/$f.liquid"
done
cp "$SRC"/wf-tokens.css "$SRC"/wf.css "$SRC"/wf-shop.css "$SRC"/wf-pdp.css "$SRC"/wf-pdp-long.css "$SRC"/wf-pdp2.css "$SRC"/wf-vow.css "$OUT/assets/"
cp "$SRC"/stylesheets.liquid   "$OUT/snippets/"
# The four header icons TinyBloom draws itself. Horizon's originals are kept
# in variants/showcase/icons-horizon/ so the swap can be undone.
cp "$SRC"/icon-cart.svg "$SRC"/icon-account.svg "$SRC"/icon-search.svg "$SRC"/icon-menu.svg "$OUT/assets/"
cp "$SRC"/header-group.json "$SRC"/footer-group.json "$OUT/sections/"
# theme/ is a partial mirror and carries no config/, so this copy failed and
# took the whole staging run with it under set -e.
mkdir -p "$OUT/config"
cp "$SRC"/settings_data.json   "$OUT/config/"
for f in "$SRC"/index.json "$SRC"/collection.json "$SRC"/product*.json; do
  cp "$f" "$OUT/templates/"
done
echo "staged $OUT"
