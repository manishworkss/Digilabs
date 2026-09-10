import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// ============================================================
// Font — Inter, self-hosted via next/font for performance
// ============================================================
// next/font automatically self-hosts the font files and handles
// preloading, subset selection, and font-display: swap.
// ============================================================

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
});

// ============================================================
// Metadata — SEO
// ============================================================

export const metadata: Metadata = {
  metadataBase: new URL('https://nova-landing-delta.vercel.app'),
  title: {
    default: "NOVA — Performance Marketing That Compounds",
    template: "%s | NOVA"
  },
  description:
    "NOVA builds, optimizes, and scales paid media systems that turn ad spend into predictable revenue. Stop guessing, start scaling with our performance-driven approach.",
  keywords: ["performance marketing", "paid media", "digital marketing agency", "ROAS", "lead generation", "PPC", "growth marketing"],
  authors: [{ name: "NOVA Performance" }],
  creator: "NOVA Performance",
  openGraph: {
    title: "NOVA — Performance Marketing That Compounds",
    description:
      "NOVA builds, optimizes, and scales paid media systems that turn ad spend into predictable revenue.",
    url: 'https://nova-landing-delta.vercel.app',
    siteName: 'NOVA Performance',
    images: [
      {
        url: '/og-image.jpg', // You can add an actual image here later
        width: 1200,
        height: 630,
        alt: 'NOVA Performance Marketing',
      },
    ],
    locale: 'en_US',
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "NOVA — Performance Marketing That Compounds",
    description: "NOVA builds, optimizes, and scales paid media systems that turn ad spend into predictable revenue.",
    creator: '@novaperformance',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ============================================================
// GTM Container ID (from environment variable)
// ============================================================

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// ============================================================
// Root Layout
// ============================================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable} antialiased`}>
      <head>
        {/* GTM Script — only loads if GTM_ID is configured */}
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-screen bg-nova-black text-nova-white font-sans">
        {/* Skip link for keyboard accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}

        {children}
      </body>
    </html>
  );
}
