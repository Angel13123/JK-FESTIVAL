
"use client";

import React from 'react';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { usePathname } from 'next/navigation';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const fontHeadline = Inter({
  subsets: ['latin'],
  variable: '--font-headline', // Reusing this var name for ease, or change to --font-inter
  display: 'swap',
});

const fontBody = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'], // Adjusted weights
  variable: '--font-body',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin') || pathname === '/scan';
  const isMobileApp = pathname.startsWith('/mobileapp');
  // Nexus UI overrides standard nav on root
  const showPublicNav = !isAdminRoute && !isMobileApp && pathname !== '/';

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <title>Golden Epiphany | Thermodynamics</title> {/* Updated Title */}
        <meta name="description" content="The Golden Nexus - Advanced Thermodynamics Environment" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-512x512.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-deep-black text-white font-sans antialiased selection:bg-electric-blue selection:text-white",
          fontHeadline.variable,
          fontBody.variable
        )}
      >
        <FirebaseClientProvider>
          {isMobileApp ? (
            <AppProvider>
              {children}
            </AppProvider>
          ) : (
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                {showPublicNav && <Navbar />}
                <main className="flex-1">{children}</main>
                {showPublicNav && <Footer />}
              </div>
            </CartProvider>
          )}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
