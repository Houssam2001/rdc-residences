import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RDC | Premium Residences",
  description: "Experience high-end residential living in stunning detail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-white selection:text-black`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
