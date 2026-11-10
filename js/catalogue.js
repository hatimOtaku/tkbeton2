/* Catalogue: the whole PDF rebuilt as one long web page, section after section.
   A smart bar follows the reader: it shows the section on screen, lights up its chapter,
   and jumps to the previous / next section or any section from the contents list.
   Content comes from js/catalogue-data.js (FR · EN · AR). */
(function () {
  'use strict';
  var doc = document;
  var D = window.TK_CAT;
  var UI = D.UI, TEXT = D.TEXT;
  var IMG = 'catalogue/img/';
  var PDF = 'catalogue/catalogue-tk-beton.pdf';

  var viewport = doc.getElementById('cat-viewport');
  var track = doc.getElementById('cat-track');
  var reader = doc.getElementById('cat-reader');
  var prev = doc.getElementById('cat-prev');
  var next = doc.getElementById('cat-next');
  var countN = doc.getElementById('cat-n');
  var countT = doc.getElementById('cat-total');
  var fill = doc.getElementById('cat-fill');
  var nowEl = doc.getElementById('cat-now');
  var openBtn = doc.getElementById('cat-open');
  var tocBtn = doc.getElementById('cat-toc-btn');
  var toc = doc.getElementById('cat-toc');
  var tocList = doc.getElementById('cat-toc-list');
  var chaptersEl = doc.getElementById('cat-chapters');

  var index = 0;
  var slides = [];

  function lang() { var l = doc.documentElement.lang; return l === 'en' || l === 'ar' ? l : 'fr'; }
  function rtl() { return doc.documentElement.dir === 'rtl'; }
  /* English uses a decimal point; French and Arabic keep the comma printed in the catalogue */
  function num(s) { return lang() === 'en' ? String(s).replace(/(\d),(\d)/g, '$1.$2') : s; }
  function t(o) { return o[lang()]; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  /* Phones get a lighter copy of each picture (catalogue/img/sm/), which keeps the long page within their memory */
  function img(name, alt, cls) {
    var wh = D.SIZES[name] || [];
    return '<picture><source media="(max-width: 700px)" srcset="' + IMG + 'sm/' + name + '.jpg">' +
      '<img src="' + IMG + name + '.jpg" alt="' + esc(alt || '') + '"' + (wh[0] ? ' width="' + wh[0] + '" height="' + wh[1] + '"' : '') +
      ' loading="lazy" decoding="async"' + (cls ? ' class="' + cls + '"' : '') + '></picture>';
  }
  function paras(list) { return list.map(function (p) { return '<p>' + p + '</p>'; }).join(''); }
  function dl(rows) {
    return '<dl class="specs">' + rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd dir="auto">' + r[1] + '</dd></div>'; }).join('') + '</dl>';
  }
  function head(kicker, title, extra) {
    return '<header class="sl-head"><p class="mono sl-kicker">' + kicker + '</p><h2>' + title + '</h2>' + (extra || '') + '</header>';
  }
  function quote(name) {
    return '<a class="btn btn-ink btn-sm" href="index.html#contact">' + t(UI.quote) + (name ? ' — ' + esc(name) : '') + ' <span class="arrow" aria-hidden="true">→</span></a>';
  }

  /* ---------- Usage pictograms ---------- */
  var ICON = {
    p: '<rect x="3" y="3" width="18" height="18"/><path d="M9.5 17V7h3.2a2.8 2.8 0 0 1 0 5.6H9.5"/>',
    ped: '<circle cx="12.5" cy="4.5" r="1.8"/><path d="M12 8l-2.5 5 3 2v5M12 8l2.5 4 3 1M9.5 13L7 20M10 9.5L7 12"/>',
    car: '<path d="M3 15v-3l2-5h14l2 5v3zM3 15v3h3v-3M18 15v3h3v-3"/><circle cx="7" cy="13" r=".8"/><circle cx="17" cy="13" r=".8"/>',
    truck: '<path d="M2 6h11v10H2zM13 9h5l3 4v3h-8z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    heavy: '<path d="M1 5h14v11H1zM15 8h5l3 4v4h-8z"/><circle cx="4.5" cy="17.5" r="1.7"/><circle cx="9.5" cy="17.5" r="1.7"/><circle cx="18.5" cy="17.5" r="1.7"/>',
    port: '<path d="M5 22V4h14M5 4l4 4M9 4v4M19 4v6M17 10h4v4h-4zM2 22h20"/>'
  };
  function icon(key) {
    var k = key === 'truck35' ? 'truck' : key.indexOf('heavy') === 0 ? 'heavy' : key;
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[k] + '</svg>';
  }
  function usage(list) {
    return '<ul class="use">' + list.map(function (k) { return '<li>' + icon(k) + '<span>' + num(t(D.USE[k])) + '</span></li>'; }).join('') + '</ul>';
  }

  /* ---------- Shared blocks for paver pages ---------- */
  function coloursBlock() {
    return '<div class="swatch-block"><h3 class="mono">' + t(UI.colours) + '</h3><ul class="swatches">' +
      D.COLOURS.map(function (c) { return '<li><span style="background:' + c[0] + '"></span>' + t(c[1]) + '</li>'; }).join('') +
      '</ul><p class="note">' + t(UI.coloursNb) + '</p>' +
      '<h3 class="mono">' + t(UI.finishes) + '</h3><ul class="finishes"><li><span class="fin smooth"></span>' + t(UI.smooth) + '</li><li><span class="fin rough"></span>' + t(UI.rough) + '</li></ul></div>';
  }
  function tolerances() {
    return '<div class="tol"><table><thead><tr><th colspan="2">' + t(UI.tol) + '</th><th colspan="3">' + t(UI.mech) + '</th></tr>' +
      '<tr><td>' + t(UI.lw) + '</td><td>' + t(UI.thick) + '</td><td>' + t(UI.absorb) + '</td><td>' + t(UI.split) + '</td><td>' + t(UI.abrasion) + '</td></tr></thead>' +
      '<tbody><tr><td dir="ltr">± 2 mm</td><td dir="ltr">± 3 mm</td><td>' + t(UI.absorbVal) + '</td><td dir="ltr">≥ ' + num('3,6') + ' MPa</td><td dir="ltr">&lt; 23 mm</td></tr></tbody></table>' +
      '<div class="tol-list"><h3 class="mono">' + t(UI.tol) + ' · ' + t(UI.mech) + '</h3>' + dl([
        [t(UI.lw), '<span dir="ltr">± 2 mm</span>'], [t(UI.thick), '<span dir="ltr">± 3 mm</span>'], [t(UI.absorb), t(UI.absorbVal)],
        [t(UI.split), '<span dir="ltr">≥ ' + num('3,6') + ' MPa</span>'], [t(UI.abrasion), '<span dir="ltr">&lt; 23 mm</span>']]) + '</div></div>';
  }

  /* ---------- Slides ---------- */
  function buildSlides() {
    var S = [];
    var U = D.UI;

    /* 01 · Cover: what TK Béton makes, and shortcuts straight to the products */
    S.push({ id: 'couverture', ch: 'intro', title: L3('Couverture', 'Cover', 'الغلاف'), pages: [1], cls: 'sl-cover', html: function () {
      var jumps = [['paves', TEXT.pavesTitle], ['bordures', UI.chapters.bordures], ['mobilier', UI.chapters.mobilier], ['pose', UI.chapters.pose]];
      return '<div class="cover-grid"><div><p class="mono sl-kicker">' + t(TEXT.coverKicker) + '</p>' +
        '<h1 class="cover-title">' + t(TEXT.coverTitle) + '</h1>' +
        '<p class="mono cover-go">' + t(TEXT.coverGo) + '</p><div class="cover-jumps">' + jumps.map(function (j) {
          return '<button type="button" class="btn btn-yellow" data-go="' + j[0] + '">' + t(j[1]) + ' <span class="arrow" aria-hidden="true">→</span></button>';
        }).join('') + '</div>' +
        '<ul class="cover-words mono">' + t(TEXT.coverWords).map(function (w) { return '<li>' + w + '</li>'; }).join('') + '</ul></div>' +
        '<figure class="cover-fig">' + img('cover', '') + '</figure></div>';
    } });

    /* 02 · About us + why pavers, as short points (PDF pages 3 and 4) */
    S.push({ id: 'a-propos', ch: 'intro', title: TEXT.aboutTitle, pages: [3, 4], html: function () {
      return '<div class="about">' +
        '<section>' + head(t(U.groupe), t(TEXT.aboutTitle)) + '<p class="about-lead">' + t(TEXT.aboutLead) + '</p><ul class="ticks">' + li(t(TEXT.aboutPoints)) + '</ul></section>' +
        '<section><h3>' + t(TEXT.whyTitle) + '</h3><ul class="ticks">' + li(t(TEXT.whyPoints)) + '</ul>' +
        '<figure class="about-fig">' + img('why', '') + '</figure></section></div>';
    } });

    /* 05 · Pavers chapter: index of the 17 models + what they all share */
    S.push({ id: 'paves', ch: 'paves', title: TEXT.pavesTitle, pages: [5], cls: 'sl-chapter', html: function () {
      return '<div class="chapter-band"><p class="mono">TK Béton</p><h2>' + t(TEXT.pavesTitle) + '</h2><p>' + t(TEXT.pavesLead) + '</p></div>' +
        '<h3 class="mono grid-label">' + t(U.models) + ' · ' + t(U.pick) + '</h3>' +
        '<ul class="model-grid">' + D.PAVES.map(function (p) {
          return '<li><button type="button" data-go="' + p[0] + '">' + img(p[0] + '-render', '') + '<b>' + p[1] + '</b><span class="mono" dir="ltr">' + num(p[3]) + '</span></button></li>';
        }).join('') + '</ul>' +
        '<div class="shared">' + coloursBlock() + '<div><h3 class="mono">' + t(U.use) + '</h3>' + usage(['p', 'ped', 'car', 'truck35', 'heavy8', 'port']) +
        '<p class="badge-line"><span class="badge">' + t(U.antistain) + '</span><span class="badge eco">ECOLINE</span></p></div></div>' + tolerances();
    } });

    /* 06–22 · One slide per paver */
    D.PAVES.forEach(function (p, i) {
      S.push({ id: p[0], ch: 'paves', title: { fr: p[1], en: p[1], ar: p[1] }, pages: [p[2]], cls: 'sl-paver', html: function () {
        var rows = [
          [t(U.format), '<span dir="ltr">' + num(p[3]) + '</span>'],
          [t(U.chamfer), t(p[4] ? U.yes : U.no)],
          [t(U.thick), '<span dir="ltr">' + p[5] + '</span>'],
          [t(U.colour), t(U.colourVal)],
          [t(U.finish), t(U.finishVal)],
          [t(U.layers), '<span dir="ltr">' + p[6] + '</span>'],
          [t(U.m2), '<span dir="ltr">' + num(p[7]) + '</span>'],
          [t(U.pallet), '<span dir="ltr">' + p[8] + '</span>'],
          [t(U.norm), 'EN 1338']
        ];
        if (p[11]) { rows.splice(1, 0, [t(U.parts), '<span dir="ltr">' + num(p[11]) + '</span>']); }
        return '<div class="pv">' +
          '<div class="pv-head">' + head(t(TEXT.pavesTitle) + ' · ' + pad(i + 1) + '/' + D.PAVES.length, p[1],
            '<p class="pv-format" dir="ltr">' + num(p[3]) + '</p><p class="badge-line">' + (p[10] ? '<span class="badge eco">ECOLINE</span>' : '') + '<span class="badge">' + t(U.antistain) + '</span></p>') + '</div>' +
          '<figure class="render pv-render">' + img(p[0] + '-render', p[1]) + '</figure>' +
          '<div class="pv-details"><h3 class="mono">' + t(U.specs) + '</h3>' + dl(rows) +
            '<h3 class="mono">' + t(U.use) + '</h3>' + usage(p[9]) + quote(p[1]) + '</div>' +
          '<div class="pv-photos"><figure>' + img(p[0] + '-photo', p[1]) + '</figure><figure>' + img(p[0] + '-close', p[1]) + '</figure></div>' +
          '<figure class="calp">' + img(p[0] + '-calp', t(U.pattern) + ' — ' + p[1]) + '<figcaption class="mono">' + t(U.pattern) + '</figcaption></figure>' +
          '</div>' +
          '<div class="pv-foot">' + coloursBlock() + tolerances() + '</div>';
      } });
    });

    /* 23 · Laying: general notes + maintenance */
    S.push({ id: 'pose', ch: 'pose', title: TEXT.poseTitle, pages: [23, 24], cls: 'sl-chapter', html: function () {
      return '<div class="chapter-band"><p class="mono">TK Béton</p><h2>' + t(TEXT.poseTitle) + '</h2></div>' +
        '<div class="two-col"><section><h3>' + t(TEXT.generalTitle) + '</h3><ol class="numbered">' + li(t(TEXT.general)) + '</ol></section>' +
        '<section><h3>' + t(TEXT.careTitle) + '</h3><ul class="dashed">' + li(t(TEXT.care)) + '</ul></section></div>';
    } });

    /* 24–25 · Laying steps, two per slide like the PDF */
    [[0, 1, 25], [2, 3, 26]].forEach(function (pair) {
      var a = TEXT.steps[pair[0]], b = TEXT.steps[pair[1]];
      S.push({ id: 'pose-' + (pair[0] + 1) + '-' + (pair[1] + 1), ch: 'pose', title: { fr: a.t.fr + ' · ' + b.t.fr, en: a.t.en + ' · ' + b.t.en, ar: a.t.ar + ' · ' + b.t.ar }, pages: [pair[2]], html: function () {
        return head(t(TEXT.poseTitle), t(UI.step) + ' ' + (pair[0] + 1) + '–' + (pair[1] + 1)) +
          [pair[0], pair[1]].map(function (n) {
            var s = TEXT.steps[n];
            return '<section class="step"><div><p class="step-n">' + (n + 1) + '</p><h3>' + t(s.t) + '</h3><div class="prose">' + paras(t(s.p)) + '</div></div>' +
              '<div class="step-imgs n' + s.img.length + '">' + s.img.map(function (m) { return '<figure>' + img(m, t(s.t)) + '</figure>'; }).join('') + '</div></section>';
          }).join('');
      } });
    });

    /* 26 · Cleaning + safety */
    S.push({ id: 'nettoyage-securite', ch: 'pose', title: { fr: 'Nettoyage & sécurité', en: 'Cleaning & safety', ar: 'التنظيف والسلامة' }, pages: [27], html: function () {
      return head(t(TEXT.poseTitle), t(TEXT.cleanTitle)) +
        '<section class="step"><div class="prose">' + paras(t(TEXT.clean)) + '</div><div class="step-imgs n1"><figure>' + img('pose-clean', t(TEXT.cleanTitle)) + '</figure></div></section>' +
        '<section class="step"><div><h3>' + t(TEXT.safetyTitle) + '</h3><div class="prose">' + paras(t(TEXT.safety)) + '</div></div><div class="step-imgs n1"><figure class="on-white">' + img('pose-ppe', t(TEXT.safetyTitle)) + '</figure></div></section>';
    } });

    /* 27 · Kerbs chapter */
    S.push({ id: 'bordures', ch: 'bordures', title: TEXT.bordTitle, pages: [29], cls: 'sl-chapter', html: function () {
      var items = [['bordure-americaine', 'Bordure américaine', 'amer-r1'], ['bordures-t', 'Bordure T1-T2-T3-T4', 't-render'], ['bordures-p1-cr1', 'Bordure P1 - CR1', 'p-render'],
        ['trambord', 'Trambord', 'tram-render'], ['caniveaux-cc', 'Caniveau CC1 & CC2', 'cc-r1'], ['caniveaux-cs', 'Caniveau CS1 & CS3', 'cs-r1'],
        ['mobilier', t(TEXT.mobTitle), 'mob-top'], ['bancs', t(TEXT.benchTitle), 'banc-tk100'], ['bornes', t(TEXT.bollardTitle), 'borne-tk002']];
      return '<div class="chapter-band"><p class="mono">TK Béton</p><h2>' + t(TEXT.bordTitle) + '</h2><p>' + t(TEXT.bordLead) + '</p></div>' +
        '<ul class="model-grid wide">' + items.map(function (m) {
          return '<li><button type="button" data-go="' + m[0] + '">' + img(m[2], '') + '<b>' + m[1] + '</b></button></li>';
        }).join('') + '</ul>';
    } });

    /* 28 · American kerb */
    S.push({ id: 'bordure-americaine', ch: 'bordures', title: L3('Bordure américaine', 'American kerb', 'الرصيف الأمريكي'), pages: [30], html: function () {
      return head(t(U.specs), t(this.title)) + '<div class="kerb-pair">' + D.KERBS.amer.map(function (k) {
        return '<article class="kerb"><h3>' + k[0] + '</h3><div class="kerb-grid"><figure class="diagram">' + img(k[1], k[0]) + '</figure>' +
          dl(k[3].map(row)) + '</div><figure class="render">' + img(k[2], k[0]) + '</figure></article>';
      }).join('') + '</div><figure class="banner">' + img('amer-photo', t(this.title)) + '</figure>' + quote('Bordure américaine');
    } });

    /* 29 · T1–T4 */
    S.push({ id: 'bordures-t', ch: 'bordures', title: L3('Bordure T1-T2-T3-T4', 'Kerb T1-T2-T3-T4', 'رصيف T1-T2-T3-T4'), pages: [31], html: function () {
      return head(t(U.specs), t(this.title)) + '<div class="kerb-top"><figure class="diagram">' + img('t-diag', 'T1 T2 T3 T4') + '</figure><figure class="render">' + img('t-render', 'T1 T2 T3 T4') + '</figure></div>' +
        kerbTable(D.KERBS.t.map(function (r) { return [r[0], '1', '1 m', r[1], r[2], '± 1 cm', r[3], r[4], r[5], r[6], r[7]]; }), false) +
        '<figure class="banner">' + img('t-photo', t(this.title)) + '</figure>' + quote('Bordure T1-T2-T3-T4');
    } });

    /* 30 · P1 / CR1 */
    S.push({ id: 'bordures-p1-cr1', ch: 'bordures', title: L3('Bordure P1 - CR1', 'Kerb P1 - CR1', 'رصيف P1 - CR1'), pages: [32], html: function () {
      return head(t(U.specs), t(this.title)) + '<div class="kerb-top"><figure class="diagram">' + img('p-diag', 'P1 CR1') + '</figure><figure class="render">' + img('p-render', 'P1 CR1') + '</figure></div>' +
        kerbTable(D.KERBS.p.map(function (r) { return [r[0], '1', '1 m', r[1], r[2], '± 1 cm', r[4], r[5], r[6], r[7], r[8], t(r[3] ? U.yes : U.no)]; }), true) +
        '<div class="photo-pair"><figure>' + img('p-photo1', 'P1') + '</figure><figure>' + img('p-photo2', 'CR1') + '</figure></div>' + quote('Bordure P1 - CR1');
    } });

    /* 31 · Trambord */
    S.push({ id: 'trambord', ch: 'bordures', title: { fr: 'Trambord', en: 'Trambord', ar: 'Trambord' }, pages: [33], html: function () {
      return head(t(U.specs), 'Trambord') + '<div class="kerb-top"><figure class="diagram">' + img('tram-diag', 'Trambord 1 · XL') + '</figure><figure class="render">' + img('tram-render', 'Trambord') + '</figure></div>' +
        kerbTable(D.KERBS.tram.map(function (r) { return [r[0], '1', '100 cm', r[1], r[2], '± 1 cm', r[3], r[4], r[5], r[6], r[7]]; }), false, t(U.various)) +
        '<div class="photo-pair"><figure>' + img('tram-photo1', 'Trambord') + '</figure><figure>' + img('tram-photo2', 'Trambord') + '</figure></div>' + quote('Trambord');
    } });

    /* 32–33 · Channels */
    [['caniveaux-cc', 'Caniveau CC1 & CC2', 'Channel CC1 & CC2', 'قناة التصريف CC1 و CC2', D.KERBS.cc, 'cc', 34], ['caniveaux-cs', 'Caniveau CS1 & CS3', 'Channel CS1 & CS3', 'قناة التصريف CS1 و CS3', D.KERBS.cs, 'cs', 35]].forEach(function (c) {
      S.push({ id: c[0], ch: 'bordures', title: L3(c[1], c[2], c[3]), pages: [c[6]], html: function () {
        return head(t(U.specs), t(this.title)) + '<div class="kerb-pair">' + c[4].map(function (k) {
          return '<article class="kerb"><h3>' + k[0] + '</h3><div class="kerb-grid"><figure class="diagram">' + img(k[1], k[0]) + '</figure>' + dl(k[3].map(row)) + '</div><figure class="render">' + img(k[2], k[0]) + '</figure></article>';
        }).join('') + '</div><figure class="diagram wide">' + img(c[5] + '-asm', t(U.assembly)) + '<figcaption class="mono">' + t(U.assembly) + '</figcaption></figure>' +
          '<figure class="banner">' + img(c[5] + '-photo', t(this.title)) + '</figure>' + quote(c[1]);
      } });
    });

    /* 34 · Custom street furniture */
    S.push({ id: 'mobilier', ch: 'mobilier', title: TEXT.mobTitle, pages: [36], cls: 'sl-chapter', html: function () {
      return '<div class="chapter-band"><p class="mono">TK Béton</p><h2>' + t(TEXT.mobTitle) + '</h2><div class="prose">' + paras(t(TEXT.mob)) + '</div></div>' +
        '<div class="photo-pair uneven"><figure>' + img('mob-top', t(TEXT.mobTitle)) + '</figure><figure>' + img('mob-collage', t(TEXT.mobTitle)) + '</figure></div>' + quote('');
    } });

    /* 35 · Benches */
    S.push({ id: 'bancs', ch: 'mobilier', title: TEXT.benchTitle, pages: [37], html: function () {
      return head(t(UI.chapters.mobilier), t(TEXT.benchTitle)) + '<div class="furniture">' + D.BENCHES.map(function (b) {
        var rows = [[t(U.length), b[2]], [t(U.depth), b[3]], [t(U.height), b[4]], [t(U.seatThick), b[5]], [t(U.clearance), b[6]]];
        if (b[7]) { rows.push([t(U.legs), b[7]]); }
        return '<article class="item"><figure class="dark">' + img(b[1], 'Banc ' + b[0]) + '</figure><div><h3>Banc ' + b[0] + '</h3>' +
          '<figure class="diagram small">' + img(b[1] + '-d', 'Banc ' + b[0]) + '</figure>' + dl(rows.map(ltr)) + '</div></article>';
      }).join('') + '</div>' + quote(t(TEXT.benchTitle));
    } });

    /* 36 · Bollards */
    S.push({ id: 'bornes', ch: 'mobilier', title: TEXT.bollardTitle, pages: [38], html: function () {
      return head(t(UI.chapters.mobilier), t(TEXT.bollardTitle)) + '<div class="bollards">' + D.BOLLARDS.map(function (b) {
        return '<article><figure>' + img(b[1], 'Borne ' + b[0]) + '</figure><h3>Borne ' + b[0] + '</h3>' +
          dl(b[2].map(function (r) { return [t(U[r[0]]), r[1] ? '<span dir="ltr">' + r[1] + '</span>' : '✓']; })) + '</article>';
      }).join('') + '</div>' + quote(t(TEXT.bollardTitle));
    } });

    /* 37 · Gallery */
    S.push({ id: 'realisations', ch: 'fin', title: TEXT.galleryTitle, pages: [39], html: function () {
      return head('TK Béton', t(TEXT.galleryTitle)) + '<figure class="gallery">' + img('gallery', t(TEXT.galleryTitle)) + '</figure>';
    } });

    /* 38 · Back cover */
    S.push({ id: 'contact', ch: 'fin', title: TEXT.endTitle, pages: [2, 28, 40], cls: 'sl-end', html: function () {
      return '<div class="chapter-band"><p class="mono">TK Béton</p><h2>' + t(TEXT.endTitle) + '</h2><p>' + t(TEXT.end) + '</p>' +
        '<div class="cta-row"><a class="btn btn-ink" href="' + PDF + '" download><span aria-hidden="true">↓</span> ' + t(U.download) + '</a>' +
        '<a class="btn btn-line" href="index.html#contact">' + t(U.quote) + ' <span class="arrow" aria-hidden="true">→</span></a>' +
        '<a class="btn btn-line" href="tel:+212537522534" dir="ltr">05 37 52 25 34</a></div></div>' +
        '<h3>' + t(TEXT.contactsTitle) + '</h3><div class="contacts">' + ['usine', 'siege'].map(function (k) {
          var c = D.CONTACTS[k];
          var rows = [[t(U.tel), c.tel.map(telLink).join('<br>')], [t(U.fax), '<span dir="ltr">' + c.fax + '</span>']];
          if (c.gsm.length) { rows.push([t(U.gsm), c.gsm.map(telLink).join('<br>')]); }
          rows.push([t(U.email), '<a href="mailto:' + c.email + '" dir="ltr">' + c.email + '</a>']);
          return '<article class="contact-card"><h3>' + t(U[k]) + '</h3><p>' + c.addr + '</p>' + dl(rows) + '</article>';
        }).join('') + '</div>';
    } });

    return S;
  }

  function L3(fr, en, ar) { return { fr: fr, en: en, ar: ar }; }
  function li(list) { return list.map(function (x) { return '<li>' + x + '</li>'; }).join(''); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function telLink(n) { return '<a href="tel:' + n.replace(/\s/g, '') + '" dir="ltr">' + n + '</a>'; }
  function ltr(r) { return [r[0], '<span dir="ltr">' + r[1] + '</span>']; }
  function row(r) {
    var v = r[1] === 'natural' ? t(UI.natural) : r[1] === 'various' ? t(UI.various) : '<span dir="ltr">' + num(r[1]) + '</span>';
    return [t(UI[r[0]]), v];
  }
  /* rows: name, ml, length, width, height, tolerance, kg/piece, pieces/pallet, kg/pallet, B1, B2[, rounded] */
  function kerbTable(rows, withRounded, colour) {
    var U = UI;
    var h = [t(U.model), t(U.length), t(U.width), t(U.height)].concat(withRounded ? [t(U.rounded)] : []).concat([t(U.tolerances), t(U.kgPiece), t(U.perPallet), t(U.kgPallet), t(U.classB1), t(U.classB2)]);
    var body = rows.map(function (r) {
      var cells = [r[0], r[2], r[3], r[4]].concat(withRounded ? [r[11]] : []).concat([r[5], r[6] + ' kg', r[7], r[8] + ' kg', num(r[9]), num(r[10])]);
      return '<tr>' + cells.map(function (c, i) { return i === 0 ? '<th scope="row">' + c + '</th>' : '<td dir="auto">' + c + '</td>'; }).join('') + '</tr>';
    }).join('');
    var cards = rows.map(function (r) {
      var cells = [r[2], r[3], r[4]].concat(withRounded ? [r[11]] : []).concat([r[5], r[6] + ' kg', r[7], r[8] + ' kg', num(r[9]) + ' MPa', num(r[10]) + ' MPa']);
      return '<article class="kerb-card"><h3>' + r[0] + '</h3>' + dl(cells.map(function (c, i) { return [h[i + 1], c]; })) + '</article>';
    }).join('');
    return '<div class="table-scroll"><table class="kerb-table"><caption class="mono">' + t(U.resist) + ' — B1 · B2' + (colour ? ' · ' + t(U.colour) + ' : ' + colour : '') + '</caption><thead><tr>' +
      h.map(function (x) { return '<th scope="col">' + x + '</th>'; }).join('') + '</tr></thead><tbody>' + body + '</tbody></table></div>' +
      '<div class="kerb-cards">' + (colour ? '<p class="mono note">' + t(U.colour) + ' : ' + colour + '</p>' : '') + cards + '</div>';
  }

  /* ---------- Build DOM ---------- */
  var SLIDES = buildSlides();

  function renderAll() {
    track.innerHTML = SLIDES.map(function (s, i) {
      return '<article class="slide ' + (s.cls || '') + '" id="' + s.id + '" aria-roledescription="slide" aria-label="' + (i + 1) + ' / ' + SLIDES.length + '"><div class="wrap">' + s.html.call(s) + '</div></article>';
    }).join('');
    slides = Array.prototype.slice.call(track.children);
    track.querySelectorAll('[data-go]').forEach(function (b) {
      b.addEventListener('click', function () { goId(b.getAttribute('data-go')); });
    });
    countT.textContent = String(SLIDES.length);

    var chs = Object.keys(UI.chapters);
    chaptersEl.innerHTML = chs.map(function (c) {
      return '<button type="button" class="chip mono" data-ch="' + c + '">' + t(UI.chapters[c]) + '</button>';
    }).join('');
    chaptersEl.querySelectorAll('[data-ch]').forEach(function (b) {
      b.addEventListener('click', function () {
        var c = b.getAttribute('data-ch');
        for (var i = 0; i < SLIDES.length; i++) { if (SLIDES[i].ch === c) { go(i); break; } }
      });
    });
    tocList.innerHTML = chs.map(function (c) {
      return '<section><h3 class="mono">' + t(UI.chapters[c]) + '</h3><ol>' + SLIDES.map(function (sl, i) {
        return sl.ch === c ? '<li><button type="button" data-i="' + i + '"><span class="n" dir="ltr">' + pad(i + 1) + '</span><span>' + esc(t(sl.title)) + '</span></button></li>' : '';
      }).join('') + '</ol></section>';
    }).join('');
    status();
  }
  /* Contents: a plain list of every page, grouped by chapter */
  function openToc() {
    if (toc.showModal) { toc.showModal(); } else { toc.setAttribute('open', ''); }
    var cur = tocList.querySelector('[aria-current="page"]');
    if (cur) { cur.scrollIntoView({ block: 'center' }); }
  }
  function closeToc() { if (toc.close) { toc.close(); } else { toc.removeAttribute('open'); } }
  openBtn.addEventListener('click', openToc);
  tocBtn.addEventListener('click', openToc);
  doc.getElementById('cat-toc-close').addEventListener('click', closeToc);
  toc.addEventListener('click', function (e) {
    if (e.target === toc) { closeToc(); return; }
    var b = e.target.closest('[data-i]');
    if (b) { closeToc(); go(parseInt(b.getAttribute('data-i'), 10), false); }
  });

  /* ---------- Position: the whole catalogue is one long page; the bar follows the section on screen ---------- */
  function headerH() { var h = doc.querySelector('.site-header'); return h ? h.offsetHeight : 0; }
  /* height covered at the top of the screen: site header, plus the reader bar where it sticks to the top */
  function topCover() {
    var bar = doc.querySelector('.cat-bar');
    return headerH() + (bar && getComputedStyle(bar).position === 'sticky' ? bar.offsetHeight : 0);
  }
  var target = -1;
  function targetY(i) { return Math.max(0, slides[i].getBoundingClientRect().top + window.scrollY - topCover() + 1); }
  /* jump without animation, even though the site turns on smooth scrolling for the whole page */
  function jumpTo(y) {
    var root = doc.documentElement;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, y);
    root.style.scrollBehavior = '';
  }
  function go(i, smooth) {
    if (i < 0 || i >= SLIDES.length) { return; }
    target = i;
    anchor = i;
    setIndex(i);
    var y = targetY(i);
    /* only a short hop animates; long jumps (contents, chapters, links) land at once */
    if (smooth !== false && Math.abs(y - window.scrollY) < window.innerHeight * 2.5) {
      lockUntil = Date.now() + 1500;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      lockUntil = Date.now() + 400;
      jumpTo(y);
      settle();
    }
  }
  /* if anything above moved while scrolling, finish exactly on the section asked for */
  function settle() {
    if (target < 0) { return; }
    var i = target;
    target = -1;
    var tries = 0, still = 0;
    (function fix() {
      if (Math.abs(window.scrollY - targetY(i)) > 4) { jumpTo(targetY(i)); still = 0; } else { still++; }
      if (still < 3 && ++tries < 15) { setTimeout(fix, 70); }
      else { lockUntil = 0; spy(); }
    })();
  }
  function goId(id) { for (var i = 0; i < SLIDES.length; i++) { if (SLIDES[i].id === id) { go(i); return; } } }

  function setIndex(i) {
    if (i === index && countN.textContent === String(i + 1)) { return; }
    index = i;
    status();
    history.replaceState(null, '', '#' + SLIDES[i].id);
  }
  function status() {
    var s = SLIDES[index];
    countN.textContent = String(index + 1);
    fill.style.width = ((index + 1) / SLIDES.length * 100) + '%';
    nowEl.textContent = t(UI.chapters[s.ch]) + ' — ' + t(s.title);
    prev.disabled = index === 0;
    next.disabled = index === SLIDES.length - 1;
    tocList.querySelectorAll('[data-i]').forEach(function (b) {
      if (b.getAttribute('data-i') === String(index)) { b.setAttribute('aria-current', 'page'); } else { b.removeAttribute('aria-current'); }
    });
    chaptersEl.querySelectorAll('[data-ch]').forEach(function (b) {
      var on = b.getAttribute('data-ch') === s.ch;
      b.setAttribute('aria-pressed', String(on));
      /* keep the lit chapter visible in the tab strip, without moving the page */
      if (on) { chaptersEl.scrollTo({ left: b.offsetLeft - (chaptersEl.clientWidth - b.offsetWidth) / 2, behavior: 'smooth' }); }
    });
  }

  /* While reading, the current section is the last one whose top has passed under the bar */
  var lockUntil = 0, ticking = false;
  function spy() {
    ticking = false;
    if (Date.now() < lockUntil || target > -1 || !slides.length) { return; }
    var line = topCover() + window.innerHeight * 0.25;
    var cur = 0;
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].getBoundingClientRect().top <= line) { cur = i; } else { break; }
    }
    if (cur !== index) { setIndex(cur); }
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(spy); }
  }, { passive: true });
  var endTimer;
  window.addEventListener('scroll', function () { clearTimeout(endTimer); endTimer = setTimeout(settle, 160); }, { passive: true });
  window.addEventListener('scrollend', settle);

  prev.addEventListener('click', function () { go(index - 1); });
  next.addEventListener('click', function () { go(index + 1); });
  doc.addEventListener('keydown', function (e) {
    var tg = e.target;
    if ((tg && tg.closest && tg.closest('input, textarea, select')) || toc.open) { return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + (rtl() ? -1 : 1)); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index + (rtl() ? 1 : -1)); }
  });

  /* Re-render in the chosen language, keeping the current section */
  function relabel() {
    prev.setAttribute('aria-label', window.TK.t('cat.prev'));
    next.setAttribute('aria-label', window.TK.t('cat.next'));
    var keep = index;
    renderAll();
    index = keep;
    status();
  }
  doc.addEventListener('tk:lang', function () {
    var keep = index;
    var offset = slides[keep] ? slides[keep].getBoundingClientRect().top : 0;
    relabel();
    if (slides[keep]) { jumpTo(slides[keep].getBoundingClientRect().top + window.scrollY - offset); }
  });

  /* Deep links: catalogue.html#agadir, and old #page-18 links from the PDF viewer */
  function fromHash() {
    var h = location.hash.slice(1);
    h = { contacts: 'contact', presentation: 'a-propos', pourquoi: 'a-propos' }[h] || h;
    var m = /^page-(\d+)$/.exec(h);
    for (var i = 0; i < SLIDES.length; i++) {
      if (m ? SLIDES[i].pages.indexOf(parseInt(m[1], 10)) > -1 : SLIDES[i].id === h) { return i; }
    }
    return -1;
  }
  window.addEventListener('hashchange', function () { var i = fromHash(); if (i > -1 && i !== index) { go(i); } });

  var start = fromHash();
  index = start > -1 ? start : 0;
  relabel();
  if (start > 0) { window.requestAnimationFrame(function () { go(start, false); }); }

  /* Web fonts and pictures can finish loading after a jump and push the page.
     Stay on the section that was asked for, unless the reader has started scrolling by hand. */
  var anchor = start > 0 ? start : -1;
  function handScroll() { anchor = -1; }
  ['wheel', 'touchmove', 'keydown', 'mousedown'].forEach(function (ev) { window.addEventListener(ev, handScroll, { passive: true }); });
  function reAnchor() { if (anchor > -1 && Math.abs(window.scrollY - targetY(anchor)) > 4) { go(anchor, false); } }
  window.addEventListener('load', reAnchor);
  if (doc.fonts && doc.fonts.ready) { doc.fonts.ready.then(reAnchor); }
})();
