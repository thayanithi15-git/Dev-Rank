import { SearchProvider } from "@/components/searchProvider";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Figtree } from "next/font/google"
import "./globals.css";
import GlobalNotification from "@/components/notify/snackbar";

// Optimize font loading - reduce font weights for better performance
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Reduced from 5 weights to 3
  variable: "--font-figtree",
  display: "swap",
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: "Dev Rank",
  description:
    "AI-Powered Developer Profiling & Ranking Platform",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${figtree.style.fontFamily};
  --font-sans: ${figtree.style.fontFamily};
}
        `}</style>
      </head>
      <body className={`antialiased ${figtree.variable}`}>
        {/* <GlobalNotification /> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchProvider>
            {children}
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}