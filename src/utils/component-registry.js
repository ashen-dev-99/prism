// Prism Theme - Component Registry
// =====================================

class ComponentRegistry {
  constructor() {
    this.components = new Map();
    this.init();
  }

  init() {
    this.registerBuiltInComponents();
    this.autoInitializeComponents();
  }

  // Register a component
  register(name, component) {
    this.components.set(name, component);
    console.log(`Component registered: ${name}`);
  }

  // Get a registered component
  get(name) {
    return this.components.get(name);
  }

  // Check if component is registered
  has(name) {
    return this.components.has(name);
  }

  // Initialize all components with data-component attribute
  autoInitializeComponents() {
    document.addEventListener("DOMContentLoaded", () => {
      const elements = document.querySelectorAll("[data-component]");
      elements.forEach((element) => {
        const componentName = element.getAttribute("data-component");
        this.initializeComponent(componentName, element);
      });
    });
  }

  // Initialize a specific component
  initializeComponent(name, element) {
    const Component = this.get(name);
    if (Component) {
      try {
        new Component(element);
        console.log(`Component initialized: ${name}`);
      } catch (error) {
        console.error(`Failed to initialize component ${name}:`, error);
      }
    } else {
      console.warn(`Component not found: ${name}`);
    }
  }

  // Register built-in components
  registerBuiltInComponents() {
    // Dropdown Component
    // Fixed Dropdown Component - handles SCSS animations properly
    this.register(
      "dropdown",
      class Dropdown {
        constructor(element) {
          console.log("dropdown constructor");
          this.element = element;
          this.toggleButton = element.querySelector(".dropdown-toggle");
          this.menu = element.querySelector(".dropdown-menu");
          this.isOpen = false;

          if (!this.toggleButton || !this.menu) {
            console.error("Dropdown: Required elements not found", {
              toggle: this.toggleButton,
              menu: this.menu,
            });
            return;
          }

          // Initial setup - ensure menu is hidden
          this.menu.style.display = "none";
          this.menu.classList.remove("show");
          this.toggleButton.setAttribute("aria-expanded", "false");

          this.bindEvents();
        }

        bindEvents() {
          console.log("bindEvents");

          // Toggle dropdown on button click
          this.toggleButton.addEventListener("click", (e) => {
            console.log("Toggle button clicked");
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown();
          });

          // Close dropdown when clicking outside
          document.addEventListener("click", (e) => {
            if (!this.element.contains(e.target) && this.isOpen) {
              console.log("Clicking outside dropdown, closing");
              this.close();
            }
          });

          // Close dropdown on Escape key
          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.isOpen) {
              this.close();
            }
          });
        }

        toggleDropdown() {
          console.log("toggleDropdown - current state:", this.isOpen);
          this.isOpen ? this.close() : this.open();
        }

         open() {
           console.log("Opening dropdown");
           this.isOpen = true;

           // Show menu and add show class
           this.menu.style.display = "block";
           this.menu.classList.add("show");
           this.toggleButton.setAttribute("aria-expanded", "true");

           // Add class to dropdown container for additional styling if needed
           this.element.classList.add("dropdown--open");
         }

         close() {
           console.log("Closing dropdown");
           this.isOpen = false;

           // Remove show class and hide menu
           this.menu.classList.remove("show");
           this.menu.style.display = "none";
           this.toggleButton.setAttribute("aria-expanded", "false");
           this.element.classList.remove("dropdown--open");
         }

        // Public methods for external control
        show() {
          if (!this.isOpen) {
            this.open();
          }
        }

        hide() {
          if (this.isOpen) {
            this.close();
          }
        }

