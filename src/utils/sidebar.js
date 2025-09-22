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
  }
  
  toggle() {
    this.isCollapsed = !this.isCollapsed
    this.updateUI()
    this.saveState()
  }
  
  updateUI() {
    // Update sidebar
    if (this.isCollapsed) {
      this.sidebar.classList.add('sidebar--collapsed')
    } else {
      this.sidebar.classList.remove('sidebar--collapsed')
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
  
  isExpanded() {
    return !this.isCollapsed
  }
  
  isCollapsedState() {
    return this.isCollapsed
  }
}
