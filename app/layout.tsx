import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  description: '개발, 기술, 그리고 일상에 대한 이야기를 나누는 개인 블로그입니다.',
  keywords: ['블로그', '개발', '프로그래밍', 'Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'Joonsang' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://joonit.dev',
    siteName: 'Joonit',
    title: 'Joonit - 개인 블로그',
    description: '개발, 기술, 그리고 일상에 대한 이야기를 나누는 개인 블로그입니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joonit - 개인 블로그',
    description: '개발, 기술, 그리고 일상에 대한 이야기를 나누는 개인 블로그입니다.',
  },
  robots: {
    index: true,
    follow: true,
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
