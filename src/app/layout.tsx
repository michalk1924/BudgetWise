"use client";

import "./globals.css";
import { Header } from "./components/index";
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../services/cookies';

const queryClient = new QueryClient();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (token) {
      router.push('/home');
    } else {
      router.push('/about');
    }
  }, []);

  const pathname = usePathname();
  const hideHeader = pathname === '/login' || pathname === '/signup';

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {!hideHeader && <Header />}
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
