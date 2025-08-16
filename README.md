# BudgetMate

BudgetMate is a modern Next.js application for smart budget tracking and community-driven financial habit building. The app focuses on simple expense tracking, visual reports, and AI-powered insights to help users save and manage money.

## Features
- Smart expense tracking and automatic categorization
- AI-powered spending analysis and recommendations
- Visual reports and dashboards
- Downloadable Android APK (Download button in UI)
- Responsive, animated UI with glassmorphism styling

## Quick Links
- Main page component: [`Home`](src/app/page.tsx) — [src/app/page.tsx](src/app/page.tsx)  
- Root layout: [`RootLayout`](src/app/layout.tsx) — [src/app/layout.tsx](src/app/layout.tsx)  
- Brand assets: [public/budgetmate_logo.jpg](public/budgetmate_logo.jpg), [public/budgetmate_cover.png](public/budgetmate_cover.png)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

3. Open http://localhost:3000 in your browser.

You can edit the main UI at [`src/app/page.tsx`](src/app/page.tsx) and layout/font settings at [`src/app/layout.tsx`](src/app/layout.tsx).

## Available Scripts
- `dev` — run Next.js in development mode
- `build` — build for production
- `start` — start the production server
- `lint` — run ESLint

See `package.json` for full scripts: [package.json](package.json)

## Project Structure (important files)
- [src/app/page.tsx](src/app/page.tsx) — Home page (client component)
- [src/app/layout.tsx](src/app/layout.tsx) — Root layout, global fonts and metadata
- [src/app/globals.css](src/app/globals.css) — Global styles and custom animations
- [public/] — Static assets and images

## Notes
- The project uses Next.js App Router. Ensure components that use browser-only APIs are client components (`"use client"`).
- If you see hydration warnings in dev, check for runtime differences between server and client renders (e.g., window usage, random values, or dynamic class generation).

## Contributing
- Fork, create a feature branch, and open a pull request.
- Follow existing code styles and run lint/tests
