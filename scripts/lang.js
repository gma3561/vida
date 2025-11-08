(function () {
  const langButtons = document.querySelectorAll('.lang-btn');
  const defaultLang = 'en';

  // Get saved language or use default
  let currentLang = localStorage.getItem('vida-lang') || defaultLang;

  // Apply language
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('vida-lang', lang);

    // Update all elements with language data attributes
    const elements = document.querySelectorAll('[data-lang-en], [data-lang-ko]');
    elements.forEach((el) => {
      const text = el.getAttribute(`data-lang-${lang}`);
      if (text) {
        el.textContent = text;
      }
    });

    // Update active button state
    langButtons.forEach((btn) => {
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
  }

  // Add click handlers to language buttons
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang);
    });
  });

  // Apply saved or default language on page load
  applyLanguage(currentLang);
})();
