# Prism

A modern, responsive admin dashboard theme built with HTML, SCSS, and JavaScript.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive layout
- 🌙 Light/Dark theme support
- 🧩 Modular SCSS architecture
- ⚡ Fast and lightweight
- 🔧 Easy to customize

## Project Structure

```
prism/
├── public/                     # Final compiled assets
├── src/                        # Source files
│   ├── html/                   # HTML partials and pages
│   ├── scss/                   # Sass stylesheets
│   ├── js/                     # JavaScript files
│   ├── fonts/                  # Local fonts
│   └── images/                 # Source images
├── build/                      # Build scripts
└── dist/                       # Production build
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/harshad1507/prism.git
cd prism
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. For SCSS compilation:
```bash
npm run sass
```

## Build Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run sass` - Watch SCSS files for changes
- `npm run sass:build` - Build SCSS to CSS (compressed)

## Customization

### Colors and Variables

Edit `src/scss/utils/_variables.scss` to customize:
- Color palette
- Typography
- Spacing
- Breakpoints

### Themes

Themes are located in `src/scss/themes/`:
- `_light.scss` - Light theme variables
- `_dark.scss` - Dark theme variables

### Components

Components are modular and located in `src/scss/components/`:
- Buttons
- Cards
- Forms
- Tables
- Alerts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 