// layout.tsx
'use client';

// Ensure globals.css is imported, typically in the root layout
// import '../globals.css'; // Adjust path if needed

import styles from './learning.module.css'; // Import CSS module for this specific layout/page

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Apply the specific layout style to the container wrapping the page content
    <div className={styles.learningLayout}>
      {children}
    </div>
  );
}