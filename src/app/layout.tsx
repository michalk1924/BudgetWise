"use client";

import "./globals.css";
import { Header } from "./components/index";
import { usePathname } from 'next/navigation';

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
        {!hideHeader && <Header />}
        {children}
      </body>
    </html>
  );
}
