import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

declare global {
  interface Window {
    Go: any;
    runicParse: (input: string) => string;
    runicUnmount: () => void;
  }
}

export const metadata: Metadata = {
  title: "Runic",
  description: "Runic markup language",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="wasm_exec.js" async />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
