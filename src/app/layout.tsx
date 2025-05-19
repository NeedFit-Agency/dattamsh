'use client';

import { Nunito } from "next/font/google"; 
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from '@/components/layout/Header/Header'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
config.autoAddCss = false 

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800", "900"] }); 


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isQuizPage = pathname?.startsWith('/quiz');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <html lang="en">
      <body className={nunito.className}>
        {isMobile && (
          <div className="mobile-block-overlay">
            <div className="mobile-block-content">
              <div style={{ width: '100%', maxWidth: 400, height: 200 }}>
                <iframe 
                  src="https://my.spline.design/genkubgreetingrobot-g9XhUJ4JKrYmgSia0lfFllkT/" 
                  width="100%" 
                  height="100%" 
                  style={{ display: 'block', width: '100%', height: '100%', border: 'none', background: 'transparent' }}
                  allowFullScreen
                  title="robot"
                ></iframe>
              </div>
              <h2 style={{ marginTop: '2rem', color: '#1AA2FF', fontWeight: 900, fontSize: '2rem', textAlign: 'center' }}>Coming soon on mobile!<br/>Please check on a laptop or desktop.</h2>
            </div>
          </div>
        )}
        {!isMobile && !isQuizPage && <Header />}
        {!isMobile && children}
      </body>
    </html>
  );
}
