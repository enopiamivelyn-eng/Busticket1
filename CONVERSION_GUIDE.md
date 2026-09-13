# HTML to Next.js Conversion Guide

This document explains how the Bus Ticketing System was converted from HTML/CSS/JavaScript to Next.js.

## Major Changes

### 1. File Structure

**Before (HTML):**
\`\`\`
├── index.html
├── login.html
├── home.html
├── search.html
├── css/styles.css
├── js/main.js
└── assets/
\`\`\`

**After (Next.js):**
\`\`\`
├── app/
│   ├── page.tsx (index)
│   ├── login/page.tsx
│   ├── home/page.tsx
│   ├── search/page.tsx
│   └── layout.tsx
├── components/
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── *.module.css
├── styles/globals.css
└── public/assets/
\`\`\`

### 2. Routing

**Before:** Manually managed with `window.location.href`
\`\`\`javascript
window.location.href = 'home.html';
\`\`\`

**After:** Next.js App Router with `useRouter` hook
\`\`\`typescript
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/home');
\`\`\`

### 3. Components

**Before:** Repeated HTML in every page
\`\`\`html
<!-- Sidebar copied in every HTML file -->
<aside class="sidebar">
  ...
</aside>
\`\`\`

**After:** Reusable React components
\`\`\`typescript
import Sidebar from '@/components/Sidebar';
<Sidebar />
\`\`\`

### 4. Styling

**Before:** Single global CSS file
\`\`\`css
/* css/styles.css */
.sidebar { ... }
.nav-menu { ... }
\`\`\`

**After:** CSS Modules for component-specific styles
\`\`\`css
/* components/Sidebar.module.css */
.sidebar { ... }
.navMenu { ... }
\`\`\`

### 5. State Management

**Before:** Plain JavaScript with sessionStorage
\`\`\`javascript
sessionStorage.setItem('bookingData', JSON.stringify(data));
\`\`\`

**After:** React hooks with sessionStorage
\`\`\`typescript
const [bookingData, setBookingData] = useState<BookingData | null>(null);

useEffect(() => {
  const stored = sessionStorage.getItem('bookingData');
  if (stored) setBookingData(JSON.parse(stored));
}, []);
\`\`\`

### 6. Forms

**Before:** HTML forms with onclick handlers
\`\`\`html
<form onsubmit="handleLogin(event)">
  <input type="email" id="email">
</form>

<script>
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
}
</script>
\`\`\`

**After:** React controlled components
\`\`\`typescript
const [email, setEmail] = useState('');

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  // Use email state
};

<form onSubmit={handleSubmit}>
  <input 
    type="email" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</form>
\`\`\`

## Converted Pages

| HTML File | Next.js Page | Status |
|-----------|--------------|--------|
| index.html | app/page.tsx | ✅ Converted |
| login.html | app/login/page.tsx | ✅ Converted |
| home.html | app/home/page.tsx | ✅ Converted |
| search.html | app/search/page.tsx | ✅ Converted |
| search-results.html | app/search-results/page.tsx | ⏳ Template created |
| passenger-details.html | app/passenger-details/page.tsx | ⏳ Template created |
| payment.html | app/payment/page.tsx | ⏳ Template created |
| booking-confirmation.html | app/booking-confirmation/page.tsx | ⏳ Template created |
| ticket.html | app/ticket/page.tsx | ⏳ Template created |
| my-bookings.html | app/my-bookings/page.tsx | ⏳ Template created |
| admin-buses.html | app/admin/buses/page.tsx | ⏳ Template created |

## Created Components

1. **Sidebar.tsx** - Navigation sidebar (user/admin variants)
2. **Header.tsx** - Top header with back button and logout
3. More components can be extracted as needed

## Key Benefits

### Type Safety
- TypeScript catches errors at compile time
- Better IDE autocomplete and IntelliSense
- Fewer runtime errors

### Performance
- Automatic code splitting
- Optimized image loading
- Server-side rendering capabilities
- Fast page transitions

### Developer Experience
- Hot module replacement (instant updates)
- Component reusability
- Better code organization
- Built-in routing

### SEO & Accessibility
- Server-side rendering support
- Better meta tags management
- Improved crawlability

## Migration Steps for Remaining Pages

To convert remaining HTML pages:

1. **Create page structure:**
\`\`\`bash
mkdir app/[page-name]
touch app/[page-name]/page.tsx
touch app/[page-name]/[page-name].module.css
\`\`\`

2. **Convert HTML to JSX:**
   - Change `class` to `className`
   - Convert inline event handlers to functions
   - Use `<Link>` instead of `<a>` for internal navigation
   - Convert images to use `/public` path

3. **Move styles:**
   - Extract page-specific styles to module.css
   - Keep global styles in globals.css

4. **Add interactivity:**
   - Use `useState` for form inputs
   - Use `useEffect` for data loading
   - Use `useRouter` for navigation

5. **Test functionality:**
   - Test form submissions
   - Verify navigation works
   - Check sessionStorage integration

## Next Steps

### Immediate
1. Install dependencies: `npm install`
2. Add logo and icons to `/public/assets/`
3. Run dev server: `npm run dev`
4. Test login and home pages

### Short-term
1. Convert remaining pages (search-results, payment, etc.)
2. Add loading states
3. Add error handling
4. Improve type definitions

### Long-term
1. Add backend API integration
2. Implement proper authentication (JWT, sessions)
3. Add database integration
4. Deploy to Vercel or similar platform
5. Add automated testing

## Common Patterns

### Page Template
\`\`\`typescript
'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import styles from './page.module.css';

export default function PageName() {
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <Header title="Page Title" showBackButton />
        <div className="content-area">
          {/* Your content here */}
        </div>
      </main>
    </div>
  );
}
\`\`\`

### Form Handling
\`\`\`typescript
const [formData, setFormData] = useState({
  field1: '',
  field2: ''
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  // Handle form submission
};
\`\`\`

### Navigation
\`\`\`typescript
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/destination');
router.back();
\`\`\`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Modules](https://github.com/css-modules/css-modules)

## Support

For questions about the conversion, refer to the Next.js documentation or create an issue in the repository.
