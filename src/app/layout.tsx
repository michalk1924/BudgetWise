"use client";

import "./globals.css";
import { Header } from "./components/index";
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideHeader = pathname === '/login' || pathname === '/signup';
  const queryClient = new QueryClient();

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
