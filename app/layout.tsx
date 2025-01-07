import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["100","200","300","400","500","600","700","800","900"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Truth or dare?",
  description: `Truth or dare? is a party game requiring two or more players. Players are given the choice between answering a question truthfully, or performing a "dare".`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
