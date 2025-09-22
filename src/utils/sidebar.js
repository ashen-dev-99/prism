// Prism Theme - Sidebar Component
// =====================================

export default class Sidebar {
  constructor(element) {
    this.sidebar = element
    this.toggleButton = document.querySelector('[data-sidebar-toggle]')
    this.mainContent = document.querySelector('.main-content')
    this.footer = document.querySelector('.footer')
    this.isCollapsed = false
    
    this.init()
  }
  
  init() {
    // Load saved state
    this.loadState()
    
    // Bind events
    this.bindEvents()
    
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
}
