// Prism Theme - Main Entry Point
import './styles/main.scss'

// Import utilities
import ThemeManager from './utils/theme-manager.js'
import ComponentRegistry from './utils/component-registry.js'
import Sidebar from './utils/sidebar.js'
import NotificationManager from './utils/notification-manager.js'
import HeaderSearch from './utils/header-search.js'

// Export theme utilities
export { ThemeManager, ComponentRegistry, Sidebar, NotificationManager, HeaderSearch }

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

  // Initialize notification manager
  const notificationDropdown = document.querySelector('.notification-dropdown');
  const notificationBadge = document.querySelector('.notification-badge');
  if (notificationDropdown && notificationBadge) {
      window.notificationManager = new NotificationManager(notificationDropdown, notificationBadge);
      console.log('Notification Manager initialized');
  }

  // Initialize header search
  const headerSearchElement = document.querySelector('.header-search');
  if (headerSearchElement) {
      window.headerSearch = new HeaderSearch(headerSearchElement);
      console.log('Header Search initialized');
  }
  
  console.log('All components initialized')
})
