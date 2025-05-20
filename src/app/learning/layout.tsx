// layout.tsx
'use client';

// Assuming globals.css is imported in your root layout (app/layout.tsx)
import styles from './learning.module.css'; // Import the CSS module

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