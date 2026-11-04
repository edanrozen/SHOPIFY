#!/bin/sh
# Assembles a renderable DOFEK tree: the base theme, the showcase variant on
# top of it, then the DOFEK layer on top of that. The middle layer is kept
# because DOFEK inherits the whole catalogue and product-page system from it
# and only replaces the palette, the home page and the two group files.
set -e
BASE=variants/showcase
SRC=variants/dofek
OUT=${1:?usage: stage-dofek.sh <out-dir>}
rm -rf "$OUT"
cp -r theme "$OUT"
mkdir -p "$OUT/config"

# ---- the showcase layer --------------------------------------------------
cp "$BASE"/wf-*.liquid "$OUT/sections/"
for f in wf-card wf-rating wf-buybox wf-icon wf-review-card; do
  cp "$BASE/$f.liquid" "$OUT/snippets/"
  rm -f "$OUT/sections/$f.liquid"
done
cp "$BASE"/wf.css "$BASE"/wf-shop.css "$BASE"/wf-pdp.css "$BASE"/wf-pdp-long.css \
   "$BASE"/wf-pdp2.css "$BASE"/wf-vow.css "$OUT/assets/"
cp "$BASE"/icon-cart.svg "$BASE"/icon-account.svg "$BASE"/icon-search.svg "$BASE"/icon-menu.svg "$OUT/assets/"
for f in "$BASE"/collection.json "$BASE"/product*.json; do cp "$f" "$OUT/templates/"; done

# ---- the DOFEK layer -----------------------------------------------------
cp "$SRC"/df-*.liquid          "$OUT/sections/"
cp "$SRC"/wf-tokens.css "$SRC"/df.css "$SRC"/df-mobile.css \
   "$SRC"/df-pdp.css "$SRC"/df-long.css "$SRC"/df-pdp.js "$OUT/assets/"
cp "$SRC"/stylesheets.liquid   "$OUT/snippets/"
cp "$SRC"/header-group.json "$SRC"/footer-group.json "$OUT/sections/"
cp "$SRC"/settings_data.json   "$OUT/config/"
cp "$SRC"/index.json "$SRC"/collection.json "$SRC"/product.dofek-*.json "$OUT/templates/"
echo "staged $OUT"
