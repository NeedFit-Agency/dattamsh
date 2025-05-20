'use client';

import { Nunito } from "next/font/google"; 
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from '@/components/layout/Header/Header'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import StudentInfoModal from '@/components/analytics/StudentInfoModal';
import { hasInstitutionalContext } from '@/utils/analyticsService';
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
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);
  // Check if we need to show the student info modal
  useEffect(() => {
    // Skip on landing page
    if (pathname === '/landing') {
      setModalLoading(false);
      return;
    }
    
    // Check if we already have the institutional context
    const hasContext = hasInstitutionalContext();
    setShowInfoModal(!hasContext);
    setModalLoading(false);
  }, [pathname]);  // Track user visit when app loads
  useEffect(() => {
    // Use dynamic import to avoid SSR issues
    Promise.all([
      import('@/utils/analyticsService'),
      import('@/utils/sessionUtils')
    ]).then(([
      { default: AnalyticsService },
      { initializeSession }
    ]) => {
      // Initialize session if we have institutional context
      initializeSession();
      
      // Track unique user visit (regardless of session)
      AnalyticsService.trackUserVisit();
    });
      // Track session end when user leaves
    const handleBeforeUnload = () => {
      Promise.all([
        import('@/utils/analyticsService'),
        import('@/utils/sessionUtils')
      ]).then(([
        { default: AnalyticsService },
        { getSessionTimeSpent }
      ]) => {
        // Use our utility to calculate time spent
        const timeSpentMs = getSessionTimeSpent();
        if (timeSpentMs > 0) {
          console.log('Session ended, time spent:', timeSpentMs, 'ms');
          AnalyticsService.trackSessionEnd(timeSpentMs);
        } else {
          AnalyticsService.trackSessionEnd(0);
        }
      });
    };
    
    // Add event listener for page unload
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);  return (
    <html lang="en">
      <body className={nunito.className}>
        <AnalyticsProvider>
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
          {!isMobile && (
            <>
              {/* Display the student info modal when needed */}
              {!modalLoading && showInfoModal && (
                <StudentInfoModal onComplete={() => setShowInfoModal(false)} />
              )}
              {children}
            </>
          )}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
