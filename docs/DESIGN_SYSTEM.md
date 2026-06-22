# AKYSB Fitness Center - Modern Design System 2026

## Overview

This document outlines the complete design system and modern UI/UX implementation for the AKYSB Fitness Center Enterprise management platform. The design follows premium SaaS standards inspired by Stripe, Notion, Linear, and Vercel.

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Animations](#animations)
7. [Dark Mode](#dark-mode)
8. [Accessibility](#accessibility)
9. [Performance Optimization](#performance-optimization)
10. [Development Guide](#development-guide)

---

## Design Principles

### Core Philosophy
- **Modern & Professional**: Clean, premium interface suitable for enterprise use
- **User-Centric**: Intuitive navigation and clear information hierarchy
- **Consistent**: Unified design language across all pages
- **Accessible**: WCAG compliant with keyboard navigation support
- **Performant**: Optimized for speed and smooth interactions
- **Responsive**: Mobile-first approach supporting all device sizes

### Key Values
- Clarity over complexity
- Consistency in patterns and interactions
- Speed and efficiency
- Visual hierarchy and information architecture
- Accessibility first
- Dark mode support

---

## Color System

### Primary Palette
```
Primary: #5b60ff (Brand color for CTAs and highlights)
Secondary: #9254ff (Complementary brand color)
Success: #22c55e (Positive actions and confirmations)
Warning: #f59e0b (Alerts and attention-needed items)
Error: #ef4444 (Errors and destructive actions)
Neutral: #6B7280 (Default text and UI elements)
```

### Light Theme
- Background: #ffffff
- Surface: #f8fafc
- Text Primary: #0f172a (Dark blue-gray)
- Text Secondary: #334155 (Medium gray)
- Text Tertiary: #64748b (Light gray)
- Borders: #e2e8f0

### Dark Theme
- Background: #0f172a
- Surface: #1e293b
- Text Primary: #f1f5f9 (Light blue-gray)
- Text Secondary: #cbd5e1 (Medium light gray)
- Text Tertiary: #94a3b8 (Lighter gray)
- Borders: #334155

### Usage Guidelines
- **Primary Color**: Main CTAs, active states, focus indicators
- **Secondary Color**: Hover states, secondary actions
- **Success**: Completed actions, positive feedback
- **Warning**: Pending actions, caution alerts
- **Error**: Failed actions, destructive operations

---

## Typography

### Font Family
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: System fonts (system-ui, -apple-system)
- **Monospace**: Fira Code (for code blocks)

### Font Scale

| Size | Value | Line Height | Usage |
|------|-------|-------------|-------|
| XS | 12px | 16px | Labels, badges, helper text |
| SM | 13px | 20px | Small text, meta information |
| Base | 14px | 20px | Default body text |
| LG | 16px | 24px | Body text, descriptions |
| XL | 18px | 28px | Card headings |
| 2XL | 20px | 28px | Section titles |
| 3XL | 24px | 32px | Page headings |
| 4XL | 28px | 36px | Major headings |
| 5XL | 32px | 40px | Hero titles |
| 6XL | 40px | 48px | Banner headlines |

### Font Weights
- **100**: Thin (headers with large sizes)
- **200**: Extra Light
- **300**: Light
- **400**: Regular (default)
- **500**: Medium (labels, badges)
- **600**: Semi Bold (section headings)
- **700**: Bold (page headings)
- **800**: Extra Bold
- **900**: Black (hero elements)

---

## Spacing & Layout

### Spacing Scale
```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 20px
2xl: 24px
3xl: 32px
4xl: 40px
5xl: 48px
6xl: 56px
```

### Layout Grid
- **Desktop**: 1280px max-width with 24px side padding
- **Tablet**: Full width with 16px side padding
- **Mobile**: Full width with 12px side padding

### Component Spacing
- **Cards**: 20px (lg) padding
- **Section margins**: 32px (3xl) between sections
- **Component gaps**: 16px (lg) between items

---

## Components

### 1. Button Component
**Variants**: Primary, Secondary, Tertiary, Ghost, Success, Danger, Warning, Outline

**Sizes**: xs, sm, md (default), lg, xl, icon, icon-sm, icon-lg

**Features**:
- Loading state with spinner
- Icon support with left/right positioning
- Full-width option
- Hover and active animations
- Disabled state handling
- Focus ring for accessibility

**Example Usage**:
```tsx
<Button variant="primary" size="md" icon={<Plus />}>
  Add Member
</Button>
```

### 2. Input Component
**Features**:
- Floating labels
- Icon support (left/right)
- Validation states (error, success)
- Helper text
- Disabled state
- Responsive sizing

**Example Usage**:
```tsx
<Input
  label="Email"
  type="email"
  placeholder="user@example.com"
  icon={<Mail />}
  error={errors.email}
  helper="Enter a valid email address"
/>
```

### 3. Card Component
**Variants**:
- Standard: Basic white card with shadow
- Premium: Enhanced shadow and gradient background
- Interactive: Hover effects
- No border option

**Example Usage**:
```tsx
<Card premium interactive>
  Content goes here
</Card>
```

### 4. Badge Component
**Variants**: primary, secondary, success, warning, error, neutral

**Sizes**: sm (default), md

**Example Usage**:
```tsx
<Badge variant="success" icon={<Check />}>
  Completed
</Badge>
```

### 5. DataTable Component
**Features**:
- Sorting
- Filtering
- Search
- Pagination
- Row selection (bulk actions)
- Column visibility
- Export functionality
- Responsive design

**Example Usage**:
```tsx
<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
  ]}
  data={members}
  paginated
  exportable
  onEdit={handleEdit}
/>
```

### 6. StatsCard Component
**Features**:
- Icon support
- Trend indicators (up/down)
- Gradient backgrounds by variant
- Loading skeleton
- Custom footer content
- Hover animations

**Example Usage**:
```tsx
<StatsCard
  title="Total Members"
  value="244"
  icon={<Users />}
  trend={{ direction: 'up', value: 12.5 }}
  variant="primary"
  footer="25 new this month"
/>
```

### 7. ChartCard Component
**Chart Types**: line, area, bar, pie

**Example Usage**:
```tsx
<ChartCard
  title="Revenue Trend"
  data={revenueData}
  type="area"
  height={300}
/>
```

### 8. Layout Component
**Features**:
- Responsive sidebar (collapsible on desktop)
- Fixed header
- Mobile menu toggle
- Theme switcher
- Breadcrumb support
- Smooth page transitions

**Example Usage**:
```tsx
<Layout variant="admin" title="Dashboard">
  Content here
</Layout>
```

### 9. Alert Component
**Variants**: primary, success, warning, error, info

**Features**:
- Icon support
- Closeable option
- Animated entrance

**Example Usage**:
```tsx
<Alert variant="success" closeable>
  Payment processed successfully!
</Alert>
```

### 10. Avatar Component
**Features**:
- Image support
- Auto-generated initials
- Color-coded based on name
- Multiple sizes (xs, sm, md, lg, xl)

**Example Usage**:
```tsx
<Avatar
  name="John Doe"
  src={imageUrl}
  size="md"
/>
```

---

## Animations

### Using Framer Motion

All animations are powered by Framer Motion for smooth, performant interactions.

### Common Animations

#### Page Transitions
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Page content
</motion.div>
```

#### Staggered List Items
```tsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

#### Hover Effects
```tsx
<motion.div
  whileHover={{ scale: 1.02, translateY: -4 }}
  transition={{ duration: 0.2 }}
>
  Hoverable content
</motion.div>
```

#### Loading Spinner
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity, linear: true }}
>
  <Spinner />
</motion.div>
```

### Animation Timing
- **Fast**: 150ms (quick UI feedback)
- **Base**: 200ms (default interactions)
- **Slower**: 300ms (page transitions, complex animations)

### Easing Functions
- **Ease Smooth**: cubic-bezier(0.4, 0, 0.2, 1)
- **Ease Out**: Used for entrances
- **Ease In**: Used for exits

---

## Dark Mode

### Implementation
- Uses CSS variables for theme switching
- Persisted to localStorage
- System preference detection
- Smooth transitions between themes

### Using Dark Mode
```tsx
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}
```

### Styling Dark Mode
All components automatically support dark mode through Tailwind's `dark:` prefix:

```tsx
<div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
  Content that works in both themes
</div>
```

---

## Accessibility

### WCAG Compliance
- **Level AA** compliance as minimum standard
- All interactive elements are keyboard accessible
- Proper color contrast ratios (4.5:1 for text)
- Semantic HTML structure
- ARIA labels where needed

### Keyboard Navigation
- `Tab`: Move to next focusable element
- `Shift+Tab`: Move to previous element
- `Enter`: Activate button/submit form
- `Escape`: Close modals/popups
- `Arrow Keys`: Navigate lists/menus

### Screen Reader Support
- Proper heading hierarchy (h1 → h6)
- Descriptive link text (not "click here")
- Image alt text
- Form labels associated with inputs
- ARIA live regions for dynamic content

### Color Accessibility
- Don't rely on color alone to convey information
- Use icons with colored badges
- Sufficient contrast ratios in all themes
- Color-blind friendly palette

---

## Performance Optimization

### Target Metrics
- **Lighthouse Score**: 90+
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

### Optimization Techniques

#### 1. Code Splitting
- Route-based code splitting with React Router
- Component lazy loading for non-critical UI

#### 2. Image Optimization
- WebP format for modern browsers
- Responsive images with srcset
- Lazy loading with loading="lazy"

#### 3. Bundle Optimization
- Tree shaking of unused code
- CSS purging of unused styles
- Minification of production builds

#### 4. Runtime Performance
- Memoization of expensive components (React.memo)
- useCallback for function stability
- useMemo for computed values
- Virtual scrolling for large lists

#### 5. Animations
- GPU-accelerated animations (transform, opacity)
- Avoid animating layout properties
- Reduce-motion preference support

---

## Development Guide

### Project Structure
```
apps/web/
├── src/
│   ├── components/
│   │   ├── ui/           # Base UI components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── data/         # Data display components
│   │   ├── navigation/   # Navigation components
│   │   └── layout/       # Layout wrapper components
│   ├── features/
│   │   ├── admin/        # Admin pages
│   │   ├── member/       # Member pages
│   │   └── auth/         # Authentication pages
│   ├── context/          # React context (theme, auth)
│   ├── lib/              # Utility functions
│   ├── store/            # Zustand stores
│   └── main.tsx          # App entry point
├── style.css             # Global styles with theme variables
├── tailwind.config.js    # Tailwind configuration
└── index.html
```

### Adding a New Component

1. Create component file: `src/components/ui/MyComponent.tsx`
2. Use composition over inheritance
3. Export both component and variants if applicable
4. Add TypeScript interfaces for all props
5. Include JSDoc comments

### Example Component Template
```tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const myComponentVariants = cva(
  // Base styles
  'base-classes',
  {
    variants: {
      variant: {
        primary: 'primary-classes',
        secondary: 'secondary-classes',
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {
  // Custom props
}

export const MyComponent = React.forwardRef<
  HTMLDivElement,
  MyComponentProps
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(myComponentVariants({ variant, size }), className)}
    {...props}
  />
));

MyComponent.displayName = 'MyComponent';
```

### Styling Best Practices

1. Use Tailwind CSS for styling
2. Use CSS variables for theme switching
3. Prefer `cn()` utility for merging classes
4. Use CVA (class-variance-authority) for component variants
5. Keep component styles scoped

### Creating Animations

1. Use Framer Motion for all animations
2. Prefer transform and opacity for performance
3. Keep animations under 300ms for most interactions
4. Consider `prefers-reduced-motion` preference

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Theme Customization

Colors and spacing can be extended in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      myColor: {
        50: '#f0f9ff',
        500: '#0284c7',
        900: '#0c2d6b',
      },
    },
  },
}
```

### Adding New Routes

1. Add route in `main.tsx`
2. Create page component in `src/features/`
3. Wrap with `<Layout>` component
4. Add navigation item to sidebar

```tsx
<Route path="/admin/members" element={<AdminMembers />} />
```

---

## Customization Guide

### Admin Branding

The admin can customize branding without code changes:

1. **Gym Name**: Settings → Gym Info
2. **Logo**: Settings → Branding
3. **Favicon**: Settings → Branding
4. **Theme Colors**: Settings → Theme
5. **Receipt Branding**: Settings → Receipt

These are persisted to the database and loaded dynamically.

### Creating Custom Dashboard Widgets

1. Create widget component with Chart Card or Stats Card
2. Add to appropriate dashboard page
3. Wire up with real data via API
4. Enable/disable in settings

---

## Future Enhancements

### Planned Features
1. **Advanced Reporting**: Custom report builder
2. **Payment Gateway Integration**: Stripe, Razorpay
3. **Member Mobile App**: React Native version
4. **AI-Powered Features**: Recommendation engine
5. **Advanced Analytics**: Business intelligence dashboard
6. **Notification System**: Email, SMS, Push notifications
7. **Backup & Recovery**: Automated backups with recovery
8. **API Documentation**: Full REST API with Swagger

### Performance Roadmap
1. Implement Service Workers for offline support
2. Add compression for data transfer
3. Optimize database queries with caching
4. Implement real-time sync with WebSockets

---

## Support & Resources

### Documentation
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Component Libraries Reference
- [Class Variance Authority](https://cva.style/)
- [Lucide Icons](https://lucide.dev/)
- [Recharts](https://recharts.org/)
- [React Hook Form](https://react-hook-form.com/)

### Tools
- **Design**: Figma (export components as code)
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions

---

## Version History

### v2.0.0 - Modern 2026 Design System (Current)
- Complete design system overhaul
- Dark mode support
- Premium component library
- Modern animations with Framer Motion
- Enterprise-grade data tables
- Comprehensive documentation

### v1.0.0 - Initial Release
- Basic functional components
- Simple styling
- Essential features

---

**Last Updated**: June 22, 2024
**Design System Version**: 2.0.0
**Author**: AKYSB Development Team
