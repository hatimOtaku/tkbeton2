/* Catalogue page-turner: one big page at a time, big arrows, swipe, arrow keys,
   and a strip of page pictures to jump. Kept deliberately simple for every visitor.
   Model names and formats are transcribed from the PDF's spec sheets. */
(function () {
  'use strict';
  var doc = document;
  var t = window.TK.t;

  /* p = PDF page number (blank page 28 is left out); key = translated title; name = model name; f = format */
  var PAGES = [
    { p: 1, key: 'cat.ch.intro' },
    { p: 2, key: 'cat.p.contacts' },
    { p: 3, key: 'cat.p.presentation' },
    { p: 4, key: 'cat.p.why' },
    { p: 5, key: 'cat.ch.paves' },
    { p: 6, name: 'Agadir', f: '22 × 11 cm' },
    { p: 7, name: 'Chellah', f: '10 × 10 cm' },
    { p: 8, name: 'Cristal', f: '20 × 20 × 10 cm' },
    { p: 9, name: 'Double T', f: '20 × 16 cm' },
    { p: 10, name: 'Fès Rustique', f: '23×14 · 14×14 · 9×14 cm' },
    { p: 11, name: 'Kasbah', f: '18 × 8 × 11,4 cm' },
    { p: 12, name: 'Hallala', f: '13,5 × 13,5 cm' },
    { p: 13, name: 'Kenitra', f: '25 × 12,5 cm' },
    { p: 14, name: 'Lixus', f: '15 × 15 cm' },
    { p: 15, name: 'Mehdia', f: '20 × 10 cm' },
    { p: 16, name: 'Meknès', f: '22,7 × 13,7 cm' },
    { p: 17, name: 'Tanger Med', f: '10 × 20 cm' },
    { p: 18, name: 'TK Port', f: '20 × 20 × 10 cm' },
    { p: 19, name: 'Volubilis', f: '20 × 20 cm' },
    { p: 20, name: 'Bouregreg', f: '20 × 15,5 cm' },
    { p: 21, name: 'Sebou', f: '43 × 43 cm' },
    { p: 22, name: 'Oum Rabie', f: '50 × 50 cm' },
    { p: 23, key: 'cat.ch.pose' },
    { p: 24, key: 'cat.p.general' },
    { p: 25, key: 'cat.p.pose' },
    { p: 26, key: 'cat.p.pose' },
    { p: 27, key: 'cat.p.pose' },
    { p: 29, key: 'cat.ch.bordures' },
    { p: 30, name: 'Bordure américaine' },
    { p: 31, name: 'Bordure T1-T2-T3-T4' },
    { p: 32, name: 'Bordure P1-CR1' },
    { p: 33, name: 'Trambord' },
    { p: 34, name: 'Caniveau CC1 & CC2' },
    { p: 35, name: 'Caniveau CS1 & CS3' },
    { p: 36, key: 'cat.p.custom' },
    { p: 37, name: 'Bancs' },
    { p: 38, name: 'Bornes' },
    { p: 39, key: 'cat.p.gallery' },
    { p: 40, key: 'cat.p.back' }
  ];
  var SWIPE_PX = 50;

  var img = doc.getElementById('book-img');
  var link = doc.getElementById('book-link');
  var prev = doc.getElementById('book-prev');
  var next = doc.getElementById('book-next');
  var countN = doc.getElementById('book-n');
  var fill = doc.getElementById('book-fill');
  var titleEl = doc.getElementById('book-title');
  var strip = doc.getElementById('book-thumbs');
  var index = 0;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function file(dir, p) { return 'catalogue/' + dir + '/p' + pad(p) + '.jpg'; }
  function label(pg) { return (pg.name || t(pg.key)) + (pg.f ? ' · ' + pg.f : ''); }
  function rtl() { return doc.documentElement.dir === 'rtl'; }

  /* ---------- Page pictures strip ---------- */
  var thumbs = PAGES.map(function (pg, i) {
    var li = doc.createElement('li');
    var b = doc.createElement('button');
    b.type = 'button';
    b.className = 'book-thumb';
    var im = doc.createElement('img');
    im.src = file('thumbs', pg.p); im.width = 480; im.height = 686; im.loading = 'lazy'; im.alt = '';
    var n = doc.createElement('span');
    n.className = 'mono';
    n.textContent = String(i + 1);
    b.appendChild(im); b.appendChild(n);
    b.addEventListener('click', function () { go(i); });
    li.appendChild(b);
    strip.appendChild(li);
    return b;
  });
  doc.getElementById('book-total').textContent = String(PAGES.length);

  function centreThumb(b) {
    /* scroll the strip only, never the page */
    var target = b.offsetLeft - (strip.clientWidth - b.offsetWidth) / 2;
    strip.scrollTo({ left: target, behavior: 'smooth' });
  }

  /* ---------- Turning pages ---------- */
  function render() {
    var pg = PAGES[index];
    img.src = file('pages', pg.p);
    img.alt = label(pg);
    link.href = file('pages', pg.p);
    countN.textContent = String(index + 1);
    fill.style.width = ((index + 1) / PAGES.length * 100) + '%';
    titleEl.textContent = label(pg);
    prev.disabled = index === 0;
    next.disabled = index === PAGES.length - 1;
    thumbs.forEach(function (b, i) { b.setAttribute('aria-current', i === index ? 'true' : 'false'); });
    centreThumb(thumbs[index]);
    history.replaceState(null, '', '#page-' + pg.p);
    [index + 1, index - 1].forEach(function (i) { if (PAGES[i]) { new Image().src = file('pages', PAGES[i].p); } });
  }

  function go(i) {
    if (i < 0 || i >= PAGES.length || i === index) { return; }
    var forward = i > index;
    index = i;
    img.classList.remove('turn-fwd', 'turn-back');
    void img.offsetWidth;
    img.classList.add(forward ? 'turn-fwd' : 'turn-back');
    render();
  }

  prev.addEventListener('click', function () { go(index - 1); });
  next.addEventListener('click', function () { go(index + 1); });

  doc.addEventListener('keydown', function (e) {
    var tg = e.target;
    if (tg && tg.closest && tg.closest('input, textarea')) { return; }
    if (e.key === 'ArrowRight') { go(index + (rtl() ? -1 : 1)); }
    else if (e.key === 'ArrowLeft') { go(index + (rtl() ? 1 : -1)); }
  });

  /* Swipe with one finger; pinch-zoom stays free */
  var sx = null, sy = null, swiped = false;
  link.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { sx = null; return; }
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; swiped = false;
  }, { passive: true });
  link.addEventListener('touchend', function (e) {
    if (sx === null) { return; }
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    sx = null;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
      swiped = true;
      go(index + ((dx < 0) !== rtl() ? 1 : -1));
    }
  });
  /* a swipe must not also open the full-size page */
  link.addEventListener('click', function (e) { if (swiped) { e.preventDefault(); swiped = false; } });

  function relabel() {
    prev.setAttribute('aria-label', t('cat.prev'));
    next.setAttribute('aria-label', t('cat.next'));
    titleEl.textContent = label(PAGES[index]);
    img.alt = label(PAGES[index]);
  }
  doc.addEventListener('tk:lang', relabel);

  /* Deep link: catalogue.html#page-18 opens that page */
  function fromHash() {
    var m = /^#page-(\d+)$/.exec(location.hash);
    if (!m) { return -1; }
    var p = parseInt(m[1], 10);
    for (var i = 0; i < PAGES.length; i++) { if (PAGES[i].p === p) { return i; } }
    return -1;
  }
  window.addEventListener('hashchange', function () { var i = fromHash(); if (i > -1) { go(i); } });
  var start = fromHash();
  index = start > -1 ? start : 0;
  render();
  relabel();
})();
