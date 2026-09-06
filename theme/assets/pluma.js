/**
 * PLUMA — progressive enhancement.
 * Reveals `.pl-reveal` elements once, on first intersection. No dependencies,
 * no layout thrash: everything runs off a single IntersectionObserver.
 */
(function () {
  'use strict';

  var SELECTOR = '.pl-reveal';

  function revealAll(root) {
    (root || document).querySelectorAll(SELECTOR).forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  function init(root) {
    var scope = root || document;
    var targets = scope.querySelectorAll(SELECTOR + ':not(.is-in)');
    if (!targets.length) return;

    // No IntersectionObserver (or reduced motion): show everything immediately.
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      revealAll(scope);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * Product cards ship their hover image without a src. Fetch it only where a
   * pointer can actually hover, so phones never pay for an image they cannot
   * reach. Runs on idle: this is decoration, never the critical path.
   */
  function loadHoverImages(root) {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    (root || document).querySelectorAll('img[data-pl-src]').forEach(function (img) {
      img.src = img.dataset.plSrc;
      img.removeAttribute('data-pl-src');
    });
  }

  /**
   * Horizontal scroll lock, the part CSS cannot do.
   *
   * `overflow-x: clip` is set on the root, on body, on the main wrapper and on
   * every section, but none of that clips a `position: fixed` element: its
   * containing block is the viewport, not body. An off screen panel parked
   * outside the window still widens the document, and the page can then be
   * dragged sideways into an empty margin. This snaps it back.
   *
   * Zero is the resting position in both directions: RTL rests at 0 and goes
   * negative to the left, LTR rests at 0 and goes positive to the right.
   *
   * It never fights the horizontal rails. Swiping a rail scrolls that element,
   * not the window, so scrollLeft stays at 0 and nothing here runs. While the
   * CSS is doing its job this listener costs one comparison per scroll event.
   */
  function lockHorizontalScroll() {
    var page = document.scrollingElement || document.documentElement;

    function snapBack() {
      if (page.scrollLeft === 0) return;
      // `scroll-behavior: smooth` is set globally for in page anchors, and a
      // plain scrollLeft assignment would inherit it and animate the
      // correction. This has to be instant to be invisible.
      try {
        page.scrollTo({ left: 0, top: page.scrollTop, behavior: 'instant' });
      } catch (e) {
        page.scrollLeft = 0;
      }
    }

    window.addEventListener('scroll', snapBack, { passive: true });
    window.addEventListener('resize', snapBack, { passive: true });
    window.addEventListener('orientationchange', snapBack, { passive: true });
    snapBack();
  }

  function boot(root) {
    init(root);
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(function () { loadHoverImages(root); });
    } else {
      window.setTimeout(function () { loadHoverImages(root); }, 400);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      boot();
      lockHorizontalScroll();
    });
  } else {
    boot();
    lockHorizontalScroll();
  }

  // Theme editor: re-scan when a section is re-rendered.
  document.addEventListener('shopify:section:load', function (event) {
    boot(event.target);
  });
})();
