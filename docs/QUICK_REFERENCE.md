# Quick Reference Guide - AKYSB Design System

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd apps/web
npm install
```

### 2. Start Development Server
```bash
npm run dev
# Visit http://localhost:5173
```

### 3. Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

---

## 🎨 Using Components

### Button Component
```tsx
import { Button } from '@/components/ui/Button';

// Primary button
<Button variant="primary" size="md">
  Click Me
</Button>

// With icon
<Button variant="success" icon={<Plus />}>
  Add Item
</Button>

// Loading state
<Button loading>Processing...</Button>

// Full width
<Button fullWidth>Submit</Button>
```

**Variants**: primary, secondary, tertiary, ghost, success, danger, warning, outline
**Sizes**: xs, sm, md (default), lg, xl, icon, icon-sm, icon-lg

---

### Input Component
```tsx
import { Input } from '@/components/ui/Input';

<Input
  label="Email"
  type="email"
  placeholder="user@example.com"
  icon={<Mail />}
  error={errors.email?.message}
  helper="We'll never share your email"
  required
/>
```

---

### Card Component
```tsx
import { Card } from '@/components/ui/Card';

// Standard card
<Card>Content</Card>

// Premium card (gradient + shadow)
<Card premium>Premium Content</Card>

// Interactive (hover effects)
<Card interactive onClick={handleClick}>
  Clickable Card
</Card>
```

---

### DataTable Component
```tsx
import { DataTable } from '@/components/data/DataTable';

<DataTable
  title="Members"
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <Badge variant="success">{value}</Badge>
    }
  ]}
  data={members}
  paginated
  rowsPerPage={10}
  onEdit={handleEdit}
  onDelete={handleDelete}
  exportable
/>
```

---

### StatsCard Component
```tsx
import { StatsCard } from '@/components/dashboard/StatsCard';

<StatsCard
  title="Total Revenue"
  value="₹245,000"
  icon={<DollarSign />}
  trend={{ direction: 'up', value: 12.5 }}
  variant="primary"
  footer="Last 30 days"
  onClick={() => navigate('/admin/reports')}
/>
```

**Variants**: primary, secondary, success, warning, error

---

### ChartCard Component
```tsx
import { ChartCard } from '@/components/dashboard/ChartCard';

const data = [
  { month: 'Jan', value: 45000 },
  { month: 'Feb', value: 52000 },
];

<ChartCard
  title="Revenue Trend"
  subtitle="Last 6 months"
  data={data}
  type="area"  // line, area, bar, pie
  height={300}
/>
```

---

### Badge Component
```tsx
import { Badge } from '@/components/ui/Badge';

<Badge variant="success" icon={<Check />}>
  Completed
</Badge>
```

**Variants**: primary, secondary, success, warning, error, neutral

---

### Layout Component
```tsx
import { Layout } from '@/components/layout/Layout';

<Layout variant="admin" title="Dashboard" subtitle="Overview">
  {/* Your dashboard content */}
</Layout>
```

---

## 🎯 Styling with Tailwind

### Color Classes
```tsx
// Text colors
<div className="text-primary-500 dark:text-primary-400">
  Primary text (auto switches in dark mode)
</div>

// Background colors
<div className="bg-neutral-50 dark:bg-neutral-900">
  Background
</div>

// Borders
<div className="border border-neutral-200 dark:border-neutral-800">
  Bordered box
</div>
```

### Common Patterns
```tsx
// Card with padding
<div className="rounded-lg bg-white dark:bg-neutral-900 p-5 shadow-sm">
  Card content
</div>

// Flex layout
<div className="flex items-center justify-between gap-4">
  Flex content
</div>

// Grid layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  Grid items
</div>

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Responsive heading
</h1>
```

---

## 🌙 Dark Mode Implementation

### Using Dark Mode
```tsx
import { useTheme } from '@/context/ThemeContext';

function MyComponent() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {resolvedTheme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}
```

### Styling for Dark Mode
```tsx
// Automatic with dark: prefix
<div className="bg-white dark:bg-neutral-900 text-black dark:text-white">
  Content adapts to theme automatically
</div>

// Using CSS variables
<div className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
  Uses theme variables
</div>
```

---

## ✨ Adding Animations

### Page Transition
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Page content
</motion.div>
```

