import { Montserrat, Inter } from "next/font/google";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});
