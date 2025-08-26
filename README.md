# Tafseer Iqra - Quranic Study Application

A modern web application for studying the Quran with comprehensive Tafseer (commentary) and translation features. Built with React, TypeScript, and Supabase for an enhanced Islamic learning experience.

## 📖 About

Tafseer Iqra is designed to provide Muslims and Islamic scholars with easy access to Quranic text, translations, and detailed commentary (Tafseer). The application offers a clean, responsive interface with features like search functionality, dark mode, and RTL (Right-to-Left) text support for Arabic content.

## ✨ Features

- **Complete Quran Access**: Browse all 114 Surahs with Arabic text and translations
- **Tafseer Integration**: Access detailed commentary and explanations for verses
- **Advanced Search**: Search through Surahs and Ayahs with intelligent filtering
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes for comfortable reading
- **RTL Support**: Proper Arabic text rendering with right-to-left layout
- **Modern UI**: Clean interface built with shadcn/ui components
- **Fast Performance**: Built with Vite for optimal loading speeds

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase (Database, Authentication, Storage)
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Package Manager**: npm/pnpm

## 🚀 Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- Supabase account (for backend services)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tafseer-iqra
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_PROJECT_ID="your-project-id"
   VITE_SUPABASE_URL="your-supabase-url"
   VITE_SUPABASE_ANON_KEY="your-anon-key"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
pnpm build
```

### Run Tests

```bash
npm run test
# or
pnpm test
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── integrations/       # Third-party service integrations
│   └── supabase/      # Supabase configuration
├── lib/                # Utility functions
├── pages/              # Application pages/routes
├── services/           # API services and external integrations
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🗄️ Database Schema

The application uses Supabase with the following main tables:

- **surahs**: Surah metadata (name, translation, revelation type, etc.)
- **ayahs**: Individual verses with Arabic text and translations
- **tafseer_sources**: Commentary sources and authors

## 🤝 Contributors

### Main Contributor
- **Nuzli L. Hernawan** - [@foozio](https://github.com/foozio)
  - Project Creator & Lead Developer
  - Full-stack development and architecture

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Quran data provided by [AlQuran Cloud API](https://alquran.cloud/)
- Tafseer content from [Quran Tafseer API](https://api.quran-tafseer.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](../../issues) page for existing problems
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about the issue and steps to reproduce

---

**May Allah (SWT) bless this project and make it beneficial for the Muslim Ummah. Ameen.**
