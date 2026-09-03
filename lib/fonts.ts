import localFont from "next/font/local";

export const epilogue = localFont({
  src: "../public/fonts/clash-display/ClashDisplay-Variable.woff2",
  variable: "--font-epilogue",
  display: "swap",
});

export const redHat = localFont({
  src: "../public/fonts/clash-display/ClashDisplay-Variable.woff2",
  variable: "--font-red-hat",
  display: "swap",
});

export const inter = localFont({
  src: "../public/fonts/clash-display/ClashDisplay-Variable.woff2",
  variable: "--font-inter",
  display: "swap",
});

export const clashDisplay = localFont({
  src: [
    {
      path: "../public/fonts/clash-display/ClashDisplay-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});
