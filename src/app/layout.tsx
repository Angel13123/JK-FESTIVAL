
"use client";

import { Titan_One, Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AudioPlayer } from '@/components/shared/AudioPlayer';
import { LiveSalesNotification } from '@/components/shared/LiveSalesNotification';
import { usePathname } from 'next/navigation';

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

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <title>JK Festival</title>
        <meta name="description" content="La web oficial del JK Festival de música urbana en Martil, Marruecos." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="JK Festival Admin" />
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
                {/* <AudioPlayer />
                <LiveSalesNotification /> */}
              </>
            )}
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
