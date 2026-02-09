import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/config';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Joonit - 개인 블로그',
    template: '%s | Joonit',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name }],
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
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.title,
  url: siteConfig.url,
  description: siteConfig.description,
  author: {
    '@type': 'Person',
    name: siteConfig.author.name,
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
        {/* AdSense: 승인 후 아래 주석 해제하고 환경변수 NEXT_PUBLIC_ADSENSE_ID 설정 */}
        {/* process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        ) */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
