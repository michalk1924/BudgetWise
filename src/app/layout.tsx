"use client";

import "./globals.css";
import { Header } from "./components/index";
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from "./components/Footer/Footer";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, getTokenExpiry } from '../services/cookies';

const queryClient = new QueryClient();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  const pathname = usePathname();
  const hideHeaderFooter = pathname === '/login' || pathname === '/signup' || pathname === '/forgotpassword' || pathname === '/home-page';

  useEffect(() => {
    if (pathname === '/') {
      const token = getToken();
      const expiry = getTokenExpiry();

      if (token && expiry && Date.now() < expiry) {
        router.push('/home');
      }
      else {
        router.push('/home-page');
      }
    }

  }, [pathname, router]);


  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {!hideHeaderFooter && <Header />}
          {children}
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  )
}
