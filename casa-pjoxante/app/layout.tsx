import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Casa Pjoxante - Transformando comunidades a través del buen vivir",
  description: "Casa de Estudios, Investigación y Promoción del Buen Vivir Pjoxante A.C. Construyendo un futuro sostenible junto a las comunidades.",
  keywords: "Casa Pjoxante, educación comunitaria, transformación social, desarrollo sostenible, arte comunitario, salud integral",
  authors: [{ name: "Casa Pjoxante" }],
  creator: "Casa Pjoxante",
  openGraph: {
    title: "Casa Pjoxante - Transformando comunidades",
    description: "Construyendo un futuro sostenible junto a las comunidades a través de la educación, investigación y promoción del buen vivir.",
    url: "https://casapjoxante.org",
    siteName: "Casa Pjoxante",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa Pjoxante - Transformando comunidades",
    description: "Construyendo un futuro sostenible junto a las comunidades.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased" style={{ fontFamily: "'Century Gothic', Arial, sans-serif" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