### Staggered List
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Hover Effects
```tsx
<motion.div
  whileHover={{ scale: 1.05, translateY: -4 }}
  transition={{ duration: 0.2 }}
>
  Hover me!
</motion.div>
```

---

## 📱 Responsive Design Breakpoints

```tsx
// Mobile first
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive text
</div>

// Grid responsive
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  Items
</div>

// Display toggle
<div className="hidden md:block">
  Only on desktop
</div>

<div className="md:hidden">
  Only on mobile
</div>
```

---

## 🔧 Customizing Colors

### Using Existing Colors
```tsx
// In tailwind classes
<div className="bg-primary-500 text-success-600">
  Colored content
</div>

// In style prop
<div style={{ backgroundColor: 'var(--primary)' }}>
  Using CSS variable
</div>
```

### Adding New Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      myBrand: {
        50: '#f0f4ff',
        500: '#3b82f6',
        900: '#1e3a8a',
      }
    }
  }
}
```

Then use:
```tsx
<div className="bg-myBrand-500">
  Custom color
</div>
```

---

## 📊 Creating Custom Pages

### 1. Create Component
```tsx
// src/features/admin/MyPage.tsx
import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';

export function MyPage() {
  return (
    <Layout variant="admin" title="My Page" subtitle="Subtitle">
      <div className="space-y-8">
        {/* Your content */}
      </div>
    </Layout>
  );
}
```

### 2. Add Route
```tsx
// src/main.tsx
<Route path="/admin/mypage" element={<MyPage />} />
```

### 3. Add Navigation
```tsx
// In Sidebar navItems
{
  label: 'My Page',
  icon: <MyIcon className="w-5 h-5" />,
  href: '/admin/mypage',
}
```

---

## 🧪 Testing Components

### Visual Testing
1. Run dev server: `npm run dev`
2. Navigate through pages
3. Test light/dark mode toggle
4. Test responsive design (browser dev tools)
5. Test animations and interactions

### Accessibility Testing
1. Test keyboard navigation (Tab, Shift+Tab)
2. Check focus indicators
3. Test with screen reader
4. Verify color contrast
5. Check semantic HTML

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `components/ui/*` | Base UI components |
| `components/dashboard/*` | Dashboard-specific components |
| `components/data/DataTable.tsx` | Data display table |
| `components/layout/Layout.tsx` | Page layout wrapper |
| `components/navigation/Sidebar.tsx` | Sidebar & header |
| `context/ThemeContext.tsx` | Theme provider |
| `lib/utils.ts` | Utility functions |
| `style.css` | Global styles & theme variables |
| `tailwind.config.js` | Tailwind configuration |
| `features/admin/*` | Admin pages |
| `features/member/*` | Member pages |
| `features/auth/*` | Auth pages |

---

## 🎓 Best Practices

### Component Creation
```tsx
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Use CVA for variants
const componentVariants = cva('base-classes', {
  variants: {
    variant: {
      primary: 'primary-styles',
    },
  },
});

// Typed props interface
export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary';
}

// Use React.forwardRef
export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(componentVariants({ variant }), className)} {...props} />
  )
);

MyComponent.displayName = 'MyComponent';
```

### Styling Priority
1. Use Tailwind classes first
2. Use CVA for variants
3. Use `cn()` to merge classes
4. Use inline styles only when necessary
5. Use CSS variables for themes

### Animation Best Practices
1. Keep animations under 300ms
2. Use transform & opacity (GPU accelerated)
3. Avoid animating width/height
4. Consider `prefers-reduced-motion`
5. Test performance on slower devices

---

## 🚨 Common Issues & Solutions

### Issue: Dark mode not switching
**Solution**: Make sure ThemeProvider wraps the entire app in main.tsx

### Issue: Components not showing icons
**Solution**: Import from lucide-react: `import { Plus } from 'lucide-react';`

### Issue: Tailwind styles not applying
**Solution**: Check file is included in `content` in tailwind.config.js

### Issue: Animation feels janky
**Solution**: Use transform/opacity instead of width/height, check GPU rendering

### Issue: Component not responsive
**Solution**: Use responsive classes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

---

## 📞 Support

### Documentation
- See `docs/DESIGN_SYSTEM.md` for detailed documentation
- See component JSDoc comments in code
- Check `IMPLEMENTATION_COMPLETE.md` for project overview

### Additional Resources
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated**: June 22, 2024
**Version**: 1.0.0
