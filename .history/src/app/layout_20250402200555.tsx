'use client';

import type { Metadata } from "next";
import { Nunito } from "next/font/google"; 
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from '@/app/components/layout/Header/Header'
import { usePathname } from 'next/navigation';
config.autoAddCss = false 

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800", "900"] }); 

export const metadata: Metadata = {
  title: "Dattamsh",
  description: "Learning languages is fun!",
};

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
        {!isQuizPage && <Header />}
        {children}
      </body>
    </html>
  );
}
