// Header Search Component
// =======================

class HeaderSearch {
  constructor(searchElement) {
    this.searchElement = searchElement;
    this.toggleButton = this.searchElement.querySelector('.search-toggle');
    this.dropdown = this.searchElement.querySelector('.search-dropdown');
    this.searchInput = this.searchElement.querySelector('.search-input');
    this.searchResults = this.searchElement.querySelector('.search-results');
    this.isOpen = false;
    
    // Sample search data - in a real app, this would come from an API
    this.searchData = [
      {
        id: 'search-001',
        title: 'Dashboard',
        description: 'Main dashboard overview',
        type: 'page',
        icon: 'tachometer-alt',
        url: '/dashboard'
      },
      {
        id: 'search-002',
        title: 'User Management',
        description: 'Manage users and permissions',
        type: 'page',
        icon: 'users',
        url: '/users'
      },
      {
        id: 'search-003',
        title: 'Analytics',
        description: 'View analytics and reports',
        type: 'page',
        icon: 'chart-bar',
        url: '/analytics'
      },
      {
        id: 'search-004',
        title: 'Settings',
        description: 'Application settings',
        type: 'page',
        icon: 'cog',
        url: '/settings'
      },
      {
        id: 'search-005',
        title: 'Notifications',
        description: 'View all notifications',
        type: 'feature',
        icon: 'bell',
        url: '/notifications'
      },
      {
        id: 'search-006',
        title: 'Profile',
        description: 'User profile settings',
        type: 'feature',
        icon: 'user',
        url: '/profile'
      },
      {
        id: 'search-007',
        title: 'Help Center',
        description: 'Get help and support',
        type: 'support',
        icon: 'question-circle',
        url: '/help'
      },
      {
        id: 'search-008',
        title: 'Documentation',
        description: 'API and user documentation',
        type: 'support',
        icon: 'book',
        url: '/docs'
      }
    ];
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupKeyboardShortcuts();
  }

  bindEvents() {
    // Toggle dropdown
    this.toggleButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    });

    // Search input
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });

    // Focus management
    this.searchInput.addEventListener('keydown', (e) => {
      this.handleKeydown(e);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.searchElement.contains(e.target)) {
        this.close();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  setupKeyboardShortcuts() {
    // Ctrl/Cmd + K to open search
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.open();
        this.searchInput.focus();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.dropdown.classList.add('show');
    this.toggleButton.setAttribute('aria-expanded', 'true');
    
    // Focus search input after animation
    setTimeout(() => {
      this.searchInput.focus();
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.dropdown.classList.remove('show');
    this.toggleButton.setAttribute('aria-expanded', 'false');
    this.searchInput.value = '';
    this.clearResults();
  }

  handleSearch(query) {
    if (query.length < 2) {
      this.clearResults();
      return;
    }

    const results = this.searchData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
    );

    this.displayResults(results);
  }

  displayResults(results) {
    this.searchResults.innerHTML = '';

    if (results.length === 0) {
      this.showNoResults();
      return;
    }

    results.forEach(result => {
      const resultElement = this.createResultElement(result);
      this.searchResults.appendChild(resultElement);
    });
  }

  createResultElement(result) {
    const element = document.createElement('a');
    element.href = result.url;
    element.className = 'search-result-item';
    element.setAttribute('role', 'menuitem');
    element.dataset.searchId = result.id;

    element.innerHTML = `
      <div class="search-result-icon">
        <i class="fas fa-${result.icon}"></i>
      </div>
      <div class="search-result-content">
        <h6 class="search-result-title">${result.title}</h6>
        <p class="search-result-description">${result.description}</p>
      </div>
      <div class="search-result-meta">
        <span class="search-result-type">${result.type}</span>
      </div>
    `;

    // Add click handler
    element.addEventListener('click', (e) => {
      e.preventDefault();
      this.navigateToResult(result);
    });

    return element;
  }

  showNoResults() {
    this.searchResults.innerHTML = `
      <div class="search-no-results">
        <i class="fas fa-search search-no-results-icon"></i>
        <p>No results found</p>
        <small>Try different keywords</small>
      </div>
    `;
  }

  clearResults() {
    this.searchResults.innerHTML = '';
  }

  navigateToResult(result) {
    // In a real app, this would navigate to the result URL
    console.log('Navigating to:', result.url);
    
    // For demo purposes, show an alert
    if (typeof window !== 'undefined' && window.alert) {
      alert(`Would navigate to: ${result.url}`);
    }
    
    this.close();
  }

  handleKeydown(e) {
    const results = this.searchResults.querySelectorAll('.search-result-item');
    const currentIndex = Array.from(results).findIndex(item => 
      item === document.activeElement
    );

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = currentIndex < results.length - 1 ? currentIndex + 1 : 0;
        if (results[nextIndex]) {
          results[nextIndex].focus();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : results.length - 1;
        if (results[prevIndex]) {
          results[prevIndex].focus();
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (results[currentIndex]) {
          results[currentIndex].click();
        }
        break;
    }
  }
}

export default HeaderSearch;
