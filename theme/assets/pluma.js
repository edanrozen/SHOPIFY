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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
    });
  } else {
    init();
  }

  // Theme editor: re-scan when a section is re-rendered.
  document.addEventListener('shopify:section:load', function (event) {
    init(event.target);
  });
})();
