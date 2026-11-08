/* DOFEK, the product page's behaviour.
 *
 * Four jobs, in one file, with no dependency on the theme's own scripts:
 * the gallery, the lightbox, the option pickers and the add to cart.
 *
 * Everything here is an enhancement. The page it runs on is already a
 * working product page: the first photograph is visible, the <select>
 * carries every variant, and the form posts to /cart/add on its own. If
 * this file fails to load, nothing below breaks, it just stops being nice.
 */
(function () {
  'use strict';

  var root = document.querySelector('.dp');
  if (!root) return;

  var $ = function (sel, el) { return (el || root).querySelector(sel); };
  var $$ = function (sel, el) { return Array.prototype.slice.call((el || root).querySelectorAll(sel)); };

  /* ---------------------------------------------------------- gallery */
  var frames = $$('.dp__frame');
  var thumbs = $$('[data-dp-thumb]');

  function show(i) {
    frames.forEach(function (f, n) {
      if (n === i) { f.setAttribute('data-on', ''); } else { f.removeAttribute('data-on'); }
    });
    thumbs.forEach(function (t, n) { t.setAttribute('aria-current', n === i ? 'true' : 'false'); });
  }
  thumbs.forEach(function (t) {
    t.addEventListener('click', function () { show(Number(t.getAttribute('data-dp-thumb'))); });
  });

  /* --------------------------------------------------------- lightbox */
  var box = null;
  function closeBox() {
    if (!box) return;
    box.removeAttribute('open');
    document.documentElement.style.overflow = '';
  }
  function lightbox(src, alt) {
    if (!box) {
      box = document.createElement('div');
      box.className = 'dp-lb';
      box.innerHTML = '<button type="button" class="dp-lb__x" aria-label="סגירה">×</button><img alt="">';
      document.body.appendChild(box);
      box.addEventListener('click', function (e) {
        if (e.target === box || e.target.classList.contains('dp-lb__x')) closeBox();
      });
    }
    var img = box.querySelector('img');
    img.src = src;
    img.alt = alt || '';
    box.setAttribute('open', '');
    document.documentElement.style.overflow = 'hidden';
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBox(); });
  frames.forEach(function (f) {
    var img = f.querySelector('img');
    if (!img) return;
    img.addEventListener('click', function () { lightbox(img.getAttribute('data-full') || img.src, img.alt); });
  });

  /* ---------------------------------------------------------- pickers */
  var form = $('form');
  var select = $('[data-dp-select]');
  var fallback = $('[data-dp-fallback]');
  var pickers = $('[data-dp-pickers]');
  var priceEl = $('[data-dp-price]');
  var atc = $('[data-dp-atc]');
  var qty = $('[data-dp-qtyin]');
  var barPrice = document.querySelector('[data-dp-barprice]');
  var barVariant = document.querySelector('[data-dp-barvariant]');

  var data = [];
  try { data = JSON.parse($('[data-dp-variants]').textContent); } catch (e) { data = []; }

  if (select && pickers && data.length) {
    fallback.hidden = true;
    pickers.hidden = false;

    var groups = $$('[data-dp-opt]', pickers);

    var chosen = function () {
      return groups.map(function (fs) {
        var hit = fs.querySelector('input:checked');
        return hit ? hit.value : null;
      });
    };

    /* Is there a live variant whose option `i` is `value`, given the picks
       in the groups to its LEFT only?

       The "to its left" is the whole trick, and it was a bug before it was a
       rule. Constraining every group by every other group reads as symmetric
       and fair, and it traps people: the grounding shoe comes in 47 only in
       black, so a shopper who picked 47 and then wanted the white pair found
       the white swatch disabled, with no way back except to guess that the
       size was the thing blocking them. Now the first group is never
       constrained, each later group narrows against the ones before it, and
       `repair` moves the later picks when an earlier one changes under
       them. */
    var liveWith = function (i, value, picked) {
      return data.some(function (v) {
        if (!v.a || v.o[i] !== value) return false;
        for (var n = 0; n < i; n++) {
          if (picked[n] !== null && v.o[n] !== picked[n]) return false;
        }
        return true;
      });
    };

    /* A combination that does not exist is struck through rather than
       removed. A size that vanishes when a colour is picked reads as a
       broken page; a struck-through size reads as a size that is gone. */
    var mark = function () {
      var picked = chosen();
      groups.forEach(function (fs, i) {
        $$('input[type=radio]', fs).forEach(function (r) {
          var ok = liveWith(i, r.value, picked);
          r.disabled = !ok;
          var face = r.nextElementSibling;
          if (face && face.classList.contains('dp__size')) face.classList.toggle('dp__size--out', !ok);
        });
      });
    };

    /* After a pick, the groups to its right may point at a combination that
       no longer exists. Move each of them to its first live value rather
       than leaving the form on a variant that cannot be bought. */
    var repair = function () {
      var picked = chosen();
      for (var i = 0; i < groups.length; i++) {
        if (picked[i] !== null && liveWith(i, picked[i], picked)) continue;
        var radios = $$('input[type=radio]', groups[i]);
        for (var k = 0; k < radios.length; k++) {
          if (!liveWith(i, radios[k].value, picked)) continue;
          radios[k].checked = true;
          picked[i] = radios[k].value;
          break;
        }
      }
    };

    var sync = function () {
      repair();
      var picked = chosen();
      var hit = null;
      for (var i = 0; i < data.length; i++) {
        var match = true;
        for (var n = 0; n < picked.length; n++) {
          if (data[i].o[n] !== picked[n]) { match = false; break; }
        }
        if (match) { hit = data[i]; break; }
      }
      if (hit) {
        select.value = String(hit.id);
        if (priceEl) priceEl.textContent = hit.p;
        if (barPrice) barPrice.textContent = hit.p;
        if (barVariant) barVariant.textContent = hit.t;
        if (atc) {
          atc.disabled = !hit.a;
          atc.textContent = hit.a ? atc.getAttribute('data-label') : 'אזל מהמלאי';
        }
        try {
          var url = new URL(window.location.href);
          url.searchParams.set('variant', String(hit.id));
          window.history.replaceState({}, '', url);
        } catch (e) { /* a replaceState that fails costs the page nothing */ }
      }
      mark();
    };

    if (atc) atc.setAttribute('data-label', atc.textContent.trim());
    $$('input[type=radio]', pickers).forEach(function (r) { r.addEventListener('change', sync); });
    sync();
  }

  /* --------------------------------------------------------- quantity */
  $$('[data-dp-qty]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!qty) return;
      var n = parseInt(qty.value, 10);
      if (isNaN(n)) n = 1;
      qty.value = Math.max(1, n + Number(b.getAttribute('data-dp-qty')));
    });
  });

  /* ------------------------------------------------------- add to cart
     The form still posts on its own if anything at all goes wrong: a
     network failure, a cart rule, an app that rejects the line. The AJAX
     path is taken only when the server answers 2xx. */
  var done = $('[data-dp-done]');
  if (form && window.fetch && select) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var label = atc ? atc.textContent : '';
      if (atc) { atc.disabled = true; atc.textContent = 'מוסיף…'; }

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items: [{ id: Number(select.value), quantity: Number(qty ? qty.value : 1) || 1 }] })
      })
        .then(function (r) { return r.ok ? r.json() : Promise.reject(r); })
        .then(function () {
          if (atc) { atc.disabled = false; atc.textContent = label; }
          if (done) done.setAttribute('data-on', '');
          /* The theme owns the cart drawer and the header count. Rather
             than reach into its internals, which change between theme
             versions, the page announces the change in the shapes Shopify
             themes listen for and lets whichever one is wired respond. */
          ['cart:refresh', 'cart:update', 'cart-update'].forEach(function (name) {
            document.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: { source: 'df-pdp' } }));
          });
          fetch('/cart.js')
            .then(function (r) { return r.json(); })
            .then(function (cart) {
              var sel = '[data-cart-count], .cart-count, .header__cart-count, .cart-bubble__text';
              document.querySelectorAll(sel).forEach(function (el) { el.textContent = cart.item_count; });
            })
            .catch(function () {});
        })
        .catch(function () {
          if (atc) { atc.disabled = false; atc.textContent = label; }
          form.submit();
        });
    });
  }

  /* ------------------------------------------------- the standing bar
     Measured on scroll rather than observed.

     An IntersectionObserver fires when an element crosses the viewport
     edge, and one scroll can skip the crossing entirely: jump from the top
     of this page to 2000px and the button goes from below the fold to
     above it without ever being inside, so `isIntersecting` never changes
     and the callback never runs. The bar then stays hidden for the rest of
     the page. A rect read behind requestAnimationFrame has no such hole
     and costs one measurement a frame while the finger is moving. */
  var bar = document.querySelector('[data-dp-bar]');
  var watch = $('.dp__buyrow') || $('.dp__buy');
  if (bar && watch) {
    var queued = false;
    var paint = function () {
      queued = false;
      var on = watch.getBoundingClientRect().bottom < 0;
      if (on === (bar.classList.contains('is-on'))) return;
      bar.classList.toggle('is-on', on);
      bar.setAttribute('aria-hidden', on ? 'false' : 'true');
      var b = bar.querySelector('button');
      if (b) b.tabIndex = on ? 0 : -1;
    };
    var queue = function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(paint);
    };
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    paint();
  }
})();
