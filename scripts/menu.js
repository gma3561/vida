/**
 * Vida Hostel - Mobile Menu Toggle
 */

(function () {
  'use strict';

  const toggleButton = document.querySelector('[data-sidebar-toggle]');
  const sidebarPanel = document.querySelector('[data-sidebar-panel]');
  const sidebarScrim = document.querySelector('[data-sidebar-scrim]');

  if (!toggleButton || !sidebarPanel) {
    console.warn('Sidebar toggle elements not found');
    return;
  }

  // Toggle menu visibility
  function toggleMenu() {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', !isExpanded);
    sidebarPanel.classList.toggle('is-open');
    document.body.classList.toggle('nav-open');

    // Toggle scrim visibility
    if (sidebarScrim) {
      if (isExpanded) {
        sidebarScrim.setAttribute('hidden', '');
      } else {
        sidebarScrim.removeAttribute('hidden');
      }
    }
  }

  // Close menu when clicking outside
  function handleClickOutside(event) {
    if (!sidebarPanel.contains(event.target) && !toggleButton.contains(event.target)) {
      if (sidebarPanel.classList.contains('is-open')) {
        toggleMenu();
      }
    }
  }

  // Close menu on escape key
  function handleEscape(event) {
    if (event.key === 'Escape' && sidebarPanel.classList.contains('is-open')) {
      toggleMenu();
      toggleButton.focus();
    }
  }

  // Event listeners
  toggleButton.addEventListener('click', toggleMenu);
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscape);

  // Close menu when clicking scrim
  if (sidebarScrim) {
    sidebarScrim.addEventListener('click', toggleMenu);
  }

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Close menu if window is resized to desktop
      if (window.innerWidth >= 768 && sidebarPanel.classList.contains('is-open')) {
        toggleMenu();
      }
    }, 250);
  });
})();
