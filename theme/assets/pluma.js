/**
 * TinyBloom, progressive enhancement.
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
   * `overflow-x: clip` is set on the root, on body, on main and on every
   * section, and `body { position: relative }` now makes body the containing
   * block so that clip reaches absolutely positioned boxes too. This stays as
   * the runtime backstop for whatever still gets through: a third party script,
   * an app embed, a section added later. It snaps the page back to rest.
   *
   * An earlier version of this comment blamed `position: fixed`. That was
   * wrong, and measuring said so: Chromium contains fixed boxes in both
   * directions. It is `position: absolute` escaping to the left that widens an
   * RTL document.
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
    var vv = window.visualViewport;

    // While someone is zoomed in, panning sideways is the only way to reach the
    // rest of the page. Snapping them back there does not lock the page, it
    // traps them in the left hand column. The lock only applies at rest.
    function isZoomed() {
      return !!vv && vv.scale > 1.01;
    }

    function snapBack() {
      if (isZoomed()) return;
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
    // Re-engage the moment the pinch ends and the page is back at scale 1.
    if (vv) {
      vv.addEventListener('resize', snapBack);
      vv.addEventListener('scroll', snapBack);
    }
    snapBack();
  }

  /**
   * Overflow diagnostic, opt in with `?pldebug=1`.
   *
   * The storefront cannot be reached from the environment this theme is
   * developed in, so when a phone shows sideways drift there is no way to
   * inspect it remotely. This paints the answer onto the page instead: the
   * document width, the viewport width, and the boxes that cross either edge,
   * innermost first, skipping anything inside a scroller because a rail that
   * scrolls is doing its job. Tap the panel to dismiss it.
   *
   * Inert without the parameter. Nothing below runs on a normal page load.
   */
  function debugOverflow() {
    if (!/[?&]pldebug=1\b/.test(window.location.search)) return;

    function label(el) {
      var out = el.tagName.toLowerCase();
      if (el.id) out += '#' + el.id;
      if (typeof el.className === 'string' && el.className.trim()) {
        out += '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.');
      }
      return out;
    }

    function inScroller(el) {
      for (var n = el.parentElement; n && n !== document.body; n = n.parentElement) {
        var ox = getComputedStyle(n).overflowX;
        if (ox === 'auto' || ox === 'scroll') return true;
      }
      return false;
    }

    function report() {
      var root = document.documentElement;
      var vw = root.clientWidth;
      var rows = [];

      document.querySelectorAll('body *').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (!r.width && !r.height) return;
        var over = Math.max(Math.round(r.right - vw), Math.round(-r.left));
        if (over <= 1 || inScroller(el)) return;
        rows.push({ el: el, over: over, w: Math.round(r.width), pos: getComputedStyle(el).position });
      });

      rows.sort(function (a, b) { return b.over - a.over; });

      var panel = document.getElementById('pl-debug') || document.createElement('div');
      panel.id = 'pl-debug';
      panel.setAttribute('style', [
        'position:fixed', 'inset-block-start:0', 'inset-inline:0', 'z-index:2147483647',
        'background:#191713', 'color:#FBF9F5', 'font:12px/1.5 ui-monospace,monospace',
        'padding:10px 12px', 'max-height:52vh', 'overflow:auto', 'direction:ltr',
        'text-align:left', 'white-space:pre-wrap'
      ].join(';'));

      var head = 'viewport ' + vw + '  document ' + root.scrollWidth +
        (root.scrollWidth > vw ? '  OVERFLOW +' + (root.scrollWidth - vw) : '  no overflow') +
        '\nzoom ' + (window.visualViewport ? window.visualViewport.scale.toFixed(2) : 'n/a') +
        '   dir ' + (root.getAttribute('dir') || 'ltr') + '\n\n';

      panel.textContent = head + (rows.length
        ? rows.slice(0, 10).map(function (r) {
            return '+' + r.over + 'px  w=' + r.w + '  ' + r.pos + '  ' + label(r.el);
          }).join('\n')
        : 'no box crosses either edge');

      panel.addEventListener('click', function () { panel.remove(); });
      if (!panel.parentNode) document.body.appendChild(panel);
    }

    // After layout has settled: fonts, images and the header measuring script
    // all move things, and a reading taken too early names the wrong element.
    window.setTimeout(report, 600);
    window.addEventListener('resize', function () { window.setTimeout(report, 200); });
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
      debugOverflow();
    });
  } else {
    boot();
    lockHorizontalScroll();
    debugOverflow();
  }

  // Theme editor: re-scan when a section is re-rendered.
  document.addEventListener('shopify:section:load', function (event) {
    boot(event.target);
  });
})();
