/* Illustrative year-in-review stories for this portfolio.
   Fictional customers, values and wording. Not ABB's designs or assets. */
(function () {
  var TH = {
    navy:  { bg: '#14213D', fg: '#F7F3E9', ac: '#E9CB6B' },
    sand:  { bg: '#EFE6D8', fg: '#1F1A14', ac: '#C2562E' },
    teal:  { bg: '#0F5E63', fg: '#F4FBF9', ac: '#F2C14E' },
    plum:  { bg: '#4A2545', fg: '#FBF1F6', ac: '#F0A6CA' },
    ink:   { bg: '#0E1116', fg: '#F7F3E9', ac: '#7ED3A6' },
    green: { bg: '#16352B', fg: '#F1E9D2', ac: '#D4AF37' },
    sky:   { bg: '#DCE6FA', fg: '#0F1830', ac: '#2447A6' }
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* one small data visual per story type */
  var V = {
    intro: function (s) {
      return '<svg viewBox="0 0 200 120" aria-hidden="true"><g fill="none" stroke="var(--sac)" stroke-width="1" opacity=".55">' +
        [16, 26, 36, 46].map(function (r) { return '<circle cx="100" cy="60" r="' + r + '"/>'; }).join('') + '</g>' +
        '<text x="100" y="74" text-anchor="middle" font-size="44" font-weight="700" letter-spacing="-2" fill="currentColor" font-family="Satoshi, Arial">' + (s.year || '2026') + '</text>' +
        '<g font-size="9" fill="currentColor" opacity=".8" font-family="Satoshi, Arial" text-anchor="middle"><text x="30" y="118">12 months</text><text x="100" y="118">your payments</text><text x="170" y="118">one story</text></g></svg>';
    },
    category: function (s) {
      var rows = s.rows || [], max = Math.max.apply(null, rows.map(function (r) { return r[1]; }));
      return '<svg viewBox="0 0 200 100" aria-hidden="true" font-family="Satoshi, Arial">' + rows.map(function (r, i) {
        var y = 8 + i * 32, w = Math.round(r[1] / max * 150);
        return '<text x="0" y="' + y + '" font-size="10" fill="currentColor" opacity="' + (i ? .7 : 1) + '" dominant-baseline="hanging">' + esc(r[0]) + '</text>' +
          '<text x="200" y="' + y + '" font-size="10" fill="currentColor" opacity="' + (i ? .7 : 1) + '" text-anchor="end" dominant-baseline="hanging">' + r[1].toLocaleString('en-US') + ' AZN</text>' +
          '<rect x="0" y="' + (y + 14) + '" width="200" height="7" rx="3.5" fill="currentColor" opacity=".12"/>' +
          '<rect x="0" y="' + (y + 14) + '" width="' + w + '" height="7" rx="3.5" fill="' + (i ? 'currentColor' : 'var(--sac)') + '" opacity="' + (i ? .45 : 1) + '"/>';
      }).join('') + '</svg>';
    },
    country: function (s) {
      var dots = '';
      for (var x = 6; x < 200; x += 12) for (var y = 6; y < 110; y += 12) dots += '<circle cx="' + x + '" cy="' + y + '" r="1.1"/>';
      return '<svg viewBox="0 0 200 112" aria-hidden="true" font-family="Satoshi, Arial"><g fill="currentColor" opacity=".18">' + dots + '</g>' +
        '<path d="M34 86 Q100 -6 166 40" fill="none" stroke="var(--sac)" stroke-width="2" stroke-dasharray="4 4"/>' +
        '<circle cx="34" cy="86" r="5" fill="currentColor"/><circle cx="166" cy="40" r="7" fill="var(--sac)"/><circle cx="166" cy="40" r="13" fill="none" stroke="var(--sac)" opacity=".5"/>' +
        '<path d="M122 22 l9 3 -9 3 2 -3z" fill="currentColor" transform="rotate(18 126 25)"/>' +
        '<text x="34" y="104" font-size="10" fill="currentColor" text-anchor="middle">Baku</text>' +
        '<text x="166" y="66" font-size="10" fill="currentColor" text-anchor="middle">' + esc(s.dest || s.v) + '</text>' +
        '</svg>';
    },
    first: function () {
      return '<svg viewBox="0 0 200 112" aria-hidden="true" font-family="Satoshi, Arial"><g fill="none" stroke="var(--sac)"><circle cx="100" cy="56" r="46" stroke-width="1" opacity=".35"/><circle cx="100" cy="56" r="36" stroke-width="2"/></g>' +
        '<g stroke="var(--sac)" stroke-width="1.4" opacity=".6">' + [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { var r = a * Math.PI / 180; return '<line x1="' + (100 + Math.cos(r) * 50).toFixed(1) + '" y1="' + (56 + Math.sin(r) * 50).toFixed(1) + '" x2="' + (100 + Math.cos(r) * 56).toFixed(1) + '" y2="' + (56 + Math.sin(r) * 56).toFixed(1) + '"/>'; }).join('') + '</g>' +
        '<path d="M100 34 l6.5 13.2 14.5 2.1 -10.5 10.2 2.5 14.5 -13 -6.8 -13 6.8 2.5 -14.5 -10.5 -10.2 14.5 -2.1z" fill="var(--sac)"/></svg>';
    },
    months: function (s) {
      var on = s.on || [0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1], M = 'JFMAMJJASOND';
      return '<svg viewBox="0 0 200 96" aria-hidden="true" font-family="Satoshi, Arial">' + on.map(function (v, i) {
        var x = 18 + (i % 6) * 33, y = 22 + Math.floor(i / 6) * 44;
        return '<circle cx="' + x + '" cy="' + y + '" r="11" fill="' + (v ? 'var(--sac)' : 'none') + '" stroke="' + (v ? 'none' : 'currentColor') + '" opacity="' + (v ? 1 : .35) + '"/><text x="' + x + '" y="' + (y + 25) + '" font-size="9" fill="currentColor" opacity=".7" text-anchor="middle">' + M[i] + '</text>';
      }).join('') + '</svg>';
    },
    away: function () {
      return '<svg viewBox="0 0 200 90" aria-hidden="true" font-family="Satoshi, Arial"><path d="M10 60 C50 60 50 30 80 30" fill="none" stroke="currentColor" stroke-width="2" opacity=".5"/><path d="M80 30 H130" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2 6" opacity=".5"/><path d="M130 30 C160 30 160 56 190 56" fill="none" stroke="var(--sac)" stroke-width="2.4"/>' +
        '<circle cx="10" cy="60" r="5" fill="currentColor" opacity=".6"/><circle cx="190" cy="56" r="7" fill="var(--sac)"/><text x="10" y="82" font-size="9" fill="currentColor" opacity=".7">last visit</text><text x="190" y="82" font-size="9" fill="currentColor" text-anchor="end">today</text><text x="105" y="20" font-size="9" fill="currentColor" opacity=".7" text-anchor="middle">away</text></svg>';
    },
    news: function () {
      return '<svg viewBox="0 0 200 96" aria-hidden="true" font-family="Satoshi, Arial">' + [0, 1, 2].map(function (i) {
        return '<g transform="translate(' + (i * 14) + ' ' + (i * 12) + ')"><rect x="20" y="4" width="132" height="48" rx="10" fill="' + (i === 2 ? 'var(--sac)' : 'currentColor') + '" opacity="' + (i === 2 ? 1 : .14 + i * .08) + '"/></g>';
      }).join('') + '<text x="58" y="66" font-size="11" font-weight="700" fill="var(--sbg)">3 new partners</text></svg>';
    },
    next: function () {
      return '<svg viewBox="0 0 200 96" aria-hidden="true"><circle cx="100" cy="48" r="38" fill="none" stroke="currentColor" opacity=".3"/><circle cx="100" cy="48" r="26" fill="var(--sac)"/><path d="M90 48 h20 m-8 -8 l8 8 -8 8" fill="none" stroke="var(--sbg)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
  };

  function inner(s, i, n) {
    return '<span class="orb" aria-hidden="true"></span>' +
      '<div class="bars" aria-hidden="true">' + Array.apply(null, Array(n || 5)).map(function (_, j) { return '<i class="' + (j <= (i || 0) ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
      '<div class="top" aria-hidden="true"><span class="av">' + (s.prem ? '★' : 'Y') + '</span><span class="tt">Your year' + (s.prem ? ' · Premium' : '') + '</span><span class="x">×</span></div>' +
      '<div class="ps"><span class="pk">' + esc(s.k) + '</span><span class="ph">' + esc(s.h) + '</span>' +
      '<div class="pviz">' + (V[s.kind] ? V[s.kind](s) : '') + '</div>' +
      (s.v ? '<span class="pv">' + esc(s.v) + '</span>' : '') +
      '<span class="pn">' + esc(s.n) + '</span><span class="pb">Share</span></div>';
  }
  function style(s) { var t = TH[s.t] || TH.navy; return '--sbg:' + t.bg + ';--sfg:' + t.fg + ';--sac:' + t.ac; }
  function label(s) { return s.k + ': ' + s.h + (s.v ? ' ' + s.v : '') + '. ' + s.n + '.'; }
  window.KAStory = { inner: inner, style: style, label: label, themes: TH };

  /* fictional story moments for illustration only */
  window.KAStory.list = [
    { t: 'navy', kind: 'intro', k: 'Opening', h: 'Your 2026, in stories', n: 'A look back at your year', c: 'The opening: a year of activity, told as a short story.' },
    { t: 'sand', kind: 'category', k: 'Top category', h: 'Your payments were led by', v: 'Cafés', n: '184 payments this year', rows: [['Cafés', 2140], ['Groceries', 1310], ['Transport', 640]], c: 'Where the year went: everyday spending, made personal.' },
    { t: 'teal', kind: 'country', k: 'Travel', h: 'Abroad, you spent most in', v: 'Georgia', n: 'Across 3 trips', c: 'Travel moments, drawn from the customer’s own year.' },
    { t: 'ink', kind: 'first', k: 'A first', h: 'This year you opened your', v: 'First deposit', n: 'One of this year’s milestones', c: 'Milestones worth celebrating.' },
    { t: 'navy', kind: 'months', k: 'Closing', h: 'Thank you for this year', n: 'See you in 2027', c: 'The closing: a warm end, and a reason to come back.' },
    { t: 'plum', kind: 'away', k: 'Welcome back', h: 'We meet again', n: 'Here is what changed', c: '' },
    { t: 'green', prem: true, kind: 'intro', k: 'Premium', h: 'Your 2026, in stories', n: 'A premium edition of your year', c: '' }
  ];
})();
