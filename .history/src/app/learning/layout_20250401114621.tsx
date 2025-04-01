// layout.tsx
'use client';

// Assuming globals.css is imported in your root layout (app/layout.tsx)
// import '../globals.css';

import styles from './learning.module.css'; // Import the CSS module

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This component just applies the base layout class if needed,
  // but most styling is handled by the page and its CSS module.
  return (
    <div className={styles.learningLayout}>
      {children}
    </div>
  );
}