import type { Metadata, Viewport } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const displayFont = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;
const title = "Lara Pacheco de Figueiredo | Advogadas de Empresa";
const description = "Advocacia trabalhista e empresarial em João Monlevade, MG. Consultoria preventiva e atuação contenciosa com Lara Pacheco de Figueiredo e Danila Guimarães.";
const shareImage = "/Emblema%20Dourado%20de%20Justi%C3%A7a%20Empresarial.png";

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title,
  description,
  keywords: ["Lara Pacheco de Figueiredo", "Danila Guimarães", "Advogadas de Empresa", "advocacia empresarial em João Monlevade", "direito trabalhista", "consultoria jurídica para empresas"],
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    siteName: "Advogadas de Empresa",
    type: "website",
    images: metadataBase ? [{ url: shareImage, width: 1774, height: 887, alt: "Advogadas de Empresa — Consultoria jurídica para empresas" }] : undefined,
  },
  twitter: {
    card: metadataBase ? "summary_large_image" : "summary",
    title,
    description,
    ...(metadataBase ? { images: [shareImage] } : {}),
  },
};
export const viewport: Viewport = { themeColor: "#171714" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={bodyFont.variable + " " + displayFont.variable}>
      <body className="min-h-screen bg-ivory font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
