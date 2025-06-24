'use client';
import React, { useEffect, useState } from 'react';
import styles from './MobileBlocker.module.css';

const MOBILE_WIDTH = 768;

function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
  // Basic mobile detection
  const result = (
    window.innerWidth < MOBILE_WIDTH ||
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
  );
  console.log('[MobileBlocker] isMobileDevice:', result, 'width:', window.innerWidth, 'ua:', ua);
  return result;
}

const MobileBlocker = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(isMobileDevice());
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <main className={styles['mobile-blocker']} role="dialog" aria-modal="true" tabIndex={-1}>
      <section className={styles['mobile-blocker__content']}>
        <h1 className={styles['mobile-blocker__title']}>Coming soon on mobile</h1>
        <p className={styles['mobile-blocker__message']}>
          This site is not available on mobile devices yet. Please use a desktop browser for the best experience.
        </p>
      </section>
    </main>
  );
};

export default MobileBlocker; 