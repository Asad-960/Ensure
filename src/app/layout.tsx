import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ensure & Construct | Precision Engineered",
  description: "High-end construction, renovation, and quality works.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-body overflow-x-hidden antialiased`}>
        {children}
      </body>
    </html>
  );
}
