'use client';

import '../globals.css';

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Just render the children without the Header component
    <>{children}</>
  );
}