(function () {
  'use strict';
  var doc = document;
  var root = doc.documentElement;

  /* ---------- Translation ---------- */
  var SUPPORTED = ['fr', 'en', 'ar'];
  var T = window.TK_I18N;
  var lang = 'fr';

  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  function t(key) { return (T[lang] && T[lang][key]) || T.fr[key] || ''; }

  function applyLang(next) {
    if (SUPPORTED.indexOf(next) === -1) { next = 'fr'; }
    lang = next;
    root.lang = next;
    root.dir = next === 'ar' ? 'rtl' : 'ltr';
    doc.title = t('meta.title');
    doc.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    doc.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === next)); });
    safeSet('tk-lang', next);
    if (current) { showPreview(current); }
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = doc.querySelector('.menu-btn');
  var nav = doc.getElementById('main-nav');
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- Range index: live preview of the hovered model ---------- */
  var rows = Array.prototype.slice.call(doc.querySelectorAll('.index .row'));
  var previewImg = doc.getElementById('preview-img');
  var previewCap = doc.getElementById('preview-cap');
  var current = null;

  function showPreview(row) {
    var family = row.parentElement.getAttribute('data-family');
    var name = row.querySelector('.name').textContent;
    var num = row.querySelector('.num').textContent;
    rows.forEach(function (r) { r.classList.toggle('is-current', r === row); });
    previewCap.textContent = t('fig.word') + ' ' + num + ' — ' + name + ' · ' + t('fam.' + family);
    previewImg.alt = name;
    if (row !== current && previewImg.getAttribute('src') !== row.getAttribute('data-img')) {
      previewImg.classList.add('swap');
      previewImg.onload = function () { previewImg.classList.remove('swap'); };
      previewImg.src = row.getAttribute('data-img');
    }
    current = row;
  }
  rows.forEach(function (row) {
    row.addEventListener('mouseenter', function () { showPreview(row); });
    row.addEventListener('focus', function () { showPreview(row); });
  });

  /* ---------- Family filter ---------- */
  var filterBtns = doc.querySelectorAll('[data-filter]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      var first = null;
      rows.forEach(function (row) {
        var li = row.parentElement;
        var show = f === 'all' || li.getAttribute('data-family') === f;
        li.hidden = !show;
        if (show && !first) { first = row; }
      });
      if (first) { showPreview(first); }
    });
  });

  /* ---------- Quote links pre-fill the form with the model name ---------- */
  var form = doc.getElementById('contact-form');
  var autoFilled = '';
  doc.querySelectorAll('[data-product]').forEach(function (a) {
    a.addEventListener('click', function () {
      var msg = form.elements.msg;
      if (!msg.value || msg.value === autoFilled) {
        autoFilled = t('nav.quote') + ' — ' + a.getAttribute('data-product') + ' — ';
        msg.value = autoFilled;
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var body = form.elements.name.value + '\n' + form.elements.phone.value + '\n\n' + form.elements.msg.value;
    window.location.href = 'mailto:info@tkbeton.ma?subject=' + encodeURIComponent('TK Béton — ' + form.elements.name.value) + '&body=' + encodeURIComponent(body);
  });

  /* ---------- Language (French by default; a visitor's own choice is remembered) ---------- */
  doc.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });
  if (rows.length) { showPreview(rows[0]); }
  applyLang(safeGet('tk-lang') || 'fr');
})();
