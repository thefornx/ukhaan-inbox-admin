import type { Metadata } from "next";
import Script from "next/script";
import { Roboto, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "400",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ukhaan inbox",
  description: "Ukhaan inbox admin dashboard",
};

// Sets data-theme and lang on <html> before hydration to avoid a flash of the
// wrong theme/language. Keys must stay in sync with THEME_STORAGE_KEY and
// LANGUAGE_STORAGE_KEY.
const BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t="light";}document.documentElement.setAttribute("data-theme",t);var l=localStorage.getItem("language");if(l!=="en"&&l!=="mn"){l="en";}document.documentElement.setAttribute("lang",l);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-language-boot" strategy="beforeInteractive">
          {BOOT_SCRIPT}
        </Script>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
