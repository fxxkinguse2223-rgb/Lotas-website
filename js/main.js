// ============================================================
// 株式会社Lotus - 共通スクリプト
// ============================================================

(function () {
  'use strict';

  // ヘッダーのスクロール状態
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // モバイルナビのトグル
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      header.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        header.classList.remove('is-open');
      });
    });
  }

  // スクロール出現アニメーション (IntersectionObserver)
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  // 現在年の更新
  const year = document.querySelector('[data-current-year]');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  // お問い合わせフォームのバリデーション
  const form = document.querySelector('#contact-form');
  if (form) {
    const showError = (field, message) => {
      const wrap = field.closest('.form-field');
      if (!wrap) return;
      wrap.classList.add('has-error');
      const errorEl = wrap.querySelector('.form-error');
      if (errorEl) errorEl.textContent = message;
    };

    const clearError = (field) => {
      const wrap = field.closest('.form-field');
      if (!wrap) return;
      wrap.classList.remove('has-error');
      const errorEl = wrap.querySelector('.form-error');
      if (errorEl) errorEl.textContent = '';
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const telRegex = /^[0-9\-+\s()]{9,}$/;

    const validate = () => {
      let valid = true;

      const name = form.querySelector('[name="name"]');
      if (name && !name.value.trim()) {
        showError(name, 'お名前をご入力ください。');
        valid = false;
      } else if (name) {
        clearError(name);
      }

      const company = form.querySelector('[name="company"]');
      if (company && !company.value.trim()) {
        showError(company, '会社名をご入力ください。');
        valid = false;
      } else if (company) {
        clearError(company);
      }

      const email = form.querySelector('[name="email"]');
      if (email) {
        const val = email.value.trim();
        if (!val) {
          showError(email, 'メールアドレスをご入力ください。');
          valid = false;
        } else if (!emailRegex.test(val)) {
          showError(email, 'メールアドレスの形式が正しくありません。');
          valid = false;
        } else {
          clearError(email);
        }
      }

      const tel = form.querySelector('[name="tel"]');
      if (tel && tel.value.trim()) {
        if (!telRegex.test(tel.value.trim())) {
          showError(tel, '電話番号の形式が正しくありません。');
          valid = false;
        } else {
          clearError(tel);
        }
      } else if (tel) {
        clearError(tel);
      }

      const category = form.querySelector('[name="category"]');
      if (category && !category.value) {
        showError(category, 'お問い合わせ種別をお選びください。');
        valid = false;
      } else if (category) {
        clearError(category);
      }

      const message = form.querySelector('[name="message"]');
      if (message) {
        const val = message.value.trim();
        if (!val) {
          showError(message, 'お問い合わせ内容をご入力ください。');
          valid = false;
        } else if (val.length < 10) {
          showError(message, '10文字以上でご入力ください。');
          valid = false;
        } else {
          clearError(message);
        }
      }

      const privacy = form.querySelector('[name="privacy"]');
      if (privacy && !privacy.checked) {
        showError(privacy, 'プライバシーポリシーへの同意が必要です。');
        valid = false;
      } else if (privacy) {
        clearError(privacy);
      }

      return valid;
    };

    // 入力中のリアルタイム解除
    form.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('input', () => clearError(field));
      field.addEventListener('change', () => clearError(field));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) {
        const firstError = form.querySelector('.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      const success = document.querySelector('#form-success');
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }
})();
