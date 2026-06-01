import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-background text-body overflow-x-hidden antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
