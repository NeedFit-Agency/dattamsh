'use client';

import React from 'react';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import styles from './layout.module.css';

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.appContainer}>
      <div className={styles.mainAreaWrapper}>
        {/* <div className={styles.topBar}>
          <StatsBar streak={1} gems={234} hearts={2} />
        </div> */}
        <div className={styles.scrollableContent}>
          {children}
        </div>
      </div>
    </div>
  );
} 