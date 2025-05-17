'use client';

import type { Metadata } from "next";
import { Nunito } from "next/font/google"; 
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from '@/components/layout/Header/Header'
import { usePathname } from 'next/navigation';
import { Providers } from './providers';
config.autoAddCss = false 

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800", "900"] }); 


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isQuizPage = pathname?.startsWith('/quiz');
  
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          {!isQuizPage && <Header />}
          {children}
        </Providers>
      </body>
    </html>
  );
}
