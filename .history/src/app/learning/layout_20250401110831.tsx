'use client';

import '../globals.css';
import styles from './learning.module.css';  // Import CSS as a module

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.learningLayout}>
      {children}
    </div>
  );
}