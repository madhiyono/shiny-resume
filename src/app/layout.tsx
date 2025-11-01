import type { Metadata } from "next";
import { Squada_One, Spline_Sans } from "next/font/google";
import "./globals.css";

const squadaOne = Squada_One({
  variable: "--font-squada-one",
  subsets: ["latin"],
  weight: ["400"],
});

const splineSans = Spline_Sans({
  variable: "--font-spline-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Resume/Portfolio Reviewer",
  description: "Get professional feedback on your resume powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${squadaOne.variable} ${splineSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
