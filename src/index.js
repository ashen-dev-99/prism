// Prism Theme - Main Entry Point
import './styles/main.scss'

// Import utilities
import ThemeManager from './utils/theme-manager.js'
import ComponentRegistry from './utils/component-registry.js'
import Sidebar from './utils/sidebar.js'

// Export theme utilities
export { ThemeManager, ComponentRegistry, Sidebar }

// Auto-initialize theme and components
document.addEventListener('DOMContentLoaded', () => {
  console.log('Prism Theme initialized')
  
  // Initialize theme manager
  window.themeManager = new ThemeManager()
  
  // Initialize component registry
  window.componentRegistry = new ComponentRegistry()
  
  // Initialize sidebar
  const sidebarElement = document.querySelector('[data-component="sidebar"]')
  if (sidebarElement) {
    window.sidebar = new Sidebar(sidebarElement)
    console.log('Sidebar initialized')
  }
  
  console.log('All components initialized')
})
