/**
 * Theme Management Script - Sarah Jeffrey Personal Website
 * Handles seamless switching between Dark Mode and Light Mode,
 * localStorage persistence, system preference detection, and accessible UI updates.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'theme';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';

  /**
   * Determine the current active or preferred theme.
   * Priority:
   * 1. HTML attribute (already set by early inline script)
   * 2. localStorage value
   * 3. System prefers-color-scheme preference (fallback to dark mode)
   */
  function getPreferredTheme() {
    const currentAttr = document.documentElement.getAttribute('data-theme');
    if (currentAttr === THEME_DARK || currentAttr === THEME_LIGHT) {
      return currentAttr;
    }

    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme === THEME_DARK || savedTheme === THEME_LIGHT) {
        return savedTheme;
      }
    } catch (e) {
      // LocalStorage might be disabled in private browsing or iframe
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return THEME_LIGHT;
    }

    return THEME_DARK;
  }

  /**
   * Apply theme to <html> and update button accessibility attributes.
   * @param {string} theme - 'dark' | 'light'
   * @param {boolean} persist - Whether to store preference in localStorage
   */
  function setTheme(theme, persist) {
    const validTheme = theme === THEME_LIGHT ? THEME_LIGHT : THEME_DARK;
    document.documentElement.setAttribute('data-theme', validTheme);

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, validTheme);
      } catch (e) {
        // Fallback gracefully
      }
    }

    updateToggleButtons(validTheme);
  }

  /**
   * Update all theme toggle buttons across the page with proper aria attributes & tooltips.
   * @param {string} currentTheme
   */
  function updateToggleButtons(currentTheme) {
    const buttons = document.querySelectorAll('.theme-toggle, #theme-toggle');
    const isDark = currentTheme === THEME_DARK;
    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

    buttons.forEach((btn) => {
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
      btn.setAttribute('aria-pressed', isDark ? 'false' : 'true');
    });
  }

  /**
   * Toggle between dark and light mode.
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    const nextTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    
    // Temporarily enable smooth transition for color changes
    document.documentElement.classList.add('theme-transitioning');
    setTheme(nextTheme, true);

    window.setTimeout(function () {
      document.documentElement.classList.remove('theme-transitioning');
    }, 400);
  }

  // Set initial theme as early as possible
  const initialTheme = getPreferredTheme();
  setTheme(initialTheme, false);

  // Initialize event listeners when DOM is loaded
  function init() {
    updateToggleButtons(document.documentElement.getAttribute('data-theme') || initialTheme);

    // Event delegation for theme toggle button clicks
    document.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('.theme-toggle, #theme-toggle');
      if (toggleBtn) {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Listen for system theme changes if user hasn't explicitly set a preference
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      const handleSystemThemeChange = function (e) {
        let hasSavedPreference = false;
        try {
          hasSavedPreference = !!localStorage.getItem(STORAGE_KEY);
        } catch (err) {}

        if (!hasSavedPreference) {
          setTheme(e.matches ? THEME_LIGHT : THEME_DARK, false);
        }
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleSystemThemeChange);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
