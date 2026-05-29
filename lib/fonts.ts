import { Epilogue } from "next/font/google";
import localFont from "next/font/local";

export const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
