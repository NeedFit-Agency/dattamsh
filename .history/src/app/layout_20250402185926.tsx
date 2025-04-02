import type { Metadata } from "next";
import { Nunito } from "next/font/google"; 
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from '@/app/components/layout/Header/Header'
config.autoAddCss = false 

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800", "900"] }); 

export const metadata: Metadata = {
  title: "Dattamsh",
  description: "Learning languages is fun!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {/* The Header component will be present for all routes EXCEPT /quiz/* */}
        {/* The children (which includes quiz pages with their own layout) will be rendered */}
        {children}
      </body>
    </html>
  );
}
