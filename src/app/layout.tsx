import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | SquadCP",
    default: "SquadCP | Train Competitive Programming Together",
  },
  description: "Level up your competitive programming skills with friends. Compete in private Codeforces mashups, track your live rating, and climb the leaderboard together.",
  keywords: ["competitive programming", "codeforces", "mashups", "coding contests", "programming practice"],
  authors: [{ name: "SquadCP" }],
  openGraph: {
    title: "SquadCP | Train Competitive Programming Together",
    description: "Level up your competitive programming skills with friends. Compete in private Codeforces mashups and track your live rating.",
    siteName: "SquadCP",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "SquadCP Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SquadCP | Train Competitive Programming Together",
    description: "Level up your competitive programming skills with friends.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
