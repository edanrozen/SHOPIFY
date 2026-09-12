# Responsive checks

Three Chromium checks over the theme's own CSS. They exist because the storefront
is not reachable from the sandbox this repo is worked on from, so "it looks fine
on my phone" cannot be the test.

```
npm i playwright                       # the browser itself is already on disk
node tools/responsive-check/build.js   # bundle the CSS and the markup
node tools/responsive-check/measure.js # horizontal overflow at 320/375/390/430
node tools/responsive-check/probe.js   # box sizes of the elements that matter
node tools/responsive-check/desktop-diff.js  # proves a change left desktop alone
```

`desktop-diff.js` renders `git show HEAD:theme/assets/pluma.css` against the
working copy at 900, 1024, 1280 and 1440 and diffs every box on the page. Run it
before pushing any CSS change that is meant to be mobile only.

## What they do not cover

Horizon's own stylesheets, the header, the footer and the cart drawer. The
fragments are built from this theme's sections only, so a regression that comes
from Horizon will not show up here.

## The reset

`reset.css` carries the parts of Horizon's `base.css` that `pluma.css` leans on,
mainly `box-sizing: border-box` and `img { max-width: 100% }`. Without it every
padded box measures one gutter too wide on each side and the results are noise.
