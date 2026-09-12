import type { Metadata } from "next";
import { Chakra_Petch, IBM_Plex_Sans, IBM_Plex_Mono, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

const chakra = Chakra_Petch({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-chakra" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });
const kufi = Noto_Kufi_Arabic({ subsets: ["arabic"], weight: ["300", "400", "600", "700"], variable: "--font-kufi" });

export const metadata: Metadata = {
  title: "Wheels Automotive — Heliopolis, Cairo",
  description:
    "Two move the body, four move the soul. Mercedes-Benz, BMW, Porsche, Land Rover, Jaguar and CUPRA at 46 El-Thawra Street, Heliopolis.",
  metadataBase: new URL("https://wheels-automotive-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "Wheels Automotive",
    description: "Drive the change — Heliopolis, Cairo.",
    images: ["/media/car-11.jpg"],
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#0d0f12" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the site ships its own AR/EN copy, so browser
    // auto-translation would only garble hand-written bilingual text.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${chakra.variable} ${plex.variable} ${plexMono.variable} ${kufi.variable}`}
    >
      <body className="bg-graphite text-white-hot antialiased">
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
