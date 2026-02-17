import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/config';
import A11yFixes from '@/components/A11yFixes';
import './globals.css';

const iconVersion = '20260212';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Joonit - 개인 블로그',
    template: '%s | Joonit',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name }],
  alternates: {
    canonical: '/',
    languages: {
      'ko-KR': '/',
    },
  },
  icons: {
    icon: [
      { url: `/icon?v=${iconVersion}`, type: 'image/png', sizes: '512x512' },
      { url: `/favicon.ico?v=${iconVersion}` },
    ],
    apple: [{ url: `/apple-icon?v=${iconVersion}`, type: 'image/png', sizes: '180x180' }],
    shortcut: [`/favicon.ico?v=${iconVersion}`],
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: 'Joonit - 개인 블로그',
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joonit - 개인 블로그',
    description: siteConfig.description,
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.title,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: 'ko-KR',
  author: {
    '@type': 'Person',
    name: siteConfig.author.name,
    url: `${siteConfig.url}/about`,
  },
  publisher: {
    '@type': 'Person',
    name: siteConfig.author.name,
    url: `${siteConfig.url}/about`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Joonit RSS"
          href="/feed.xml"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (theme === 'light') {
                  document.documentElement.classList.add('light');
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* Google Analytics (GA4) */}
        {siteConfig.analytics.gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.analytics.gaId}');
                `,
              }}
            />
          </>
        )}
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-9437130351538375" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9437130351538375"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col"
      >
        <A11yFixes />
        <Header />
        <main id="content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
