# Quick Start Guide - Bus Ticketing Next.js

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies

Open terminal in the project folder and run:

\`\`\`bash
npm install
\`\`\`

This will install:
- Next.js 14
- React 18
- TypeScript
- All required dependencies

### 2. Add Your Logo

Place your logo file in the correct location:

\`\`\`
public/
└── assets/
    └── images/
        └── mylogo.png  ← Put your logo here
\`\`\`

### 3. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Then open your browser to: **http://localhost:3000**

## ✅ What Works Now

- ✅ Login page with authentication
- ✅ Home page with popular routes
- ✅ Search page with form
- ✅ Responsive sidebar navigation
- ✅ Session management
- ✅ Intel One Mono font integrated

## 📋 Testing the Application

### Test Login
1. Go to http://localhost:3000
2. You'll be redirected to `/login`
3. Enter any email and password
4. **For Admin:** Use email with "admin" (e.g., admin@test.com)
5. **For User:** Use any other email

### Test User Flow
1. Login as user → Redirects to `/home`
2. Click "Book Now" → Goes to `/search`
3. Fill search form → Click "Search"
4. Continue through booking flow

### Test Admin Flow
1. Login as admin → Redirects to `/admin/buses`
2. View bus management interface

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run linter |

## 📁 Project Structure Overview

\`\`\`
Your Project/
├── app/                    ← All pages go here
│   ├── page.tsx           ← Landing page (/)
│   ├── login/page.tsx     ← Login page (/login)
│   ├── home/page.tsx      ← Home page (/home)
│   └── search/page.tsx    ← Search page (/search)
│
├── components/            ← Reusable components
│   ├── Sidebar.tsx
│   └── Header.tsx
│
├── public/assets/         ← Your logo & icons
│   ├── images/mylogo.png
│   └── icons/
│
├── styles/                ← Global styles
│   └── globals.css
│
└── package.json           ← Dependencies
\`\`\`

## 🎨 Customization

### Change Colors

Edit `styles/globals.css`:

\`\`\`css
:root {
  --primary-blue: #2563eb;  ← Your primary color
  --dark-blue: #1e40af;     ← Your dark shade
  --light-blue: #dbeafe;    ← Your light shade
}
\`\`\`

### Update Logo Size

In any component using the logo, adjust:

\`\`\`css
.logo img {
  width: 50px;   ← Change size here
  height: 50px;
}
\`\`\`

## 🔧 Troubleshooting

### Port Already in Use
If port 3000 is busy:
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Module Not Found Error
Run:
\`\`\`bash
npm install
\`\`\`

### Logo Not Showing
Make sure file is at: `public/assets/images/mylogo.png`

### TypeScript Errors
Run:
\`\`\`bash
npm install --save-dev typescript @types/react @types/node
\`\`\`

## 📝 Adding New Pages

Create a new page:

\`\`\`bash
# Create folder
mkdir app/my-new-page

# Create page file
# (You can use the file explorer or command line)
\`\`\`

Then add this code to `app/my-new-page/page.tsx`:

\`\`\`typescript
'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function MyNewPage() {
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <Header title="My New Page" showBackButton />
        <div className="content-area">
          <h1>My New Page</h1>
        </div>
      </main>
    </div>
  );
}
\`\`\`

Access it at: http://localhost:3000/my-new-page

## 🚢 Deploy to Production

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically

### Option 2: Build Locally
\`\`\`bash
npm run build
npm start
\`\`\`

## 📚 Next Steps

1. ✅ Get the app running
2. ✅ Test login and navigation
3. 📄 Convert remaining pages (see CONVERSION_GUIDE.md)
4. 🎨 Customize colors and branding
5. 🔌 Add backend API
6. 🚀 Deploy to production

## 💡 Tips

- **Hot Reload:** Changes auto-refresh in the browser
- **TypeScript:** Provides autocomplete and error checking
- **CSS Modules:** Styles are scoped to components
- **File-based Routing:** Folder structure = URL structure

## ❓ Need Help?

- Check `README.md` for detailed documentation
- See `CONVERSION_GUIDE.md` for HTML → Next.js migration
- Next.js docs: https://nextjs.org/docs
- React docs: https://react.dev

---

**Ready to go!** Run `npm run dev` and start building! 🎉
