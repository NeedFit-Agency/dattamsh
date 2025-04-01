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
      <body className={nunito.className}> {/* Apply font */}
        <Header />
        {children}
      </body>
    </html>
  );
}
