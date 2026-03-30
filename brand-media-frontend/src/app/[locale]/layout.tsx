import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Noto_Serif } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";
import type { Metadata } from "next";

const locales = ["vi", "en", "ru", "zh", "ar"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "DKFS – Real touch real emotions",
  description: "Brand Media Platform",
};

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Set the request locale for server-side usage
  setRequestLocale(locale);
  
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="scroll-smooth">
      <body className={`${notoSerif.variable} ${inter.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
            {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}