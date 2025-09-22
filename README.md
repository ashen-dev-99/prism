# Prism Theme

A modern, responsive admin theme built with SCSS and component-based architecture. Prism Theme provides a comprehensive set of UI components, layouts, and utilities for building beautiful admin dashboards and web applications.

## 🚀 Features

- **Modern Design**: Clean, minimalist design with attention to detail
- **Responsive Layout**: Mobile-first approach with responsive grid system
- **Dark/Light Themes**: Built-in theme switching with system preference detection
- **Component Library**: Comprehensive set of reusable UI components
- **SCSS Architecture**: Well-organized, maintainable stylesheet structure
- **JavaScript Components**: Interactive components with vanilla JavaScript
- **Accessibility**: WCAG compliant with proper ARIA attributes
- **Cross-browser Support**: Works on all modern browsers

## 📦 What's Included

```
prism-theme/
├── src/
│   ├── index.js                 # Main entry point
│   ├── styles/
│   │   ├── main.scss           # Main stylesheet
│   │   ├── abstracts/          # Variables, mixins, functions
│   │   ├── base/               # Base styles, typography, utilities
│   │   ├── components/         # UI components
│   │   ├── layout/             # Layout components (header, sidebar, etc.)
│   │   ├── pages/              # Page-specific styles
│   │   ├── themes/             # Light and dark theme variants
│   │   └── vendors/            # Third-party styles
│   └── utils/
│       ├── theme-manager.js    # Theme switching functionality
│       └── component-registry.js # Component initialization
├── dist/                       # Built files
├── example.html               # Example implementation
├── package.json
├── vite.config.js
└── README.md
```

## 🛠 Installation

### NPM Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Watch Mode

```bash
npm run build:watch
```

## 🎨 Components

### Buttons
- Primary, secondary, outline, ghost variants
- Small, normal, large sizes
- Loading states and icon buttons
- Button groups

### Forms
- Input fields, textareas, selects
- Checkboxes, radio buttons, switches
- Form validation states
- Input groups and file uploads

### Cards
- Basic cards with header, body, footer
- Stat cards, profile cards
- Elevated, outlined, flat variants
- Loading and hover states

### Navigation
- Sidebar navigation with collapsible sections
- Breadcrumbs and pagination
- Tabs (horizontal, vertical, pills)
- Stepper components

### Data Display
- Tables with sorting, filtering, pagination
- Progress bars and circular progress
- Badges and status indicators
- Alert messages and toasts

### Layout
- Responsive grid system
- Header with search and user menu
- Collapsible sidebar
- Main content area with sections

### Overlays
- Modal dialogs
- Dropdown menus
- Tooltips and popovers
- Loading overlays

## 🎯 Usage

### Basic Setup

1. Include the CSS file in your HTML:
```html
<link rel="stylesheet" href="dist/prism-theme.css">
```

2. Include the JavaScript file:
```html
<script type="module" src="dist/prism-theme.js"></script>
```

3. Add the basic HTML structure:
```html
<body>
  <header class="header">
    <!-- Header content -->
  </header>
  
  <aside class="sidebar">
    <!-- Sidebar navigation -->
  </aside>
  
  <main class="main-content">
    <!-- Main content -->
  </main>
  
  <footer class="footer">
    <!-- Footer content -->
  </footer>
</body>
```

### Theme Switching

```html
<!-- Theme toggle button -->
<button data-theme-toggle>
  <i class="fas fa-moon"></i>
</button>

<!-- Theme select dropdown -->
<select data-theme-select>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
</select>
```

### Component Initialization

Components are automatically initialized when you add the `data-component` attribute:

```html
<!-- Dropdown -->
<div class="dropdown" data-component="dropdown">
  <button class="dropdown-toggle">Menu</button>
  <div class="dropdown-menu">
    <!-- Menu items -->
  </div>
</div>

<!-- Modal -->
<div class="modal" data-component="modal">
  <!-- Modal content -->
</div>

<!-- Tabs -->
<div class="tabs" data-component="tabs">
  <!-- Tab navigation and content -->
</div>
```

### JavaScript API

```javascript
import { ThemeManager, ComponentRegistry } from './dist/prism-theme.js';

// Theme management
const themeManager = new ThemeManager();
themeManager.setTheme('dark');
console.log(themeManager.getCurrentTheme()); // 'dark'

// Show toast notification
ComponentRegistry.showToast('Success!', 'success', {
  title: 'Operation Complete'
});

// Open modal
ComponentRegistry.openModal('myModal');
```

## 🎨 Customization

### SCSS Variables

Customize the theme by modifying variables in `src/styles/abstracts/_variables.scss`:

```scss
// Colors
$primary-color: #6366f1;
$secondary-color: #64748b;
$success-color: #10b981;
$warning-color: #f59e0b;
$error-color: #ef4444;

// Typography
$font-family-primary: 'Inter', sans-serif;
$font-size-base: 1rem;

// Spacing
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;

// Breakpoints
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
```

### Custom Components

Create custom components by extending the base styles:

```scss
.my-custom-component {
  @extend %card-base;
  
  // Custom styles here
  background: linear-gradient(135deg, $primary-color, $primary-light);
  color: $white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-lg;
  }
}
```

## 🌙 Dark Mode

Dark mode is automatically supported and can be controlled in several ways:

1. **Manual Toggle**: Use `data-theme-toggle` attribute
2. **System Preference**: Automatically detects user's system preference
3. **Persistent**: Theme choice is saved in localStorage
4. **JavaScript API**: Programmatically control themes

## 📱 Responsive Design

The theme uses a mobile-first approach with the following breakpoints:

- **xs**: 480px and up
- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support

## 🔧 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Documentation

For detailed documentation and examples, visit our [documentation site](https://prism-theme.dev) or check out the `example.html` file for a complete implementation.

## 🙏 Acknowledgments

- [Inter Font](https://fonts.google.com/specimen/Inter) for typography
- [Font Awesome](https://fontawesome.com/) for icons
- [Vite](https://vitejs.dev/) for build tooling
- The design system community for inspiration

---

Made with ❤️ by the Prism Theme team
