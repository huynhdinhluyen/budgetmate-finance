import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#004AAD',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "BudgetMate - Smart Budget Management Made Simple",
  description: "Track expenses, set goals, and build healthy financial habits with your community. Save Money, Share The Journey.",
  keywords: "budget, finance, expense tracking, money management, personal finance",
  authors: [{ name: "BudgetMate Team" }],
  icons: {
    icon: '/budgetmate_logo.jpg',
    apple: '/budgetmate_logo.jpg',
  },
  openGraph: {
    title: "BudgetMate - Smart Budget Management Made Simple",
    description: "Track expenses, set goals, and build healthy financial habits with your community. Save Money, Share The Journey.",
    images: ['/budgetmate_cover.png'],
    type: 'website',
    siteName: 'BudgetMate',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BudgetMate - Smart Budget Management Made Simple",
    description: "Track expenses, set goals, and build healthy financial habits with your community. Save Money, Share The Journey.",
    images: ['/budgetmate_cover.png'],
    creator: '@BudgetMate',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <div id="__next" suppressHydrationWarning>
          {children}
        </div>
      </body>
    </html>
  );
}