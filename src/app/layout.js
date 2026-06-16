import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "PaperWise — DU Semester PYQ Analyzer",
  description: "Ace your Delhi University (DU) semester exams with structured Past Year Questions (PYQs), filtering by topic/year, and completion tracking analytics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
