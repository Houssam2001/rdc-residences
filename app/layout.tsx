import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
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
      className={`${roboto.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-black text-white selection:bg-white selection:text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
