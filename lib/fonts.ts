import { Epilogue, Red_Hat_Display, Inter } from "next/font/google";
import localFont from "next/font/local";

export const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const redHat = Red_Hat_Display({
  variable: "--font-red-hat",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const clashDisplay = localFont({
  src: [
    {
      path: "../public/fonts/clash-display/ClashDisplay-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
});
