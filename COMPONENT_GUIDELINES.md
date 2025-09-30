# 🏗️ Prism Theme - Component Development Guidelines

## 📋 **Component Architecture Principles**

### **🎯 Single Responsibility Principle**
Each component should have **one clear purpose** and do it well. Components should not handle responsibilities that belong to other components.

### **🔧 Component Categories**

#### **1. Layout Components** (`src/styles/layout/`)
**Purpose:** Structure, positioning, and responsive behavior
**Responsibilities:**
- ✅ Define layout structure and positioning
- ✅ Handle responsive breakpoints and behavior
- ✅ Manage z-index and stacking context
- ✅ Define spacing and alignment
- ❌ **DO NOT** implement specific UI functionality
- ❌ **DO NOT** handle component-specific styling

**Examples:** `_header.scss`, `_sidebar.scss`, `_main-content.scss`, `_footer.scss`

#### **2. UI Components** (`src/styles/components/`)
**Purpose:** Specific functionality and styling
**Responsibilities:**
- ✅ Handle their specific functionality
- ✅ Define their own styling variants
- ✅ Manage their own states (hover, active, disabled, etc.)
- ✅ Handle their own animations and transitions
- ❌ **DO NOT** handle layout positioning (except relative to their container)
- ❌ **DO NOT** depend on specific layout components

**Examples:** `_buttons.scss`, `_dropdowns.scss`, `_modals.scss`, `_search.scss`, `_notifications.scss`

#### **3. Utility Components** (`src/styles/utilities/`)
**Purpose:** Reusable patterns and cross-cutting concerns
**Responsibilities:**
- ✅ Provide reusable patterns
- ✅ Handle cross-cutting concerns
- ✅ Be framework-agnostic
- ✅ Provide helper classes and mixins
- ❌ **DO NOT** be tied to specific layouts or components

**Examples:** `_spacing.scss`, `_typography.scss`, `_colors.scss`, `_animations.scss`

## 📝 **Component Development Rules**

### **1. Naming Conventions**

#### **Component Files:**
```scss
// ✅ Good
_buttons.scss
_search.scss
_user-menu.scss

// ❌ Bad
_button.scss (singular)
search.scss (no underscore)
userMenu.scss (camelCase)
```

#### **CSS Classes:**
```scss
// ✅ Good - BEM methodology
.component-name { }
.component-name--variant { }
.component-name__element { }
.component-name__element--modifier { }

// Examples:
.search-input { }
.search-input--sm { }
.search-results { }
.search-results__item { }
.search-results__item--highlighted { }
```

### **2. File Structure**

```scss
// Prism Theme - Component Name
// =====================================

// 1. Base component styles
.component-name {
  // Base styles
}

// 2. Component elements
.component-name {
  &__element {
    // Element styles
  }
}

// 3. Component variants
.component-name {
  &--variant {
    // Variant styles
  }
}

// 4. Component states
.component-name {
  &--state {
    // State styles
  }
}

// 5. Responsive behavior
@include respond-below(md) {
  .component-name {
    // Mobile styles
  }
}

// 6. Dark mode support
[data-theme="dark"] {
  .component-name {
    // Dark mode styles
  }
}
```

### **3. Dependencies**

#### **✅ Allowed Dependencies:**
- Abstracts: `variables`, `mixins`, `functions`, `placeholders`
- Other UI components (for composition)
- Utility components

#### **❌ Forbidden Dependencies:**
- Layout components from UI components
- Specific page styles
- External libraries (use abstracts instead)

### **4. State Management**

```scss
// ✅ Good - Use data attributes for states
.component-name {
  &[data-state="loading"] { }
  &[data-state="error"] { }
  &[data-state="success"] { }
}

// ✅ Good - Use ARIA attributes for accessibility
.component-name {
  &[aria-expanded="true"] { }
  &[aria-selected="true"] { }
}

// ❌ Bad - Don't use generic classes for states
.component-name {
  &.loading { }
  &.error { }
}
```

### **5. Responsive Design**

```scss
// ✅ Good - Use mixins for responsive behavior
.component-name {
  @include respond-below(md) {
    // Mobile styles
  }
  
  @include respond-to(lg) {
    // Desktop styles
  }
}

// ❌ Bad - Don't hardcode breakpoints
.component-name {
  @media (max-width: 768px) {
    // Mobile styles
  }
}
```

### **6. Dark Mode Support**

```scss
// ✅ Good - Use CSS custom properties
.component-name {
  background-color: $bg-primary;
  color: $text-primary;
}

[data-theme="dark"] {
  .component-name {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }
}

// ❌ Bad - Don't duplicate styles
.component-name {
  background-color: $bg-primary;
  
  .dark & {
    background-color: $gray-900;
  }
}
```

## 🧪 **Component Testing Checklist**

### **Before Creating a Component:**
- [ ] Is this functionality already handled by another component?
- [ ] Can this be composed from existing components?
- [ ] Is this a layout concern or a UI concern?

### **During Development:**
- [ ] Does the component have a single responsibility?
- [ ] Are all states handled (hover, active, disabled, loading, error)?
- [ ] Is the component accessible (ARIA attributes, keyboard navigation)?
- [ ] Does it work in both light and dark modes?
- [ ] Is it responsive across all breakpoints?
- [ ] Are there any linting errors?

### **Before Committing:**
- [ ] Component follows naming conventions
- [ ] No hardcoded values (use variables)
- [ ] No layout-specific positioning
- [ ] Proper documentation and comments
- [ ] All variants and states tested
- [ ] Build passes without errors

## 📚 **Component Examples**

### **✅ Good Component (Search)**
```scss
// Single responsibility: Search functionality
.search-input {
  // Only search input styling
}

.search-results {
  // Only search results styling
}

.search-modal {
  // Only search modal styling
}
```

### **❌ Bad Component (Header with Search)**
```scss
// Multiple responsibilities: Layout + Search + Notifications + User Menu
.header {
  // Layout concerns
  position: fixed;
  top: 0;
  
  // Search functionality (should be separate)
  .search-input { }
  
  // Notifications (should be separate)
  .notifications { }
  
  // User menu (should be separate)
  .user-menu { }
}
```

## 🚀 **Future Component Development**

### **When to Create a New Component:**
1. **New functionality** that doesn't exist
2. **Reusable pattern** used in multiple places
3. **Complex behavior** that deserves its own file
4. **Clear boundaries** with other components

### **When NOT to Create a New Component:**
1. **One-off styling** that won't be reused
2. **Layout concerns** (belongs in layout components)
3. **Simple variations** of existing components
4. **Page-specific** functionality

### **Component Composition:**
```scss
// ✅ Good - Compose components
.header {
  .search-container { } // Uses search component
  .notification-toggle { } // Uses notifications component
  .user-toggle { } // Uses user-menu component
}
```

## 📖 **Documentation Requirements**

Each component should include:
1. **Purpose** - What the component does
2. **Usage** - How to use it
3. **Variants** - Available variants and modifiers
4. **States** - Available states and how to trigger them
5. **Accessibility** - ARIA attributes and keyboard navigation
6. **Examples** - Code examples for common use cases

---

## 🎯 **Remember: "A component should do one thing and do it well"**

This approach ensures:
- **🔧 Maintainability** - Easy to find and modify specific functionality
- **🔄 Reusability** - Components can be used anywhere
- **🧪 Testability** - Easy to test individual components
- **📦 Modularity** - Components can be developed independently
- **🚀 Scalability** - Easy to add new components without conflicts
