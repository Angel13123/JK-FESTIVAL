
"use client";

import type { Metadata } from 'next';
import { Poppins, PT_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AudioPlayer } from '@/components/shared/AudioPlayer';
import { LiveSalesNotification } from '@/components/shared/LiveSalesNotification';
import { usePathname } from 'next/navigation';

const fontHeadline = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-headline',
});

const fontBody = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin') || pathname === '/scan';

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        {/* The 'metadata' object is preferred for metadata, but for fonts,
            direct link tags are often used as shown. You could also explore
            next/font for a more integrated approach. */}
        <title>JK Festival</title>
        <meta name="description" content="La web oficial del JK Festival de música urbana en Martil, Marruecos." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="JK Festival Admin" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontHeadline.variable,
          fontBody.variable
        )}
      >
        <FirebaseClientProvider>
          <CartProvider>
            {children}
            <Toaster />
            {!isAdminRoute && (
              <>
                <AudioPlayer />
                <LiveSalesNotification />
              </>
            )}
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
