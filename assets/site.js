/* Shared behaviour: nav border on scroll, reveal on view, chapter highlighting.
   Content is fully visible without JS; this only adds polish. */
(function () {
  var d = document, rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.documentElement.classList.add('js');

  var nav = d.querySelector('.nav');
  if (nav) {
    var onS = function () { nav.classList.toggle('sc', scrollY > 8); };
    addEventListener('scroll', onS, { passive: true }); onS();
  }

  var rv = d.querySelectorAll('.rv');
  if (rm || !('IntersectionObserver' in window)) rv.forEach(function (e) { e.classList.add('in'); });
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: .01 });
    rv.forEach(function (e) { io.observe(e); });
    /* safety: never leave content hidden */
    setTimeout(function () { rv.forEach(function (e) { e.classList.add('in'); }); }, 2500);
  }

  var links = d.querySelectorAll('.toc a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { var t = d.getElementById(a.getAttribute('href').slice(1)); if (t) map[t.id] = a; });
    var cur;
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          if (cur) cur.classList.remove('on');
          cur = map[e.target.id];
          if (cur) { cur.classList.add('on'); var ol = cur.closest('ol'); if (ol) ol.scrollLeft = Math.max(0, cur.offsetLeft - 24); }
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { so.observe(d.getElementById(id)); });
  }

  /* small screens: the section list folds into a "Sections" menu */
  var toc = d.querySelector('.toc'), tb = toc && toc.querySelector('.tb');
  if (tb) {
    var cur = tb.querySelector('.cur');
    tb.addEventListener('click', function () {
      var open = toc.classList.toggle('open'); tb.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    toc.querySelectorAll('ol a').forEach(function (a) { a.addEventListener('click', function () {
      toc.classList.remove('open'); tb.setAttribute('aria-expanded', 'false');
    }); });
    var mo = new MutationObserver(function () { var on = toc.querySelector('ol a.on'); if (cur && on) cur.textContent = on.textContent; });
    toc.querySelectorAll('ol a').forEach(function (a) { mo.observe(a, { attributes: true, attributeFilter: ['class'] }); });
  }

  var y = d.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
})();
