// Prism Theme - Theme Manager
// =====================================

class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.bindEvents();
  }

  getStoredTheme() {
    return localStorage.getItem('prism-theme');
  }

  getPreferredTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('prism-theme', theme);
    this.updateThemeToggles();
    this.dispatchThemeChange();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  updateThemeToggles() {
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(toggle => {
      const isDark = this.currentTheme === 'dark';
      toggle.checked = isDark;
      toggle.setAttribute('aria-checked', isDark);
    });
  }

  bindEvents() {
    // Listen for theme toggle clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-theme-toggle]') || e.target.closest('[data-theme-toggle]')) {
        e.preventDefault();
        this.toggleTheme();
      }
    });

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!this.getStoredTheme()) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }

    // Listen for manual theme selection
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-theme-select]')) {
        this.setTheme(e.target.value);
      }
    });
  }

  dispatchThemeChange() {
    const event = new CustomEvent('themechange', {
      detail: { theme: this.currentTheme }
    });
    document.dispatchEvent(event);
  }

  // Public API methods
  getCurrentTheme() {
    return this.currentTheme;
  }

  isDark() {
    return this.currentTheme === 'dark';
  }

  isLight() {
    return this.currentTheme === 'light';
  }

  // Theme utilities
  static addThemeClass(element, lightClass, darkClass) {
    const themeManager = new ThemeManager();
    const applyTheme = () => {
      if (themeManager.isDark()) {
        element.classList.remove(lightClass);
        element.classList.add(darkClass);
      } else {
        element.classList.remove(darkClass);
        element.classList.add(lightClass);
      }
    };

    applyTheme();
    document.addEventListener('themechange', applyTheme);
  }

  static getThemeColors() {
    const themeManager = new ThemeManager();
    if (themeManager.isDark()) {
      return {
        primary: '#6366f1',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f8fafc',
        border: '#334155'
      };
    } else {
      return {
        primary: '#6366f1',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#0f172a',
        border: '#e2e8f0'
      };
    }
  }
}

export default ThemeManager;
