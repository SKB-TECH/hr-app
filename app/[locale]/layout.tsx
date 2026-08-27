import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { AppProvider } from "@/context/AppContext";
import { epilogue, clashDisplay, redHat, inter } from "@/lib/fonts";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/core/providers/query-provider";

export const metadata: Metadata = {
  title: "Fast2Hire",
  description: "Recrutez plus vite. Trouvez mieux.",
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
        // suppressHydrationWarning
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
