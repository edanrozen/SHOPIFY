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
cp "$SRC"/wf-tokens.css "$SRC"/df.css "$SRC"/df-band.css "$SRC"/df-mobile.css \
   "$SRC"/df-pdp.css "$SRC"/df-long.css "$SRC"/df-pdp.js "$OUT/assets/"
cp "$SRC"/stylesheets.liquid   "$OUT/snippets/"
cp "$SRC"/header-group.json "$SRC"/footer-group.json "$OUT/sections/"
cp "$SRC"/settings_data.json   "$OUT/config/"
cp "$SRC"/index.json "$SRC"/collection.json "$SRC"/product.json "$SRC"/product.dofek-*.json "$OUT/templates/"

# ---- retired with the previous brand ------------------------------------
# Twenty-four sections and nine product templates from the pet shop. Nothing
# on this theme renders any of them, but Shopify bundles every section
# stylesheet in a theme onto every page, so the sections alone were charging
# each visitor about 50KB of CSS for a design that is gone. They are emptied
# on the deployed theme, because the Admin API cannot delete a theme file,
# and they are emptied here so the staged tree matches it. The base theme
# under theme/ keeps the originals: the previous brand's theme is still the
# published one and still needs them.
RETIRED_SECTIONS="pl-banner pl-bundle pl-categories pl-collection pl-cta pl-faq
pl-hero pl-hero-full pl-hero-photo pl-marquee pl-problem pl-product-main
pl-product-opener pl-product-reviews pl-product-story pl-product-tabs
pl-products pl-promise pl-related pl-reviews pl-ritual pl-row pl-showcase
pl-story"
RETIRED_TEMPLATES="bloom clipper comb-daily comb-pro glove roller-wood
roller-xl scratcher toy"

for s in $RETIRED_SECTIONS; do
  cat > "$OUT/sections/$s.liquid" <<EOF
{%- comment -%}
  Retired with the previous brand. Nothing on this theme renders it, and its
  stylesheet was being bundled onto every page. Safe to delete in the editor.
{%- endcomment -%}
{% schema %}
{ "name": "$s", "settings": [] }
{% endschema %}
EOF
done

for t in $RETIRED_TEMPLATES; do
  cat > "$OUT/templates/product.$t.json" <<'EOF'
/*
 * Retired with the previous brand. No product uses this template; all five
 * carry a `dofek-` suffix. Kept only because the Admin API cannot delete a
 * theme file. Safe to delete from the theme code editor.
 */
{
  "sections": { "main": { "type": "wf-product", "settings": {} } },
  "order": ["main"]
}
EOF
done

for a in pl-story tb-fit; do
  cat > "$OUT/assets/$a.css" <<EOF
/* Retired with the previous brand. No template requests this sheet. */
EOF
done

echo "staged $OUT"
