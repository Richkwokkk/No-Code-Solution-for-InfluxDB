import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const firaCode = localFont({
  src: "../public/fonts/fira-code.ttf",
  variable: "--font-fira-code",
});
