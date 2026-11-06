/* Catalogue page: chapter grids of page thumbnails + a full-screen page viewer.
   Page images are the original catalogue pages (catalogue/pages), thumbnails in catalogue/thumbs.
   Model names and formats are transcribed from the PDF's spec sheets. */
(function () {
  'use strict';
  var doc = document;
  var t = window.TK.t;

  /* p = PDF page number; key = translated title; name = model name (never translated); f = format */
  var PAGES = [
    { p: 1, ch: 'intro', key: 'cat.cover' },
    { p: 2, ch: 'intro', key: 'cat.p.contacts' },
    { p: 3, ch: 'intro', key: 'cat.p.presentation' },
    { p: 4, ch: 'intro', key: 'cat.p.why' },
    { p: 5, ch: 'paves', key: 'cat.ch.paves', divider: true },
    { p: 6, ch: 'paves', name: 'Agadir', f: '22 × 11 cm' },
    { p: 7, ch: 'paves', name: 'Chellah', f: '10 × 10 cm' },
    { p: 8, ch: 'paves', name: 'Cristal', f: '20 × 20 × 10 cm' },
    { p: 9, ch: 'paves', name: 'Double T', f: '20 × 16 cm' },
    { p: 10, ch: 'paves', name: 'Fès Rustique', f: '23×14 · 14×14 · 9×14 cm' },
    { p: 11, ch: 'paves', name: 'Kasbah', f: '18 × 8 × 11,4 cm' },
    { p: 12, ch: 'paves', name: 'Hallala', f: '13,5 × 13,5 cm' },
    { p: 13, ch: 'paves', name: 'Kenitra', f: '25 × 12,5 cm' },
    { p: 14, ch: 'paves', name: 'Lixus', f: '15 × 15 cm' },
    { p: 15, ch: 'paves', name: 'Mehdia', f: '20 × 10 cm' },
    { p: 16, ch: 'paves', name: 'Meknès', f: '22,7 × 13,7 cm' },
    { p: 17, ch: 'paves', name: 'Tanger Med', f: '10 × 20 cm' },
    { p: 18, ch: 'paves', name: 'TK Port', f: '20 × 20 × 10 cm' },
    { p: 19, ch: 'paves', name: 'Volubilis', f: '20 × 20 cm' },
    { p: 20, ch: 'paves', name: 'Bouregreg', f: '20 × 15,5 cm' },
    { p: 21, ch: 'paves', name: 'Sebou', f: '43 × 43 cm' },
    { p: 22, ch: 'paves', name: 'Oum Rabie', f: '50 × 50 cm' },
    { p: 23, ch: 'pose', key: 'cat.ch.pose', divider: true },
    { p: 24, ch: 'pose', key: 'cat.p.general' },
    { p: 25, ch: 'pose', key: 'cat.p.pose' },
    { p: 26, ch: 'pose', key: 'cat.p.pose' },
    { p: 27, ch: 'pose', key: 'cat.p.pose' },
    { p: 29, ch: 'bordures', key: 'cat.ch.bordures', divider: true },
    { p: 30, ch: 'bordures', name: 'Bordure américaine' },
    { p: 31, ch: 'bordures', name: 'Bordure T1-T2-T3-T4' },
    { p: 32, ch: 'bordures', name: 'Bordure P1-CR1' },
    { p: 33, ch: 'bordures', name: 'Trambord' },
    { p: 34, ch: 'bordures', name: 'Caniveau CC1 & CC2' },
    { p: 35, ch: 'bordures', name: 'Caniveau CS1 & CS3' },
    { p: 36, ch: 'mobilier', key: 'cat.p.custom' },
    { p: 37, ch: 'mobilier', name: 'Bancs' },
    { p: 38, ch: 'mobilier', name: 'Bornes' },
    { p: 39, ch: 'galerie', key: 'cat.p.gallery' },
    { p: 40, ch: 'galerie', key: 'cat.p.back' }
  ];
  var CHAPTERS = ['intro', 'paves', 'pose', 'bordures', 'mobilier', 'galerie'];

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function file(dir, p) { return 'catalogue/' + dir + '/p' + pad(p) + '.jpg'; }
  function title(pg) { return pg.name || t(pg.key); }
  function el(tag, cls, text) {
    var e = doc.createElement(tag);
    if (cls) { e.className = cls; }
    if (text) { e.textContent = text; }
    return e;
  }
  function i18nSpan(key) { var s = el('span', null, t(key)); s.setAttribute('data-i18n', key); return s; }

  /* ---------- Chapter grids ---------- */
  function renderCard(pg) {
    var li = el('li');
    var btn = el('button', 'page-card');
    btn.type = 'button';
    btn.setAttribute('data-open-page', String(pg.p));
    var img = el('img');
    img.src = file('thumbs', pg.p); img.width = 480; img.height = 686; img.loading = 'lazy'; img.alt = '';
    var meta = el('span', 'pc-meta');
    var num = el('span', 'pc-num mono');
    num.appendChild(i18nSpan('cat.pageabbr'));
    num.appendChild(doc.createTextNode(' ' + pad(pg.p)));
    var name = el('span', 'pc-title');
    if (pg.name) { name.textContent = pg.name; } else { name.appendChild(i18nSpan(pg.key)); }
    meta.appendChild(num); meta.appendChild(name);
    if (pg.f) { meta.appendChild(el('span', 'pc-fmt mono', pg.f)); }
    btn.appendChild(img); btn.appendChild(meta);
    li.appendChild(btn);
    return li;
  }

  function renderChapters() {
    var host = doc.getElementById('chapters');
    CHAPTERS.forEach(function (ch, i) {
      var pages = PAGES.filter(function (pg) { return pg.ch === ch; });
      var cards = pages.filter(function (pg) { return !pg.divider; });
      var sec = el('section', 'sec cat-ch'); sec.id = 'ch-' + ch;
      var wrap = el('div', 'wrap');
      var head = el('header', 'sec-head');
      var label = el('p', 'sec-label mono');
      label.appendChild(el('span', null, pad(i + 1)));
      label.appendChild(doc.createTextNode(' '));
      label.appendChild(i18nSpan('cat.ch.' + ch));
      var right = el('div');
      var h2 = el('h2'); h2.appendChild(i18nSpan('cat.ch.' + ch));
      var range = el('p', 'sec-lead mono');
      range.appendChild(i18nSpan('cat.pageabbr'));
      range.appendChild(doc.createTextNode(' ' + pad(pages[0].p) + '–' + pad(pages[pages.length - 1].p)));
      right.appendChild(h2); right.appendChild(range);
      head.appendChild(label); head.appendChild(right);
      var grid = el('ol', 'pages-grid' + (ch === 'paves' ? ' pages-grid-dense' : ''));
      cards.forEach(function (pg) { grid.appendChild(renderCard(pg)); });
      wrap.appendChild(head); wrap.appendChild(grid); sec.appendChild(wrap);
      host.appendChild(sec);
    });
  }

  /* ---------- Viewer ---------- */
  var viewer = doc.getElementById('viewer');
  var vImg = doc.getElementById('viewer-img');
  var vCount = doc.getElementById('viewer-count');
  var vTitle = doc.getElementById('viewer-title');
  var vPrev = doc.getElementById('viewer-prev');
  var vNext = doc.getElementById('viewer-next');
  var vClose = doc.getElementById('viewer-close');
  var index = 0;
  var lastFocus = null;

  function preload(i) { if (PAGES[i]) { new Image().src = file('pages', PAGES[i].p); } }

  function show(i) {
    index = Math.max(0, Math.min(PAGES.length - 1, i));
    var pg = PAGES[index];
    vImg.src = file('pages', pg.p);
    vImg.alt = t('cat.pageabbr') + ' ' + pad(pg.p) + ' — ' + title(pg);
    vCount.textContent = pad(index + 1) + ' / ' + PAGES.length;
    vTitle.textContent = t('cat.pageabbr') + ' ' + pad(pg.p) + ' — ' + title(pg) + (pg.f ? ' · ' + pg.f : '');
    vPrev.disabled = index === 0;
    vNext.disabled = index === PAGES.length - 1;
    history.replaceState(null, '', '#page-' + pg.p);
    preload(index + 1); preload(index - 1);
  }

  function open(p) {
    var i = PAGES.findIndex(function (pg) { return pg.p === p; });
    if (i < 0) { return; }
    lastFocus = doc.activeElement;
    viewer.hidden = false;
    doc.body.style.overflow = 'hidden';
    show(i);
    vClose.focus();
  }

  function close() {
    if (viewer.hidden) { return; }
    viewer.hidden = true;
    doc.body.style.overflow = '';
    history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus) { lastFocus.focus(); }
  }

  function step(d) { show(index + d); }
  var rtl = function () { return doc.documentElement.dir === 'rtl'; };

  doc.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-open-page]');
    if (trigger) { open(parseInt(trigger.getAttribute('data-open-page'), 10)); }
  });
  vPrev.addEventListener('click', function () { step(-1); });
  vNext.addEventListener('click', function () { step(1); });
  vClose.addEventListener('click', close);
  doc.getElementById('viewer-stage').addEventListener('click', function (e) { if (e.target.id === 'viewer-stage') { close(); } });
  doc.addEventListener('keydown', function (e) {
    if (viewer.hidden) { return; }
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowRight') { step(rtl() ? -1 : 1); }
    else if (e.key === 'ArrowLeft') { step(rtl() ? 1 : -1); }
    else if (e.key === 'Tab') {
      /* keep focus inside the dialog */
      var f = Array.prototype.filter.call(viewer.querySelectorAll('a, button'), function (b) { return !b.disabled; });
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && doc.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });

  /* Swipe on touch screens */
  var startX = null;
  vImg.addEventListener('pointerdown', function (e) { startX = e.clientX; });
  vImg.addEventListener('pointerup', function (e) {
    if (startX === null) { return; }
    var dx = e.clientX - startX; startX = null;
    if (Math.abs(dx) > 50) { step((dx < 0) !== rtl() ? 1 : -1); }
  });
  vImg.addEventListener('dragstart', function (e) { e.preventDefault(); });

  function relabel() {
    vPrev.setAttribute('aria-label', t('cat.prev'));
    vNext.setAttribute('aria-label', t('cat.next'));
    vClose.setAttribute('aria-label', t('cat.close'));
    if (!viewer.hidden) { show(index); }
  }
  doc.addEventListener('tk:lang', relabel);

  renderChapters();
  relabel();

  /* Deep link: catalogue.html#page-18 opens that page */
  function openFromHash() {
    var m = /^#page-(\d+)$/.exec(location.hash);
    if (m && viewer.hidden) { open(parseInt(m[1], 10)); }
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
