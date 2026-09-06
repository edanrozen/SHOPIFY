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
    });
  } else {
    boot();
  }

  // Theme editor: re-scan when a section is re-rendered.
  document.addEventListener('shopify:section:load', function (event) {
    boot(event.target);
  });
})();
