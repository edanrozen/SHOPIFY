# The plain version

A throwaway look at the store wearing an ordinary shop layout: one picture, a
line, a button, a grid of everything, three facts. It exists to be judged, not
to be built on.

It lives in its own Shopify theme rather than in `theme/`, because it replaces
the homepage wholesale and shares nothing with the design system. Keeping it
out of `theme/` is what stops it drifting into the real store by accident.

  theme    בייסיק · גרסה פשוטה לתצוגה   (unpublished)
  files    sections/bs-home.liquid, templates/index.json,
           plus the cleaned header-group.json and footer-group.json

Nothing here is loaded by the main theme. `bs-home.liquid` is scoped entirely
under `.bs`, uses system fonts, and carries no animation, shadow or gradient.
