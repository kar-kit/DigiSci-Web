import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "DigiSci Consulting — AI for Regulated Manufacturing",
  description:
    "AI-first boutique consultancy at the intersection of cell & gene therapy manufacturing, pharmaceutical operations, and artificial intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
