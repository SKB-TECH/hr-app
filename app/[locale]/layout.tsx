import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { AppProvider } from "@/context/AppContext";
import { epilogue, clashDisplay, redHat, inter } from "@/lib/fonts";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/core/providers/query-provider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://fast2hire.com"),
  title: {
    default: "Fast2Hire — Executive Recruitment & Global Talent Platform",
    template: "%s | Fast2Hire",
  },
  description:
    "Fast2Hire connects executive talent with leading global companies. Hire faster, discover verified executive leadership roles, and accelerate your career.",
  keywords: [
    "executive recruitment",
    "job search",
    "tech jobs",
    "executive search",
    "hire talent",
    "fast2hire",
  ],
  authors: [{ name: "Fast2Hire Inc." }],
  creator: "Fast2Hire",
  publisher: "Fast2Hire",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Fast2Hire — Executive Recruitment & Global Talent Platform",
    description: "Fast2Hire connects executive talent with leading global companies. Hire faster and discover verified executive roles.",
    url: "https://fast2hire.com",
    siteName: "Fast2Hire",
    images: [
      {
        url: "/images/hero2.png",
        width: 1200,
        height: 630,
        alt: "Fast2Hire Executive Search",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast2Hire — Executive Recruitment Platform",
    description: "Connect with verified executive talent and leading global companies.",
    images: ["/images/hero2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo/favicon.jpeg",
    shortcut: "/logo/favicon.jpeg",
    apple: "/logo/favicon.jpeg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${epilogue.variable} ${clashDisplay.variable} ${redHat.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className='min-h-full flex flex-col font-sans'
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <AppProvider>
              {children}
              <Toaster position='top-center' />
            </AppProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
