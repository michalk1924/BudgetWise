"use client";

import "./globals.css";
import { Header } from "./components/index";
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from "./components/Footer/Footer";

const queryClient = new QueryClient();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideHeader = pathname === '/login' || pathname === '/signup';

  return (
    <html lang="en">
      <body>
      <QueryClientProvider client={queryClient}>
        {!hideHeader && <Header />}
        {children}
        <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
