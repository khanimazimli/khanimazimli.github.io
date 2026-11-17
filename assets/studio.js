/* The Decision Studio · shared behaviour */
(function () {
  var d = document, root = d.documentElement;
  root.classList.add('js');
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.KA = { reduced: RM };

  /* nav background once the page scrolls */
  var nav = d.querySelector('.nav');
  function onScroll() { if (nav) nav.classList.toggle('sc', scrollY > 24); }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* reveal on scroll */
  var els = [].slice.call(d.querySelectorAll('[data-rv]'));
  if (RM || !('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
    /* safety: never leave content hidden */
    setTimeout(function () { els.forEach(function (e) { e.classList.add('in'); }); }, 3000);
  }

  /* run a callback once when an element first becomes visible */
  window.KA.onView = function (el, fn, margin) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var o = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { o.disconnect(); fn(); }
    }, { rootMargin: margin || '0px 0px -15% 0px', threshold: 0.15 });
    o.observe(el);
  };

  /* report whether an element is on screen, for animation loops that should pause off-screen */
  window.KA.watch = function (el, fn) {
    if (!el || !('IntersectionObserver' in window)) { fn(true); return; }
    new IntersectionObserver(function (en) { fn(en[0].isIntersecting); }, { threshold: 0 }).observe(el);
  };

  var yr = d.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
