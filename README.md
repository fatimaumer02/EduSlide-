# EduSlide AI

Transform your learning materials into professional PowerPoint presentations with the power of AI.

## 🚀 Overview

EduSlide AI is an AI-powered platform designed to help educators save time by automatically converting PDFs, eBooks, or topics into beautiful, well-structured PowerPoint presentations. Built with Next.js 16 and React 19, it features a modern, professional UI with a clean design system.

## ✨ Features

### Current Implementation

- **🎨 Professional UI/UX**
  - Clean, modern design with indigo color scheme
  - Responsive layout for all devices
  - Smooth transitions and hover effects
  - Professional typography and spacing

- **📄 Multiple Input Methods**
  - Upload PDF, DOCX, or EPUB files
  - Drag-and-drop file upload
  - Enter topics directly without files
  - File validation and preview

- **🤖 AI-Powered Generation** (Demo Mode)
  - Automatic slide generation
  - Content organization and structuring
  - Professional slide layouts
  - Preview before download

- **👀 Slide Preview**
  - Interactive slide navigation
  - Thumbnail view of all slides
  - Full-screen slide display
  - Download to PowerPoint

- **📱 Complete Website**
  - Landing page with features and testimonials
  - About page with mission and values
  - Contact page with form and FAQ
  - Responsive navigation with active states

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.6 (with Turbopack)
- **React:** 19.2.3
- **Styling:** Tailwind CSS 4.1.18
- **Icons:** Lucide React 0.563.0
- **Build Tool:** Turbopack (Next.js built-in)
- **Linting:** ESLint 9 with Next.js config

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eduslide-
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
eduslide-/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.jsx          # About page
│   │   ├── contact/
│   │   │   └── page.jsx          # Contact page
│   │   ├── preview/
│   │   │   └── page.jsx          # Slide preview page
│   │   ├── upload/
│   │   │   └── page.jsx          # File upload page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.jsx            # Root layout
│   │   └── page.jsx              # Landing page
│   ├── components/
│   │   ├── FileUpload.jsx        # File upload component
│   │   ├── Loader.jsx            # Loading spinner
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── SlideCard.jsx         # Slide display card
│   │   └── TopicInput.jsx        # Topic input field
│   └── lib/
│       └── api.js                # API utility functions
├── public/                       # Static assets
├── .next/                        # Next.js build output
├── node_modules/                 # Dependencies
├── eslint.config.mjs            # ESLint configuration
├── jsconfig.json                # JavaScript config
├── next.config.mjs              # Next.js configuration
├── package.json                 # Project dependencies
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS config
└── README.md                    # This file
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Pages

### Landing Page (`/`)
- Hero section with CTA
- Feature highlights
- Statistics showcase
- How it works section
- Testimonials
- Footer with links

### Upload Page (`/upload`)
- File upload with drag-and-drop
- Topic input field
- File format validation
- Generate slides button

### Preview Page (`/preview`)
- Slide navigation controls
- Full slide display
- Thumbnail grid
- Download button

### About Page (`/about`)
- Mission statement
- Company values
- Statistics
- Team story

### Contact Page (`/contact`)
- Contact form
- Contact information
- FAQ section

## 🎨 Design System

### Colors
- **Primary:** Indigo-600 (#4F46E5)
- **Background:** Gradient from slate-50 to indigo-50
- **Text:** Slate-800 (headings), Slate-600 (body)
- **Borders:** Slate-200/300
- **Accents:** Green, Amber, Blue for icons

### Typography
- **Headings:** Bold, Slate-800
- **Body:** Medium weight, Slate-600
- **Font:** System font stack (Arial, Helvetica, sans-serif)

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS 4 with custom configuration in `tailwind.config.js`. Content paths are configured to scan all JSX/TSX files in `src/app` and `src/components`.

### Next.js
- React Compiler enabled for better performance
- Turbopack for faster builds
- App Router architecture

## 🚧 Future Enhancements

- [ ] Backend API integration for real AI processing
- [ ] User authentication and accounts
- [ ] Save and manage presentations
- [ ] Custom template selection
- [ ] Advanced editing capabilities
- [ ] Collaboration features
- [ ] Analytics dashboard
- [ ] Payment integration
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, email support@eduslide.ai or visit our contact page.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Note:** This is currently a demo/prototype version. The AI generation functionality is simulated for demonstration purposes. Backend integration is required for full production deployment.
