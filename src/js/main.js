// =============================================================================
// MAIN JAVASCRIPT FILE
// =============================================================================

(function($) {
    'use strict';

    // Global variables
    const AdminTheme = {
        // Configuration
        config: {
            sidebarCollapsed: false,
            theme: 'light',
            sidebarBreakpoint: 1024,
            animationDuration: 300
        },

        // Initialize the application
        init: function() {
            this.loadTheme();
            this.initSidebar();
            this.initThemeToggle();
            this.initSearch();
            this.initNotifications();
            this.initResponsive();
            this.bindEvents();
        },

        // Load saved theme from localStorage
        loadTheme: function() {
            const savedTheme = localStorage.getItem('admin-theme') || 'light';
            this.setTheme(savedTheme);
        },

        // Set theme (light/dark)
        setTheme: function(theme) {
            this.config.theme = theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('admin-theme', theme);
            
            // Update theme toggle button
            const themeToggle = $('#themeToggle i');
            if (theme === 'dark') {
                themeToggle.removeClass('fa-moon').addClass('fa-sun');
            } else {
                themeToggle.removeClass('fa-sun').addClass('fa-moon');
            }
        },

        // Initialize sidebar functionality
        initSidebar: function() {
            const sidebar = $('#sidebar');
            const sidebarToggle = $('#sidebarToggle');
            const headerMenuToggle = $('#headerMenuToggle');

            // Toggle sidebar
            sidebarToggle.on('click', function() {
                AdminTheme.toggleSidebar();
            });

            // Mobile menu toggle
            headerMenuToggle.on('click', function() {
                AdminTheme.toggleMobileMenu();
            });

            // Close sidebar on mobile when clicking outside
            $(document).on('click', function(e) {
                if ($(window).width() < AdminTheme.config.sidebarBreakpoint) {
                    if (!$(e.target).closest('.sidebar, .header-menu-toggle').length) {
                        AdminTheme.closeMobileMenu();
                    }
                }
            });

            // Handle sidebar item clicks
            $('.sidebar-link').on('click', function() {
                $('.sidebar-link').removeClass('active');
                $(this).addClass('active');
            });
        },

        // Toggle sidebar collapsed state
        toggleSidebar: function() {
            const sidebar = $('#sidebar');
            const app = $('#app');
            
            this.config.sidebarCollapsed = !this.config.sidebarCollapsed;
            
            if (this.config.sidebarCollapsed) {
                sidebar.addClass('collapsed');
                app.addClass('sidebar-collapsed');
            } else {
                sidebar.removeClass('collapsed');
                app.removeClass('sidebar-collapsed');
            }
        },

        // Toggle mobile menu
        toggleMobileMenu: function() {
            const sidebar = $('#sidebar');
            sidebar.toggleClass('mobile-open');
        },

        // Close mobile menu
        closeMobileMenu: function() {
            const sidebar = $('#sidebar');
            sidebar.removeClass('mobile-open');
        },

        // Initialize theme toggle
        initThemeToggle: function() {
            $('#themeToggle').on('click', function() {
                const currentTheme = AdminTheme.config.theme;
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                AdminTheme.setTheme(newTheme);
            });
        },

        // Initialize search functionality
        initSearch: function() {
            const searchInput = $('.header-search input');
            
            searchInput.on('input', function() {
                const query = $(this).val().toLowerCase();
                AdminTheme.performSearch(query);
            });

            // Clear search
            searchInput.on('keyup', function(e) {
                if (e.key === 'Escape') {
                    $(this).val('');
                    AdminTheme.clearSearch();
                }
            });
        },

        // Perform search
        performSearch: function(query) {
            // Implement search functionality here
            console.log('Searching for:', query);
            
            // Example: Filter sidebar items
            $('.sidebar-item').each(function() {
                const text = $(this).text().toLowerCase();
                if (text.includes(query)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        },

        // Clear search
        clearSearch: function() {
            $('.sidebar-item').show();
        },

        // Initialize notifications
        initNotifications: function() {
            $('#notificationsToggle').on('click', function() {
                AdminTheme.toggleNotifications();
            });
        },

        // Toggle notifications panel
        toggleNotifications: function() {
            // Implement notifications panel toggle
            console.log('Toggle notifications');
        },

        // Initialize responsive behavior
        initResponsive: function() {
            $(window).on('resize', function() {
                AdminTheme.handleResize();
            });

            // Initial call
            this.handleResize();
        },

        // Handle window resize
        handleResize: function() {
            const width = $(window).width();
            
            if (width < this.config.sidebarBreakpoint) {
                $('#sidebar').addClass('mobile');
                $('#app').removeClass('sidebar-collapsed');
            } else {
                $('#sidebar').removeClass('mobile');
                this.closeMobileMenu();
            }
        },

        // Bind global events
        bindEvents: function() {
            // Handle form submissions
            $('form').on('submit', function(e) {
                AdminTheme.handleFormSubmit(e);
            });

            // Handle button clicks
            $('.btn').on('click', function() {
                AdminTheme.handleButtonClick($(this));
            });

            // Handle keyboard shortcuts
            $(document).on('keydown', function(e) {
                AdminTheme.handleKeyboardShortcuts(e);
            });

            // Handle page visibility changes
            document.addEventListener('visibilitychange', function() {
                AdminTheme.handleVisibilityChange();
            });
        },

        // Handle form submissions
        handleFormSubmit: function(e) {
            const form = $(e.target);
            const submitBtn = form.find('button[type="submit"]');
            
            // Show loading state
            if (submitBtn.length) {
                submitBtn.addClass('loading');
            }
            
            // Example: Prevent default and handle with AJAX
            // e.preventDefault();
            // AdminTheme.submitForm(form);
        },

        // Handle button clicks
        handleButtonClick: function(button) {
            const action = button.data('action');
            
            switch (action) {
                case 'delete':
                    AdminTheme.confirmDelete(button);
                    break;
                case 'export':
                    AdminTheme.exportData(button);
                    break;
                case 'print':
                    AdminTheme.printPage();
                    break;
                default:
                    // Handle other actions
                    break;
            }
        },

        // Handle keyboard shortcuts
        handleKeyboardShortcuts: function(e) {
            // Ctrl/Cmd + K: Focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                $('.header-search input').focus();
            }
            
            // Ctrl/Cmd + B: Toggle sidebar
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                this.toggleSidebar();
            }
            
            // Ctrl/Cmd + D: Toggle theme
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                const currentTheme = this.config.theme;
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
            }
        },

        // Handle page visibility changes
        handleVisibilityChange: function() {
            if (document.hidden) {
                // Page is hidden
                console.log('Page hidden');
            } else {
                // Page is visible
                console.log('Page visible');
            }
        },

        // Utility functions
        utils: {
            // Show notification
            showNotification: function(message, type = 'info') {
                const notification = $(`
                    <div class="notification notification-${type}">
                        <div class="notification-content">
                            <span>${message}</span>
                            <button class="notification-close">&times;</button>
                        </div>
                    </div>
                `);
                
                $('body').append(notification);
                
                // Auto remove after 5 seconds
                setTimeout(function() {
                    notification.fadeOut(function() {
                        $(this).remove();
                    });
                }, 5000);
                
                // Manual close
                notification.find('.notification-close').on('click', function() {
                    notification.fadeOut(function() {
                        $(this).remove();
                    });
                });
            },

            // Confirm action
            confirm: function(message, callback) {
                if (confirm(message)) {
                    callback();
                }
            },

            // Format number
            formatNumber: function(num) {
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },

            // Format currency
            formatCurrency: function(amount, currency = 'USD') {
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: currency
                }).format(amount);
            },

            // Format date
            formatDate: function(date) {
                return new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }).format(new Date(date));
            },

            // Debounce function
            debounce: function(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            },

            // Throttle function
            throttle: function(func, limit) {
                let inThrottle;
                return function() {
                    const args = arguments;
                    const context = this;
                    if (!inThrottle) {
                        func.apply(context, args);
                        inThrottle = true;
                        setTimeout(() => inThrottle = false, limit);
                    }
                };
            }
        }
    };

    // Initialize when DOM is ready
    $(document).ready(function() {
        AdminTheme.init();
    });

    // Make AdminTheme globally available
    window.AdminTheme = AdminTheme;

})(jQuery); 