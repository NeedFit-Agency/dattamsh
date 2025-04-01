'use client';

import '../globals.css';
import './learning.module.css';  // Keep this for any global learning styles

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="learning-layout">
      {children}
    </div>
  );
}