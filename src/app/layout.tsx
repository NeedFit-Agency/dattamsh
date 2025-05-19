'use client';

import { Nunito } from "next/font/google"; 
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from '@/components/layout/Header/Header'
import { usePathname } from 'next/navigation';
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
        {!isQuizPage && <Header />}
        {children}
      </body>
    </html>
  );
}
