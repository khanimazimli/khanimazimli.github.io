/* Abstract illustrations for the portfolio. Decorative only: no real data, no product mechanics. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  function h(n) { var x = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }
  function el(tag, attrs, parent) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }

  /* Two editions as two fields of points: each point stands for a different customer's year. */
  function editions(svg) {
    if (!svg) return;
    svg.setAttribute('viewBox', '0 0 640 440');
    var g = el('g', {}, svg);
    el('text', { x: 186, y: 412, 'text-anchor': 'middle', class: 'ed-y' }, g).textContent = '2025';
    el('text', { x: 452, y: 412, 'text-anchor': 'middle', class: 'ed-y ed-y2' }, g).textContent = '2026';
    el('circle', { cx: 452, cy: 196, r: 136, class: 'ed-ring' }, g);
    el('path', { d: 'M226 150 C290 40 380 40 420 92', class: 'ed-arc', pathLength: 1 }, g);
    function field(cx, cy, R, n, seed, gold) {
      for (var i = 0; i < n; i++) {
        var a = h(i + seed) * Math.PI * 2, r = Math.sqrt(h(i + seed + 500)) * R, s = 1.4 + h(i + seed + 900) * 2.6;
        var c = el('circle', { cx: (cx + Math.cos(a) * r).toFixed(1), cy: (cy + Math.sin(a) * r).toFixed(1), r: s.toFixed(1), class: 'ed-p' + (h(i + seed + 1300) < gold ? ' g' : '') }, g);
        c.style.setProperty('--d', (h(i + seed + 1700) * 1.2).toFixed(2) + 's');
      }
    }
    field(186, 210, 92, 90, 1, .12);
    field(452, 196, 126, 190, 3000, .28);
  }

  /* A simple loop: analyse, decide, deliver, review. */
  function loop(svg, labels) {
    if (!svg) return;
    labels = labels || ['Analyse', 'Decide', 'Deliver', 'Review'];
    svg.setAttribute('viewBox', '0 0 520 520');
    var cx = 260, cy = 260, R = 176;
    var ring = 'M260 84 A176 176 0 1 1 259.9 84';
    el('circle', { cx: cx, cy: cy, r: R, class: 'lp-ring' }, svg);
    el('path', { d: ring, class: 'lp-arc', pathLength: 1 }, svg);
    for (var i = 0; i < 48; i++) {
      var a = h(i + 40) * Math.PI * 2, r = 30 + Math.sqrt(h(i + 90)) * 96;
      el('circle', { cx: (cx + Math.cos(a) * r).toFixed(1), cy: (cy + Math.sin(a) * r).toFixed(1), r: (1.4 + h(i + 140) * 2).toFixed(1), class: 'lp-p' }, svg);
    }
    var pos = [[cx, cy - R], [cx + R, cy], [cx, cy + R], [cx - R, cy]];
    pos.forEach(function (p, i) {
      var gg = el('g', { class: 'lp-n', style: '--d:' + (0.35 + i * 0.45) + 's' }, svg);
      el('circle', { cx: p[0], cy: p[1], r: 44 }, gg);
      el('text', { x: p[0], y: p[1] + 5, 'text-anchor': 'middle' }, gg).textContent = labels[i];
    });
    var run = el('circle', { r: 7, class: 'lp-run' }, svg);
    run.style.offsetPath = "path('" + ring + "')";
  }

  window.KAV = { editions: editions, loop: loop };
})();
