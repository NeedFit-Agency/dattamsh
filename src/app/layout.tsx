import type { Metadata } from "next";
import { Nunito } from "next/font/google"; // Import Nunito
import "./globals.css";

// Font Awesome configuration (optional, can be done per-component)
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false // Prevent Font Awesome from adding CSS automatically

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800", "900"] }); // Load weights used

export const metadata: Metadata = {
  title: "Duolingo Clone",
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
        {children}
      </body>
    </html>
  );
}
