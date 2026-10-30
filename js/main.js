(function () {
  'use strict';
  var doc = document;
  var root = doc.documentElement;
  root.classList.add('js');

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
  }

  /* ---------- Header, menu ---------- */
  var header = doc.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 120); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var menuBtn = doc.querySelector('.menu-btn');
  var nav = doc.getElementById('main-nav');
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- Expanding collection panels ---------- */
  var panels = doc.querySelectorAll('.panel');
  function activate(p) { panels.forEach(function (x) { x.classList.toggle('active', x === p); }); }
  panels.forEach(function (p) {
    p.addEventListener('mouseenter', function () { activate(p); });
    p.addEventListener('focus', function () { activate(p); });
  });
  if (panels.length) { activate(panels[0]); }

  /* ---------- Scroll reveal ---------- */
  var revealEls = doc.querySelectorAll('.section-head, .rail li, .band-copy, .craft-grid > *, .contact-grid > *, .pillars-grid > div, .panels');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else { revealEls.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- Contact: quote buttons pre-fill the message ---------- */
  var form = doc.getElementById('contact-form');
  doc.querySelectorAll('[data-product]').forEach(function (a) {
    a.addEventListener('click', function () {
      var msg = form.elements.msg;
      if (!msg.value) { msg.value = a.getAttribute('data-product') + ' — '; }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var body = form.elements.name.value + '\n' + form.elements.phone.value + '\n\n' + form.elements.msg.value;
    window.location.href = 'mailto:info@tkbeton.ma?subject=' + encodeURIComponent('TK Béton — ' + form.elements.name.value) + '&body=' + encodeURIComponent(body);
  });

  /* ---------- Language buttons (French is the default) ---------- */
  doc.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });
  applyLang(safeGet('tk-lang') || 'fr');
})();
