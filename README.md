# Menu Calculation App

A modern web application for restaurant menu optimization, cost analysis, and profit tracking built with Next.js, TypeScript, Tailwind CSS, Supabase, and Prisma.

## Features

- **Smart Menu Pricing**: AI-powered pricing algorithms to maximize profits
- **Ingredient Management**: Track ingredient costs and manage inventory
- **Recipe Costing**: Automatically calculate recipe costs based on current ingredient prices
- **Profit Analytics**: Detailed insights into profit margins and analytics
- **Menu Optimization**: AI-powered suggestions for menu optimization
- **Real-time Updates**: Instant updates on costs and profits
- **User-friendly Interface**: Intuitive design for restaurant owners and managers

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd menu-calculation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/menu_calculation"
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Next.js
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
menu-calculation/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout with navigation
│   │   ├── page.tsx        # Landing page
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable components
│   ├── lib/               # Utility functions
│   │   ├── prisma.ts      # Prisma client
│   │   └── supabase.ts    # Supabase client
│   └── types/             # TypeScript type definitions
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
└── package.json
```

## Database Schema

The application uses the following main entities:

- **Restaurant**: Restaurant information and settings
- **User**: Restaurant staff with different roles
- **Ingredient**: Raw materials with costs and suppliers
- **Recipe**: Dish recipes with ingredients and instructions
- **MenuItem**: Menu items with pricing
- **CostCalculation**: Profit margin calculations

## Key Features

### Hero Section
- Compelling headline with gradient text
- Clear value proposition
- Call-to-action buttons
- Visual illustration of key features

### Features Overview
- 6 main features with icons
- Responsive grid layout
- Hover effects and animations

### Call-to-Action
- Gradient background
- Multiple CTA options
- Trust indicators (free trial, no credit card)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Database Commands

- `npx prisma studio` - Open Prisma Studio
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@menucalculation.com or create an issue in the repository.
