
"use client";

import React from 'react';
import { Titan_One, Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { usePathname } from 'next/navigation';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const fontHeadline = Titan_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-headline',
  display: 'swap',
});

const fontBody = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800'],
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
  const isHomePage = pathname === '/';

  const showPublicNav = !isAdminRoute && !isMobileApp;

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <title>JK Festival</title>
        <meta name="description" content="La web oficial del JK Festival de música urbana en Martil, Marruecos." />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-512x512.png" />
        <meta name="application-name" content="JK Festival"/>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="JK Festival" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
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