        destroy() {
          // Cleanup method for removing event listeners
          this.toggleButton.removeEventListener("click", this.toggleDropdown);
          // Note: document listeners would need to be stored as references to remove properly
        }
      }
    );

    // Modal Component
    this.register(
      "modal",
      class Modal {
        constructor(element) {
          this.element = element;
          this.backdrop = element.querySelector(".modal-backdrop");
          this.content = element.querySelector(".modal-content");
          this.closeButtons = element.querySelectorAll(
            '[data-dismiss="modal"]'
          );
          this.isOpen = false;
          this.bindEvents();
        }

        bindEvents() {
          this.closeButtons.forEach((button) => {
            button.addEventListener("click", () => this.close());
          });

          if (this.backdrop) {
            this.backdrop.addEventListener("click", () => this.close());
          }

          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.isOpen) {
              this.close();
            }
          });
        }

        open() {
          this.isOpen = true;
          this.element.classList.add("modal-show");
          document.body.classList.add("modal-open");
          this.element.style.display = "flex";
        }

        close() {
          this.isOpen = false;
          this.element.classList.remove("modal-show");
          document.body.classList.remove("modal-open");
          setTimeout(() => {
            this.element.style.display = "none";
          }, 300);
        }
      }
    );

    // Tabs Component
    this.register(
      "tabs",
      class Tabs {
        constructor(element) {
          this.element = element;
          this.navLinks = element.querySelectorAll(".tabs-nav-link");
          this.panes = element.querySelectorAll(".tabs-pane");
          this.activeIndex = 0;
          this.bindEvents();
          this.init();
        }

        init() {
          this.showTab(0);
        }

        bindEvents() {
          this.navLinks.forEach((link, index) => {
            link.addEventListener("click", (e) => {
              e.preventDefault();
              this.showTab(index);
            });
          });
        }

        showTab(index) {
          // Remove active classes
          this.navLinks.forEach((link) => link.classList.remove("active"));
          this.panes.forEach((pane) => pane.classList.remove("active"));

          // Add active classes
          this.navLinks[index].classList.add("active");
          this.panes[index].classList.add("active");

          this.activeIndex = index;
        }
      }
    );

    // Sidebar Component
    this.register(
      "sidebar",
      class Sidebar {
        constructor(element) {
          this.element = element;
          this.toggle = document.querySelector("[data-sidebar-toggle]");
          this.overlay = document.querySelector(".sidebar-overlay");
          this.isCollapsed =
            localStorage.getItem("sidebar-collapsed") === "true";
          this.bindEvents();
          this.init();
        }

        init() {
          if (this.isCollapsed) {
            this.collapse();
          }
        }

        bindEvents() {
          if (this.toggle) {
            this.toggle.addEventListener("click", () => this.toggleCollapse());
          }

          if (this.overlay) {
            this.overlay.addEventListener("click", () => this.close());
          }

          // Handle responsive behavior
          window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
              this.element.classList.remove("show");
              if (this.overlay) {
                this.overlay.classList.remove("show");
              }
            }
          });
        }

        toggleCollapse() {
          this.isCollapsed ? this.expand() : this.collapse();
        }

        collapse() {
          this.isCollapsed = true;
          this.element.classList.add("sidebar--collapsed");
          document
            .querySelector(".main-content")
            ?.classList.add("main-content--collapsed");
          document.querySelector(".footer")?.classList.add("footer--collapsed");
          localStorage.setItem("sidebar-collapsed", "true");
        }

        expand() {
          this.isCollapsed = false;
          this.element.classList.remove("sidebar--collapsed");
          document
            .querySelector(".main-content")
            ?.classList.remove("main-content--collapsed");
          document
            .querySelector(".footer")
            ?.classList.remove("footer--collapsed");
          localStorage.setItem("sidebar-collapsed", "false");
        }

        open() {
          this.element.classList.add("show");
          if (this.overlay) {
            this.overlay.classList.add("show");
          }
        }

        close() {
          this.element.classList.remove("show");
          if (this.overlay) {
            this.overlay.classList.remove("show");
          }
        }
      }
    );

    // Toast Component
    this.register(
      "toast",
      class Toast {
        constructor(element) {
          this.element = element;
          this.closeButton = element.querySelector(".toast-close");
          this.autoHide = element.getAttribute("data-autohide") !== "false";
          this.delay = parseInt(element.getAttribute("data-delay")) || 5000;
          this.bindEvents();
        }

        bindEvents() {
          if (this.closeButton) {
            this.closeButton.addEventListener("click", () => this.hide());
          }

          if (this.autoHide) {
            setTimeout(() => this.hide(), this.delay);
          }
        }

        show() {
          this.element.classList.add("toast-show");
        }

        hide() {
          this.element.classList.add("toast-exit-active");
          setTimeout(() => {
            this.element.remove();
          }, 300);
        }
      }
    );
  }

  // Utility method to create and show a toast
  static showToast(message, type = "info", options = {}) {
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <div class="toast-header">
        <strong class="toast-title">${options.title || "Notification"}</strong>
        <button type="button" class="toast-close" aria-label="Close">&times;</button>
      </div>
      <div class="toast-body">${message}</div>
    `;

    const container =
      document.querySelector(".toast-container") || document.body;
    container.appendChild(toast);

    const toastInstance = new (ComponentRegistry.prototype.get("toast"))(toast);
    toastInstance.show();

    return toastInstance;
  }

  // Utility method to open a modal
  static openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      const modalInstance = new (ComponentRegistry.prototype.get("modal"))(
        modal
      );
      modalInstance.open();
      return modalInstance;
    }
  }
}

export default ComponentRegistry;
