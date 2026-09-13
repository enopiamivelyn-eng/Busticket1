# Bus Ticketing System - Next.js

A modern bus ticketing and reservation system built with Next.js, TypeScript, and React.

## Features

- 🎫 User booking system with search functionality
- 👤 User authentication (login/logout)
- 📱 Responsive design
- 🎨 Modern UI with Intel One Mono font
- 🚌 Admin dashboard for bus management
- 📊 Booking management with status tracking
- 💳 Payment integration (GCash, Maya)
- 🎟️ Digital tickets with QR codes

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Font:** Intel One Mono

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

2. Place your logo image:
   - Add `mylogo.png` to `/public/assets/images/`
   - Add other icons to `/public/assets/icons/`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
bus-ticketing-nextjs/
├── app/                      # Next.js app directory
│   ├── login/               # Login page
│   ├── home/                # Home page
│   ├── search/              # Search page
│   ├── my-bookings/         # My bookings page
│   ├── ticket/              # Ticket page
│   ├── admin/               # Admin pages
│   └── layout.tsx           # Root layout
├── components/              # Reusable components
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── *.module.css
├── lib/                     # Utility functions
├── public/                  # Static assets
│   └── assets/
│       ├── images/          # mylogo.png goes here
│       └── icons/           # Icon files
├── styles/                  # Global styles
│   └── globals.css
└── package.json
\`\`\`

## Pages

### User Pages
- `/` - Landing page (redirects to login or home)
- `/login` - User authentication
- `/home` - Main user dashboard with popular routes
- `/search` - Search for bus routes
- `/search-results` - View search results
- `/passenger-details` - Enter passenger information
- `/payment` - Payment page
- `/booking-confirmation` - Booking confirmation
- `/ticket` - View ticket with QR code
- `/my-bookings` - View all bookings (Upcoming/Completed/Cancelled)

### Admin Pages
- `/admin/buses` - Manage buses
- `/admin/bookings` - Manage bookings
- `/admin/routes` - Manage routes
- `/admin/payments` - View payments

## Login Credentials

For testing purposes:
- **Admin:** Use any email with "admin" in it (e.g., admin@test.com)
- **User:** Use any other email

## Required Assets

Place these files in `/public/assets/`:

### Images (`/images/`)
- mylogo.png

### Icons (`/icons/`)
- arrowicon.png
- arrowpointicon.png
- busicon.png
- calendar.png
- checkgicon.png
- deleteicon.png
- editicon.png
- QRicon.png
- searchicon.png
- gcashlog.png

## Development

### Adding New Pages

1. Create a new folder in `app/` directory
2. Add `page.tsx` for the route component
3. Add `[name].module.css` for styles
4. Update navigation in `Sidebar.tsx` if needed

### State Management

Currently using:
- `sessionStorage` for temporary booking data
- Client-side state with React hooks

For production, consider:
- Context API for global state
- SWR or React Query for data fetching
- Backend API integration

## Customization

### Colors

Edit CSS variables in `styles/globals.css`:
\`\`\`css
:root {
  --primary-blue: #2563eb;
  --dark-blue: #1e40af;
  --light-blue: #dbeafe;
  --bg-gray: #e5e7eb;
  --text-dark: #1f2937;
  --text-gray: #6b7280;
}
\`\`\`

### Font

The system uses Intel One Mono. To change:
1. Update the Google Fonts import in `styles/globals.css`
2. Change `font-family` in the body styles

## License

This project is for educational purposes.

## Support

For issues and questions, please create an issue in the repository.
