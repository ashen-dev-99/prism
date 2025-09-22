// Prism Theme - Sidebar Component
// =====================================

export default class Sidebar {
  constructor(element) {
    this.sidebar = element
    this.toggleButton = document.querySelector('[data-sidebar-toggle]')
    this.mainContent = document.querySelector('.main-content')
    this.footer = document.querySelector('.footer')
    this.isCollapsed = false
    
    // Search elements
    this.searchInput = document.querySelector('[data-sidebar-search]')
    this.searchClear = document.querySelector('[data-sidebar-search-clear]')
    this.searchQuery = ''
    
    this.init()
  }
  
  init() {
    // Load saved state
    this.loadState()
    
    // Bind events
    this.bindEvents()
    
    // Bind search events
    this.bindSearchEvents()
    
    // Apply initial state
    this.updateUI()
  }
  
  loadState() {
    const saved = localStorage.getItem('sidebar-collapsed')
    this.isCollapsed = saved === 'true'
  }
  
  saveState() {
    localStorage.setItem('sidebar-collapsed', this.isCollapsed.toString())
  }
  
  bindEvents() {
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', (e) => {
        e.preventDefault()
        this.toggle()
      })
    }
    
    // Handle mobile overlay clicks
    const overlay = document.querySelector('.sidebar-overlay')
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.collapse()
      })
    }
    
    // Handle submenu toggles
    this.bindSubmenuEvents()
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isExpanded()) {
        this.collapse()
      }
    })
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.updateUI()
    })
  }

  bindSubmenuEvents() {
    const submenuToggles = this.sidebar.querySelectorAll('[data-submenu-toggle]')
    
    submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault()
        this.toggleSubmenu(toggle)
      })

      // Handle keyboard navigation
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          this.toggleSubmenu(toggle)
        }
      })
    })
  }

  toggleSubmenu(toggle) {
    const navItem = toggle.closest('.sidebar-nav-item--has-submenu')
    if (!navItem) return

    const isExpanded = navItem.classList.contains('expanded')
    
    if (isExpanded) {
      this.collapseSubmenu(navItem)
    } else {
      this.expandSubmenu(navItem)
    }
  }

  expandSubmenu(navItem) {
    navItem.classList.add('expanded')
    
    // Update ARIA attributes
    const toggle = navItem.querySelector('[data-submenu-toggle]')
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true')
    }
  }

  collapseSubmenu(navItem) {
    navItem.classList.remove('expanded')
    
    // Update ARIA attributes
    const toggle = navItem.querySelector('[data-submenu-toggle]')
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false')
    }
  }

  collapseAllSubmenus() {
    const expandedSubmenus = this.sidebar.querySelectorAll('.sidebar-nav-item--has-submenu.expanded')
    expandedSubmenus.forEach(submenu => {
      this.collapseSubmenu(submenu)
    })
  }
  
  toggle() {
    this.isCollapsed = !this.isCollapsed
    this.updateUI()
    this.saveState()
  }
  
  updateUI() {
    const isMobile = window.innerWidth < 768 // md breakpoint
    
    // Update sidebar
    if (this.isCollapsed) {
      this.sidebar.classList.add('sidebar--collapsed')
    } else {
      this.sidebar.classList.remove('sidebar--collapsed')
      // Hide all popovers when sidebar expands
      this.hideAllSubmenuPopovers()
    }
    
    // On mobile, handle three states: hidden, minimized, expanded
    if (isMobile) {
      if (this.isCollapsed) {
        // Minimized state - show only icons
        this.sidebar.classList.remove('show')
        this.sidebar.classList.add('sidebar--collapsed')
        document.body.classList.remove('sidebar-open')
      } else {
        // Expanded state - show full content
        this.sidebar.classList.add('show')
        this.sidebar.classList.remove('sidebar--collapsed')
        document.body.classList.add('sidebar-open')
      }
    }
    
    // Update main content
    if (this.mainContent) {
      if (this.isCollapsed) {
        this.mainContent.classList.add('main-content--collapsed')
      } else {
        this.mainContent.classList.remove('main-content--collapsed')
      }
    }
    
    // Update footer
    if (this.footer) {
      if (this.isCollapsed) {
        this.footer.classList.add('footer--collapsed')
      } else {
        this.footer.classList.remove('footer--collapsed')
      }
    }
  }
  
  // Public methods
  collapse() {
    if (!this.isCollapsed) {
      this.toggle()
    }
  }
  
  expand() {
    if (this.isCollapsed) {
      this.toggle()
    }
  }
  
  // Mobile-specific methods
  minimize() {
    if (window.innerWidth < 768) {
      this.isCollapsed = true
      this.updateUI()
      this.saveState()
    }
  }
  
  maximize() {
    if (window.innerWidth < 768) {
      this.isCollapsed = false
      this.updateUI()
      this.saveState()
    }
  }
  
  isExpanded() {
    return !this.isCollapsed
  }
  
  isCollapsedState() {
    return this.isCollapsed
  }
  
  isMobile() {
    return window.innerWidth < 768
  }
  
  // Search functionality
  bindSearchEvents() {
    if (!this.searchInput) return
    
    // Search input events
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim()
      this.filterMenuItems()
      this.updateSearchClearButton()
    })
    
    // Clear button events
    if (this.searchClear) {
      this.searchClear.addEventListener('click', () => {
        this.clearSearch()
      })
    }
    
    // Keyboard shortcuts
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.clearSearch()
        this.searchInput.blur()
      }
    })

    // Initialize search modal for collapsed sidebar
    this.initSearchModal()
  }

  // Initialize search modal for collapsed sidebar
  initSearchModal() {
    const searchModal = document.getElementById('searchModal')
    const searchModalInput = document.getElementById('searchModalInput')
    const searchModalResults = document.getElementById('searchModalResults')
    const searchToggleButtons = document.querySelectorAll('[data-sidebar-search-toggle]')

    if (!searchModal || !searchModalInput) return

    // Toggle search modal
    searchToggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.toggleSearchModal()
      })
    })

    // Search functionality in modal
    searchModalInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim()
      
      if (query === '') {
        this.clearSearchModal(searchModalResults)
        return
      }

      this.performSearchModal(query, searchModalResults)
    })

    // Close modal on escape
    searchModalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSearchModal()
      }
    })

    // Close modal on backdrop click
    const backdrop = searchModal.querySelector('.search-modal-backdrop')
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        this.closeSearchModal()
      })
    }

    // Initialize submenu popovers for collapsed state
    this.initSubmenuPopovers()
  }

  // Initialize submenu popovers for collapsed sidebar
  initSubmenuPopovers() {
    const submenuItems = this.sidebar.querySelectorAll('.sidebar-nav-item--has-submenu')
    
    submenuItems.forEach(item => {
      const popover = item.querySelector('.sidebar-nav-sub-popover')
      if (!popover) return

      // Add hover event listeners
      item.addEventListener('mouseenter', () => {
        if (this.isCollapsed) {
          this.showSubmenuPopover(item, popover)
        }
      })

      item.addEventListener('mouseleave', () => {
        if (this.isCollapsed) {
          this.hideSubmenuPopover(popover)
        }
      })

      // Add click handlers for popover links
      const popoverLinks = popover.querySelectorAll('.sidebar-nav-sub-link')
      popoverLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          const href = link.getAttribute('href')
          if (href && href !== '#') {
            window.location.href = href
          }
          this.hideSubmenuPopover(popover)
        })
      })
    })

    // Hide all popovers when sidebar expands
    this.sidebar.addEventListener('transitionend', () => {
      if (!this.isCollapsed) {
        this.hideAllSubmenuPopovers()
      }
    })
  }

  // Show submenu popover
  showSubmenuPopover(item, popover) {
    // Hide other popovers first
    this.hideAllSubmenuPopovers()
    
    // Position the popover using fixed positioning
    const itemRect = item.getBoundingClientRect()
    const sidebarRect = this.sidebar.getBoundingClientRect()
    
    // Calculate position relative to viewport
    const top = itemRect.top
    const left = sidebarRect.right + 8 // 8px gap from sidebar
    
    popover.style.top = `${top}px`
    popover.style.left = `${left}px`
    
    // Show popover
    popover.style.display = 'block'
  }

  // Hide submenu popover
  hideSubmenuPopover(popover) {
    popover.style.display = 'none'
  }

  // Hide all submenu popovers
  hideAllSubmenuPopovers() {
    const popovers = this.sidebar.querySelectorAll('.sidebar-nav-sub-popover')
    popovers.forEach(popover => {
      this.hideSubmenuPopover(popover)
    })
  }

  // Toggle search modal
  toggleSearchModal() {
    const searchModal = document.getElementById('searchModal')
    const searchModalInput = document.getElementById('searchModalInput')
    
    if (!searchModal) return

    if (searchModal.classList.contains('active')) {
      this.closeSearchModal()
    } else {
      this.openSearchModal()
    }
  }

  // Open search modal
  openSearchModal() {
    const searchModal = document.getElementById('searchModal')
    const searchModalInput = document.getElementById('searchModalInput')
    
    if (!searchModal) return

    searchModal.classList.add('active')
    document.body.style.overflow = 'hidden'
    
    // Focus input after animation
    setTimeout(() => {
      if (searchModalInput) {
        searchModalInput.focus()
      }
    }, 100)
  }

  // Close search modal
  closeSearchModal() {
    const searchModal = document.getElementById('searchModal')
    const searchModalInput = document.getElementById('searchModalInput')
    const searchModalResults = document.getElementById('searchModalResults')
    
    if (!searchModal) return

    searchModal.classList.remove('active')
    document.body.style.overflow = ''
    
    // Clear search
    if (searchModalInput) {
      searchModalInput.value = ''
    }
    if (searchModalResults) {
      searchModalResults.innerHTML = ''
    }
  }

  // Perform search in modal
  performSearchModal(query, resultsContainer) {
    const menuItems = this.sidebar.querySelectorAll('.sidebar-nav-item')
    const results = []

    menuItems.forEach(item => {
      const link = item.querySelector('.sidebar-nav-link')
      const subLinks = item.querySelectorAll('.sidebar-nav-sub-link')
      
      if (!link) return

      const text = link.textContent.toLowerCase()
      const isMatch = text.includes(query)
      
      if (isMatch) {
        const icon = link.querySelector('.nav-icon i')
        const iconClass = icon ? icon.className : 'fas fa-circle'
        
        results.push({
          title: link.textContent.trim(),
          href: link.getAttribute('href') || '#',
          icon: iconClass,
          path: this.getMenuPath(item)
        })
      }

      // Check submenu items
      subLinks.forEach(subLink => {
        const subText = subLink.textContent.toLowerCase()
        const isSubMatch = subText.includes(query)
        
        if (isSubMatch) {
          const subIcon = subLink.querySelector('.nav-icon i')
          const subIconClass = subIcon ? subIcon.className : 'fas fa-circle'
          
          results.push({
            title: subLink.textContent.trim(),
            href: subLink.getAttribute('href') || '#',
            icon: subIconClass,
            path: this.getMenuPath(item) + ' > ' + this.getMenuPath(subLink.closest('.sidebar-nav-item'))
          })
        }
      })
    })

    this.displaySearchResults(results, resultsContainer)
  }

  // Get menu path for breadcrumb
  getMenuPath(element) {
    const section = element.closest('.sidebar-nav-section')
    const sectionTitle = section ? section.querySelector('.sidebar-nav-section-title')?.textContent : ''
    return sectionTitle || 'Menu'
  }

  // Display search results in modal
  displaySearchResults(results, container) {
    if (!container) return

    if (results.length === 0) {
      container.innerHTML = `
        <div class="search-no-results">
          <i class="fas fa-search"></i>
          <p>No menu items found</p>
          <small>Try a different search term</small>
        </div>
      `
      return
    }

    const resultsHTML = results.map(result => `
      <div class="search-result-item" data-href="${result.href}">
        <div class="search-result-icon">
          <i class="${result.icon}"></i>
        </div>
        <div class="search-result-text">
          <p class="search-result-title">${result.title}</p>
          <p class="search-result-path">${result.path}</p>
        </div>
      </div>
    `).join('')

    container.innerHTML = resultsHTML

    // Add click handlers to results
    container.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const href = item.getAttribute('data-href')
        if (href && href !== '#') {
          window.location.href = href
        }
        this.closeSearchModal()
      })
    })
  }

  // Clear search modal
  clearSearchModal(container) {
    if (container) {
      container.innerHTML = ''
    }
  }
  
  filterMenuItems() {
    const menuItems = this.sidebar.querySelectorAll('.sidebar-nav-link')
    const sections = this.sidebar.querySelectorAll('.sidebar-nav-section')
    
    if (!this.searchQuery) {
      // Show all items
      menuItems.forEach(item => {
        item.closest('.sidebar-nav-item').style.display = ''
      })
      sections.forEach(section => {
        section.style.display = ''
      })
      return
    }
    
    let hasVisibleItems = false
    
    sections.forEach(section => {
      const items = section.querySelectorAll('.sidebar-nav-item')
      let sectionHasVisibleItems = false
      
      items.forEach(item => {
        const link = item.querySelector('.sidebar-nav-link')
        const text = link.textContent.toLowerCase()
        const isVisible = text.includes(this.searchQuery)
        
        item.style.display = isVisible ? '' : 'none'
        
        if (isVisible) {
          sectionHasVisibleItems = true
          hasVisibleItems = true
        }
      })
      
      section.style.display = sectionHasVisibleItems ? '' : 'none'
    })
    
    // Show/hide "No results" message
    this.toggleNoResultsMessage(!hasVisibleItems)
  }
  
  updateSearchClearButton() {
    if (!this.searchClear) return
    
    if (this.searchQuery) {
      this.searchClear.classList.add('show')
    } else {
      this.searchClear.classList.remove('show')
    }
  }
  
  clearSearch() {
    this.searchInput.value = ''
    this.searchQuery = ''
    this.filterMenuItems()
    this.updateSearchClearButton()
  }
  
  toggleNoResultsMessage(show) {
    let noResults = this.sidebar.querySelector('.sidebar-no-results')
    
    if (show && !noResults) {
      noResults = document.createElement('div')
      noResults.className = 'sidebar-no-results'
      noResults.innerHTML = `
        <div class="sidebar-no-results-content">
          <i class="fas fa-search"></i>
          <p>No menu items found</p>
          <small>Try a different search term</small>
        </div>
      `
      this.sidebar.querySelector('.sidebar-nav').appendChild(noResults)
    } else if (!show && noResults) {
      noResults.remove()
    }
  }
}
