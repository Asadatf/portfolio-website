import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata = {
  title: "Asad | Full Stack Developer",
  description:
    "Personal portfolio showcasing my projects, skills, and experience as a Full Stack Developer and AI Enthusiast",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      {/* Navbar is already fixed at bottom in your Navbar component */}
      <body className="flex flex-col min-h-screen">
        {/* Remove bg-gray-50 dark:bg-gray-900 as we're using the gradient from globals.css */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Main content area with proper spacing for the fixed navbar */}
          <Navbar />
          <main className="flex-grow pt-4 pb-24">{children}</main>

          {/* Footer with lower z-index so navbar appears above it */}
          <div className="z-0">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
