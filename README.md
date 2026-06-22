# 🏋️ AKYBS Fitness Center Management System — Enterprise Edition

> **Modern 2026 SaaS Design System** with premium UI/UX inspired by Stripe, Notion, Linear, and Vercel

[![Release](https://img.shields.io/github/v/release/zafarazlay/akybs-fitness-center-enterprise?style=flat-square)](https://github.com/zafarazlay/akybs-fitness-center-enterprise/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-18.3-blue?style=flat-square)](https://react.dev)

Commercial-grade Gym & Indoor Games Management Platform with **premium admin and member dashboards**, modern design system, and enterprise-grade features.

## ✨ Features

### 🎨 Modern Design System (v2.0.0)
- **10+ Reusable Components** with TypeScript & CVA
- **Complete Color System**: Primary, Secondary, Success, Warning, Error (7-10 shades each)
- **Typography Scale**: 10 sizes with 9 weight options
- **Dark Mode Support**: Auto-detection + manual toggle
- **WCAG Level AA Accessibility**: Fully compliant
- **Framer Motion Animations**: Smooth interactions throughout
- **Mobile-First Responsive**: Works on all devices

### 📊 Admin Dashboard
- **4 KPI Cards**: Members, Active Members, Monthly Revenue, Outstanding Dues
- **3 Data Charts**: Revenue trend (line), Payment status (pie), Membership growth (bar)
- **Quick Actions**: Add Member, Record Payment, Send Announcement
- **Recent Activities Table**: Search, filter, sort, export, bulk actions
- **Key Metrics**: Conversion rate, collection rate with progress bars

### 👤 Member Dashboard
- **Personalized Welcome**: Dynamic greeting with animated emoji
- **Membership Status**: Current plan, renewal date, outstanding balance
- **Payment History**: Complete transaction records with export
- **Announcements**: Latest gym updates and notifications
- **Support Section**: Direct contact options

### 🔐 Authentication UI
- Modern login page with animated backgrounds
- User type selector (Admin/Member)
- Demo credentials for testing
- Password visibility toggle
- Remember me & forgot password options

## 🛠 Tech Stack

### Frontend
- **React 18.3** — UI framework with Hooks
- **TypeScript 5.6** — Type-safe development
- **Vite 5.4** — Lightning-fast build tool
- **Tailwind CSS 3.4** — Utility-first styling (100+ custom configurations)
- **Framer Motion 11** — Smooth animations & interactions
- **Recharts 2.12** — Data visualization (line, area, bar, pie charts)
- **React Router 6.26** — Client-side routing
- **React Query 5.59** — Server state management
- **React Hook Form 7.53** + **Zod 3.23** — Form handling & validation
- **Class Variance Authority (CVA)** — Type-safe component variants
- **Lucide React 0.468** — 468+ SVG icons

### Backend & Infrastructure
- **Supabase** — Auth, PostgreSQL, Storage, Realtime, Edge Functions
- **Node.js + Express** — TypeScript API layer
- **Docker** — Containerization
- **Nginx** — Reverse proxy
- **GitHub Actions** — CI/CD automation

## 📁 Project Structure

```
├── apps/
│   ├── web/                          # React frontend
│   │   ├── src/
│   │   │   ├── components/           # 10+ reusable UI components
│   │   │   │   ├── ui/               # Button, Input, Card, Badge, Alert, Avatar
│   │   │   │   ├── dashboard/        # StatsCard, ChartCard
│   │   │   │   ├── data/             # DataTable with enterprise features
│   │   │   │   ├── layout/           # Layout wrapper
│   │   │   │   └── navigation/       # Sidebar & Header
│   │   │   ├── features/             # Page components
│   │   │   │   ├── admin/            # Admin Dashboard
│   │   │   │   ├── member/           # Member Dashboard
│   │   │   │   └── auth/             # Login Page
│   │   │   ├── context/              # ThemeContext (dark mode)
│   │   │   ├── lib/                  # Utilities & helpers
│   │   │   ├── style.css             # 700+ lines with theme variables
│   │   │   ├── tailwind.config.js    # Tailwind customization
│   │   │   └── main.tsx              # App entry point
│   │   └── docs/                     # Component documentation
│   ├── api/                          # Express API layer
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── middleware/
│   │   │   └── server.ts
│   │   └── tsconfig.json
│   └── package.json
├── supabase/
│   ├── migrations/                   # Database schema
│   ├── functions/                    # Edge Functions
│   └── policies/                     # Row-Level Security
├── docs/
│   ├── DESIGN_SYSTEM.md             # 400+ line design guide
│   ├── QUICK_REFERENCE.md           # Developer quick start
│   ├── IMPLEMENTATION_COMPLETE.md   # Project overview
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   ├── API.md
│   └── USER_MANUAL.md
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/zafarazlay/akybs-fitness-center-enterprise.git
cd akybs-fitness-center-enterprise

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your Supabase credentials
```

### Development

```bash
# Start dev server (React frontend)
cd apps/web
npm run dev
# Visit http://localhost:5174

# Demo Credentials
# Admin: admin@akybs.com / Admin@123
# Member: member@akybs.com / Member@123

# Start API server (in another terminal)
cd apps/api
npm run dev
# API runs on http://localhost:3000
```

### Production Build

```bash
# Build frontend
cd apps/web
npm run build
npm run preview

# Build output
# - dist/index.html
# - dist/assets/index-*.js (807.96 KB, 232.80 KB gzipped)
# - dist/assets/index-*.css (6.63 KB, 1.79 KB gzipped)
```

## 📊 Build Metrics

```
✅ Modules: 2,801 bundled
✅ CSS Size: 6.63 KB (gzipped: 1.79 KB)
✅ JS Size: 807.96 KB (gzipped: 232.80 KB)
✅ Build Time: 12.78 seconds
✅ TypeScript Errors: 0
✅ Lighthouse Score Target: 90+
✅ Accessibility: WCAG Level AA
```

## 🎨 Design System

### Color Palette
- **Primary**: #5b60ff (Brand blue)
- **Secondary**: #9254ff (Purple)
- **Success**: #22c55e (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)
- **Neutral**: Complete 10-shade grayscale (50-950)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Scale**: 12px → 40px (10 sizes)
- **Weights**: 100, 200, 300, 400, 500, 600, 700, 800, 900

### Components Included

| Component | Variants | Features |
|-----------|----------|----------|
| **Button** | primary, secondary, tertiary, ghost, success, danger, warning, outline | 5 sizes, loading state, icons, fullWidth |
| **Input** | text, email, password | Labels, icons, validation, helper text, error state |
| **Card** | standard, premium, interactive | Gradient backgrounds, hover effects, animations |
| **Badge** | 6 colors | Icon support, responsive sizing |
| **Alert** | 5 severity levels | Closeable, auto-dismiss, semantic icons |
| **Avatar** | xs to xl | Auto-generated initials, deterministic colors |
| **DataTable** | — | Sorting, filtering, pagination, export, bulk actions |
| **StatsCard** | 5 color variants | Trend indicators, hover animations |
| **ChartCard** | line, area, bar, pie | Responsive containers, tooltips, legends |
| **Layout** | admin, member | Responsive sidebar, animations, mobile support |

## 📖 Documentation

- **[DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** — Complete design system documentation (400+ lines)
- **[QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)** — Developer quick start guide with code examples
- **[IMPLEMENTATION_COMPLETE.md](docs/IMPLEMENTATION_COMPLETE.md)** — Full project overview
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** — System architecture & flow
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** — Production deployment guide
- **[API.md](docs/API.md)** — API endpoints documentation

## 🔧 Production Flow

1. **Create Supabase Project**
   ```bash
   # Initialize Supabase project
   # Get API URL and anon key
   ```

2. **Database Setup**
   ```bash
   # Run migrations
   psql -d your_database -f supabase/migrations/001_initial_schema.sql
   
   # Create storage bucket
   # Create payment-proofs bucket with RLS policies
   ```

3. **Configure Environment**
   ```bash
   # apps/web/.env
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   
   # apps/api/.env
   SUPABASE_URL=your_url
   SUPABASE_SERVICE_KEY=your_key
   ```

4. **Deploy Frontend**
   ```bash
   # Option 1: Vercel (recommended)
   npm install -g vercel
   cd apps/web
   vercel
   
   # Option 2: Netlify
   # Option 3: GitHub Pages
   ```

5. **Deploy API**
   ```bash
   # Option 1: Railway
   # Option 2: Render
   # Option 3: Fly.io
   # Option 4: VPS (Docker)
   ```

6. **Configure Edge Functions**
   ```bash
   # Deploy reminder functions to Supabase
   supabase functions deploy send-reminders
   supabase functions deploy create-member
   ```

## 🧪 Testing

```bash
# Run TypeScript check
npm run build

# Dev server with HMR
npm run dev

# Check for errors
npm run lint
```

## 🌙 Dark Mode

The application includes a complete dark mode implementation:

```tsx
import { useTheme } from '@/context/ThemeContext';

function MyComponent() {
  const { resolvedTheme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {resolvedTheme}
    </button>
  );
}
```

**Features**:
- ✅ Automatic system preference detection
- ✅ Manual toggle with localStorage persistence
- ✅ Smooth transitions between themes
- ✅ CSS variable-based theming
- ✅ All components theme-aware

## 📱 Responsive Design

**Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px - 1280px
- Wide: > 1280px

All components follow mobile-first design principles with responsive Tailwind classes.

## ♿ Accessibility

- ✅ WCAG Level AA compliant
- ✅ Keyboard navigation (Tab, Arrow keys)
- ✅ Focus indicators on all interactive elements
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Form labels and descriptions
- ✅ Color-blind friendly palette
- ✅ Sufficient color contrast (4.5:1+)
- ✅ Screen reader support

## 📦 Component Usage

### Button Component
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg" icon={<Plus />}>
  Click Me
</Button>
```

### DataTable Component
```tsx
import { DataTable } from '@/components/data/DataTable';

<DataTable
  columns={columns}
  data={data}
  paginated
  sortable
  exportable
/>
```

### StatsCard Component
```tsx
import { StatsCard } from '@/components/dashboard/StatsCard';

<StatsCard
  title="Revenue"
  value="₹245,000"
  trend={{ direction: 'up', value: 12.5 }}
  variant="primary"
/>
```

See [QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md) for more examples.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋 Support

For support, email support@akybs.com or open an issue on GitHub.

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

[🌐 Live Demo](#) • [📖 Documentation](docs/) • [🐛 Report Bug](https://github.com/zafarazlay/akybs-fitness-center-enterprise/issues) • [✨ Request Feature](https://github.com/zafarazlay/akybs-fitness-center-enterprise/issues)

</div>
