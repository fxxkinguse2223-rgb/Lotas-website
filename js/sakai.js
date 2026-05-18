(function () {
  'use strict';

  // モバイルナビ トグル
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // ナビリンクをタップしたら閉じる
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // スクロールアニメーション
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // ヒーロー動画フォールバック
  var vid = document.querySelector('.hero-video');
  if (vid) {
    setTimeout(function () {
      if (vid.readyState < 2) vid.style.display = 'none';
    }, 3500);
  }
})();
