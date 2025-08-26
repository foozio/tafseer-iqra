# 🕌 Tafseer Iqra - Quranic Study Platform

> *"Read! In the name of your Lord who created"* - Quran 96:1

A modern, beautiful web application for reading, understanding, and exploring the Holy Quran with authentic Tafseer (interpretations). Built with React, TypeScript, and Islamic design principles.

## ✨ Features

### 🏠 **Homepage**
- Beautiful Islamic-themed hero section with Arabic calligraphy
- Featured Surahs showcase with elegant card designs
- Intelligent search functionality across all Quranic content
- Quick statistics and navigation
- Dark/Light mode toggle

### 📖 **Surah Exploration**
- Complete listing of all 114 Surahs
- Real-time search and filtering capabilities
- Revelation type indicators (Meccan/Medinan)
- Responsive card-based layout
- Individual Surah pages with verses and Tafseer

### 🔍 **Smart Search**
- Search across Arabic text, translations, and interpretations
- Multi-criteria filtering options
- Contextual results with verse references
- Debounced search for optimal performance

### 🎨 **Islamic Design**
- Authentic Islamic color palette with green gradients
- Geometric patterns and traditional motifs
- Arabic typography with proper RTL support
- Responsive design for all devices
- Accessibility-first approach

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tafseer-iqra

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
tafseer-iqra/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ui/             # Shadcn/ui components
│   ├── pages/              # Route components
│   │   ├── Index.tsx       # Homepage
│   │   ├── Surah.tsx       # Surah listing
│   │   ├── SurahDetail.tsx # Individual surah (to be implemented)
│   │   ├── SearchResults.tsx # Search results (to be implemented)
│   │   └── NotFound.tsx    # 404 error page
│   ├── services/           # API integration
│   │   └── quranApi.ts     # Quran API functions
│   ├── types/              # TypeScript definitions
│   │   └── quran.ts        # Quran-related types
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── integrations/       # External service integrations
├── public/                 # Static assets
├── .trae/
│   └── documents/          # Project documentation
└── package.json
```

## 🔧 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality UI components
- **React Router** - Client-side routing
- **React Query** - Server state management

### APIs
- **AlQuran.cloud API** - Quranic text and translations
- **Quran Tafseer API** - Detailed interpretations

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Prettier** - Code formatting (recommended)
- **Vitest** - Unit testing framework

## 📚 Documentation

Comprehensive documentation is available in the `.trae/documents/` directory:

- **[Product Requirements Document](/.trae/documents/product-requirements-document.md)** - Detailed feature specifications and UI/UX guidelines
- **[Technical Architecture Document](/.trae/documents/technical-architecture-document.md)** - System architecture, data models, and technical decisions
- **[Implementation Guide](/.trae/documents/implementation-guide.md)** - Step-by-step guide for fixing issues and implementing new features
- **[API Documentation](/.trae/documents/api-documentation.md)** - Complete API reference with examples

## 🐛 Known Issues & Roadmap

### Critical Issues (Priority 1)
- [ ] **404 Errors**: Individual surah pages (`/surah/{id}`) not implemented
- [ ] **Search Functionality**: Search results page (`/search`) missing
- [ ] **Incomplete Data**: Only 10 out of 114 surahs in the data array

### UI/UX Improvements (Priority 2)
- [ ] **Loading States**: Add skeleton loaders for better UX
- [ ] **Error Handling**: Implement comprehensive error boundaries
- [ ] **Accessibility**: Enhance keyboard navigation and screen reader support
- [ ] **Performance**: Implement lazy loading and code splitting

### Enhanced Features (Priority 3)
- [ ] **Bookmarking System**: Save favorite verses and interpretations
- [ ] **Reading Progress**: Track reading progress across surahs
- [ ] **Audio Integration**: Add Quran recitation playback
- [ ] **Multiple Translations**: Support for various translation editions
- [ ] **Offline Support**: Service worker for offline reading

### Technical Improvements (Priority 4)
- [ ] **Testing**: Comprehensive unit and integration tests
- [ ] **SEO**: Meta tags and structured data
- [ ] **PWA**: Progressive Web App capabilities
- [ ] **Analytics**: Usage tracking and performance monitoring

## 🤝 Contributing

We welcome contributions from the Muslim developer community! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Read the [Implementation Guide](/.trae/documents/implementation-guide.md)
4. Make your changes following the coding standards
5. Add tests for new functionality
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Development Guidelines
- Follow Islamic principles in design and content
- Ensure accessibility for all users
- Write clean, documented code
- Add tests for new features
- Respect the existing code style

### Priority Contributions Needed
1. **Complete Surah Data** - Add all 114 surahs to the data array
2. **Individual Surah Pages** - Implement detailed surah viewing
3. **Search Functionality** - Build comprehensive search features
4. **UI/UX Improvements** - Enhance the user experience
5. **Testing** - Add comprehensive test coverage

## 🔒 Security

- All external APIs are public and don't require authentication
- Input validation is implemented for search queries
- No sensitive data is stored or transmitted
- HTTPS is used for all API calls (except Tafseer API - see known issues)

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🌍 Internationalization

Currently supports:
- **Arabic** - Original Quranic text with proper RTL layout
- **English** - Interface and translations

Planned support:
- Urdu, Indonesian, Turkish, French, and other major languages

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤲 Acknowledgments

- **Allah (SWT)** - For the guidance of the Holy Quran
- **AlQuran.cloud** - For providing free Quranic API
- **Quran Tafseer API** - For Tafseer interpretations
- **Islamic scholars** - For their invaluable interpretations and translations
- **Open source community** - For the amazing tools and libraries

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Implementation Guide](/.trae/documents/implementation-guide.md)
2. Search existing GitHub issues
3. Create a new issue with detailed information
4. Join our community discussions

---

**May Allah (SWT) accept this effort and make it beneficial for the Ummah. Ameen.**

*"And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose."* - Quran 65:3