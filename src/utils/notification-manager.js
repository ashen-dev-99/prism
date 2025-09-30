// Prism Theme - Notification Manager
// =====================================

class NotificationManager {
  constructor() {
    this.notifications = [];
    this.container = null;
    this.badge = null;
    this.init();
  }

  init() {
    this.container = document.querySelector('.notification-dropdown-body');
    this.badge = document.querySelector('.notification-badge');
    
    if (this.container) {
      this.loadNotifications();
      this.renderNotifications();
    }
  }

  // Load notifications from JSON file or API
  async loadNotifications() {
    try {
      const response = await fetch('assets/data/notifications.json');
      this.notifications = await response.json();
      this.updateBadge();
    } catch (error) {
      console.warn('Could not load notifications:', error);
      // Fallback to empty array
      this.notifications = [];
    }
  }

  // Update notification badge count
  updateBadge() {
    if (this.badge) {
      const unreadCount = this.notifications.filter(n => !n.read).length;
      this.badge.textContent = unreadCount;
      this.badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
  }

  // Render all notifications
  renderNotifications() {
    if (!this.container) return;

    this.container.innerHTML = '';

    if (this.notifications.length === 0) {
      this.container.innerHTML = `
        <div class="notification-item">
          <div class="notification-content">
            <div class="notification-details">
              <p class="notification-title">No notifications</p>
              <p class="notification-text">You're all caught up!</p>
            </div>
          </div>
        </div>
      `;
      return;
    }

    this.notifications.forEach(notification => {
      const notificationElement = this.createNotificationElement(notification);
      this.container.appendChild(notificationElement);
    });
  }

  // Create individual notification element
  createNotificationElement(notification) {
    const element = document.createElement('div');
    element.className = `notification-item ${!notification.read ? 'unread' : ''}`;
    element.setAttribute('data-notification-id', notification.id);
    element.setAttribute('role', 'menuitem');

    const iconClass = this.getIconClass(notification.icon);
    const ctaButton = notification.cta ? this.createCTAButton(notification) : '';

    element.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon notification-icon--${notification.type}">
          <i class="fas fa-${notification.icon}"></i>
        </div>
        <div class="notification-details">
          <p class="notification-title">${notification.title}</p>
          <p class="notification-text">${notification.message}</p>
          <p class="notification-time">${this.formatTime(notification.timestamp)}</p>
          ${ctaButton}
        </div>
        <div class="notification-actions">
          <button class="notification-action" data-action="mark-read" title="Mark as read">
            <i class="fas fa-check"></i>
          </button>
          <button class="notification-action" data-action="dismiss" title="Dismiss">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;

    // Add event listeners
    this.addNotificationEventListeners(element, notification);

    return element;
  }

  // Create CTA button
  createCTAButton(notification) {
    return `
      <div class="notification-cta">
        <a href="${notification.cta.url}" class="notification-cta-btn notification-cta-btn--${notification.type}">
          ${notification.cta.label}
        </a>
      </div>
    `;
  }

  // Get FontAwesome icon class
  getIconClass(iconName) {
    const iconMap = {
      'info-circle': 'fas fa-info-circle',
      'check-circle': 'fas fa-check-circle',
      'exclamation-triangle': 'fas fa-exclamation-triangle',
      'times-circle': 'fas fa-times-circle',
      'bullhorn': 'fas fa-bullhorn',
      'tag': 'fas fa-tag',
      'cog': 'fas fa-cog',
      'shield-alt': 'fas fa-shield-alt',
      'clock': 'fas fa-clock',
      'comment-alt': 'fas fa-comment-alt'
    };
    return iconMap[iconName] || 'fas fa-bell';
  }

  // Add event listeners to notification
  addNotificationEventListeners(element, notification) {
    // Mark as read
    const markReadBtn = element.querySelector('[data-action="mark-read"]');
    if (markReadBtn) {
      markReadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.markAsRead(notification.id);
      });
    }

    // Dismiss notification
    const dismissBtn = element.querySelector('[data-action="dismiss"]');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dismissNotification(notification.id);
      });
    }

    // Click to mark as read
    element.addEventListener('click', () => {
      if (!notification.read) {
        this.markAsRead(notification.id);
      }
    });
  }

  // Mark notification as read
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      notification.read = true;
      this.updateBadge();
      this.renderNotifications();
    }
  }

  // Dismiss notification
  dismissNotification(notificationId) {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.updateBadge();
    this.renderNotifications();
  }

  // Mark all as read
  markAllAsRead() {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
    this.updateBadge();
    this.renderNotifications();
  }

  // Format timestamp (you can customize this)
  formatTime(timestamp) {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }

  // Add new notification
  addNotification(notification) {
    const newNotification = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    this.notifications.unshift(newNotification);
    this.updateBadge();
    this.renderNotifications();
  }

  // Get unread count
  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  // Get all notifications
  getAllNotifications() {
    return this.notifications;
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.notificationManager = new NotificationManager();
});

export default NotificationManager;
