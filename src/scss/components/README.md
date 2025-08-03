# Components Directory Structure

This directory contains all UI components organized by category for better maintainability and scalability.

## 📁 Directory Structure

```
components/
├── _index.scss                 # Main component index (imports all categories)
├── core/                       # Core UI components (always included)
│   ├── _buttons.scss          # Button styles and variants
│   ├── _forms.scss            # Form input styles
│   ├── _cards.scss            # Card component styles
│   ├── _tables.scss           # Table styles
│   └── _alerts.scss           # Alert and notification styles
├── navigation/                 # Navigation components
│   ├── _navigation.scss       # Main navigation
│   ├── _breadcrumbs.scss      # Breadcrumb navigation
│   ├── _tabs.scss             # Tab interfaces
│   ├── _menus.scss            # Menu components
│   ├── _dropdown.scss         # Dropdown menus
│   └── _accordion.scss        # Accordion components
├── feedback/                   # Feedback and status components
│   ├── _badges.scss           # Badge and label styles
│   ├── _progress.scss         # Progress indicators
│   ├── _tooltips.scss         # Tooltip components
│   ├── _notifications.scss    # Toast notifications
│   └── _ratings.scss          # Rating components
├── data/                       # Data display components
│   ├── _data-tables.scss      # Advanced data tables
│   ├── _tree.scss             # Tree view components
│   ├── _list.scss             # List components
│   ├── _charts.scss           # Chart components
│   ├── _calendar.scss         # Calendar components
│   └── _kanban.scss           # Kanban board components
├── media/                      # Media and content components
│   ├── _avatars.scss          # Avatar components
│   ├── _chips.scss            # Chip/tag components
│   ├── _media.scss            # Media object components
│   ├── _dividers.scss         # Divider components
│   ├── _galleries.scss        # Image gallery components
│   └── _image-viewer.scss     # Image viewer components
├── interactive/                # Interactive components
│   ├── _modals.scss           # Modal dialog components
│   ├── _popovers.scss         # Popover components
│   ├── _carousels.scss        # Carousel/slider components
│   ├── _sliders.scss          # Range slider components
│   ├── _color-picker.scss     # Color picker components
│   └── _file-upload.scss      # File upload components
├── forms/                      # Advanced form components
│   ├── _filters.scss          # Filter components
│   ├── _search.scss           # Search components
│   ├── _wizards.scss          # Wizard form components
│   └── _steppers.scss         # Stepper components
├── editors/                    # Editor components
│   ├── _code-editor.scss      # Code editor components
│   ├── _markdown-editor.scss  # Markdown editor components
│   └── _rich-text-editor.scss # Rich text editor components
└── visualization/              # Visualization components
    ├── _maps.scss             # Map components
    └── _timeline.scss         # Timeline components
```

## 🎯 Component Categories

### Core Components
Essential UI components that are always included in the build:
- **Buttons**: Primary, secondary, outline, and icon buttons
- **Forms**: Input fields, textareas, selects, and form layouts
- **Cards**: Content containers with headers, bodies, and footers
- **Tables**: Data tables with sorting, filtering, and pagination
- **Alerts**: Success, warning, error, and info messages

### Navigation Components
Components for site navigation and structure:
- **Navigation**: Main navigation menus and bars
- **Breadcrumbs**: Hierarchical navigation paths
- **Tabs**: Horizontal and vertical tab interfaces
- **Menus**: Dropdown and context menus
- **Dropdown**: Dropdown menus and selectors
- **Accordion**: Collapsible content sections

### Feedback Components
Components for user feedback and status:
- **Badges**: Status indicators and labels
- **Progress**: Progress bars, spinners, and loaders
- **Tooltips**: Contextual help and information
- **Notifications**: Toast messages and alerts
- **Ratings**: Star ratings and review systems

### Data Components
Components for displaying and managing data:
- **Data Tables**: Advanced tables with features
- **Tree**: Hierarchical data display
- **List**: Various list types and layouts
- **Charts**: Data visualization components
- **Calendar**: Date pickers and calendar views
- **Kanban**: Drag-and-drop task boards

### Media Components
Components for media and content display:
- **Avatars**: User profile images and initials
- **Chips**: Interactive tags and labels
- **Media**: Media objects and content layouts
- **Dividers**: Visual separators and dividers
- **Galleries**: Image galleries with lightbox
- **Image Viewer**: Advanced image viewing with zoom

### Interactive Components
Components for user interaction:
- **Modals**: Dialog boxes and overlays
- **Popovers**: Contextual information panels
- **Carousels**: Image and content sliders
- **Sliders**: Range sliders and controls
- **Color Picker**: Color selection tools
- **File Upload**: Drag-and-drop file upload

### Form Components
Advanced form and input components:
- **Filters**: Advanced filtering interfaces
- **Search**: Search with autocomplete
- **Wizards**: Multi-step form wizards
- **Steppers**: Progress indicators for forms

### Editor Components
Rich text and code editing:
- **Code Editor**: Syntax highlighting and features
- **Markdown Editor**: Markdown editing with preview
- **Rich Text Editor**: WYSIWYG text editor

### Visualization Components
Data visualization and mapping:
- **Maps**: Interactive maps with markers
- **Timeline**: Activity and event timelines

## 🔧 Usage

### Importing All Components
```scss
@import 'components/index';
```

### Importing Specific Categories
```scss
// Import only core components
@import 'components/core/buttons';
@import 'components/core/forms';

// Import only navigation components
@import 'components/navigation/navigation';
@import 'components/navigation/tabs';
```

### Build Configuration
The `_index.scss` file allows for selective imports based on build configuration:

```scss
// In _build.scss
@if $include-navigation {
  @import 'components/navigation/navigation';
  @import 'components/navigation/breadcrumbs';
  // ... more navigation components
}

@if $include-feedback {
  @import 'components/feedback/badges';
  @import 'components/feedback/progress';
  // ... more feedback components
}
```

## 📋 Adding New Components

1. **Choose the appropriate category** for your component
2. **Create the component file** in the correct folder
3. **Follow the naming convention**: `_component-name.scss`
4. **Update the index file** to include your component
5. **Follow BEM methodology** for class naming
6. **Include responsive design** and accessibility features

### Example: Adding a new navigation component

```scss
// File: components/navigation/_pagination.scss
.pagination {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  
  &__item {
    // Pagination item styles
  }
  
  &__link {
    // Pagination link styles
  }
}
```

Then update `_index.scss`:
```scss
// Navigation & Layout Components
// =============================================================================
@import 'navigation/navigation';
@import 'navigation/breadcrumbs';
@import 'navigation/tabs';
@import 'navigation/menus';
@import 'navigation/dropdown';
@import 'navigation/accordion';
@import 'navigation/pagination'; // Add this line
```

## 🎨 Best Practices

- **Consistent naming**: Use BEM methodology for all components
- **Responsive design**: Include mobile-first responsive styles
- **Accessibility**: Add proper ARIA attributes and keyboard navigation
- **Performance**: Optimize for performance with proper CSS containment
- **Documentation**: Include comprehensive comments for complex components
- **Testing**: Test across different browsers and devices

## 📚 Related Files

- `src/scss/style.scss` - Main stylesheet that imports all components
- `src/scss/_build.scss` - Build configuration for selective imports
- `src/scss/utils/` - Utilities and helpers used by components
- `src/scss/themes/` - Theme definitions for components 