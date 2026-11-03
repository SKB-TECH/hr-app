import type { Metadata } from "next";
import { Roboto, Ubuntu } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import { JobProvider } from "@/src/context/JobContext";
import { QueryProvider } from "@/core/providers/query-provider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: {
    default: "Fast2Hire — Executive Recruitment & Global Talent Platform",
    template: "%s | Fast2Hire",
  },
  description:
    "Fast2Hire connects executive talent with leading global companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${ubuntu.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <QueryProvider>
          <AppProvider>
            <JobProvider>{children}</JobProvider>
          </AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

