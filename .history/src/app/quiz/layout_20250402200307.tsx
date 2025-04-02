'use client';

import '../globals.css';
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800", "900"] });

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Return only the children without the Header component
  return (
    <div className={nunito.className}>
      {children}
    </div>
  );
}