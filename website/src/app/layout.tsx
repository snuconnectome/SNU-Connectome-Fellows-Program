import type { Metadata } from 'next';
import { Inter, Noto_Sans_KR, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-kr',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: {
    default: 'SNU Connectome Fellows Program | 서울대학교 커넥톰 펠로우십',
    template: '%s | SNU Connectome Fellows',
  },
  description: '차세대 신경과학 인재 양성을 위한 서울대학교 커넥톰 펠로우십 프로그램. 인류의 천년 공헌을 위한 Foundation Model 연구 인재를 양성합니다.',
  keywords: [
    'SNU',
    'Seoul National University',
    '서울대학교',
    'neuroscience',
    '신경과학',
    'fellowship',
    '펠로우십',
    'brain research',
    '뇌과학',
    'foundation models',
    'AI',
    'machine learning',
  ],
  authors: [{ name: 'SNU Connectome Lab' }],
  creator: 'SNU Connectome Fellows Program',
  publisher: 'Seoul National University',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://connectome.snu.ac.kr'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://connectome.snu.ac.kr',
    siteName: 'SNU Connectome Fellows Program',
    title: 'SNU Connectome Fellows Program | 서울대학교 커넥톰 펠로우십',
    description: '차세대 신경과학 인재 양성을 위한 서울대학교 커넥톰 펠로우십 프로그램',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SNU Connectome Fellows Program',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SNU Connectome Fellows Program',
    description: '차세대 신경과학 인재 양성을 위한 서울대학교 커넥톰 펠로우십 프로그램',
    images: ['/og-image.png'],
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
  verification: {
    google: 'your-google-verification-code',
    // Add other verification codes as needed
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${notoSansKR.variable} ${outfit.variable}`}
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#667eea" />

        {/* Viewport for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900 selection:bg-brain-primary selection:text-white dark:bg-gray-900 dark:text-gray-100">
        <Providers>
          <div className="min-h-screen flex flex-col">
            {/* Skip navigation links for accessibility */}
            <nav
              className="skip-links sr-only focus-within:not-sr-only fixed top-0 left-0 w-full bg-white dark:bg-gray-900 border-b-2 border-brain-primary z-[9999] p-4"
              aria-label="Skip links"
            >
              <ul className="flex gap-4">
                <li>
                  <a
                    href="#main-navigation"
                    className="bg-brain-primary text-white px-4 py-2 rounded-md hover:bg-brain-secondary focus:outline-none focus:ring-2 focus:ring-brain-accent"
                  >
                    Skip to navigation
                  </a>
                </li>
                <li>
                  <a
                    href="#main-content"
                    className="bg-brain-primary text-white px-4 py-2 rounded-md hover:bg-brain-secondary focus:outline-none focus:ring-2 focus:ring-brain-accent"
                  >
                    Skip to main content
                  </a>
                </li>
                <li>
                  <a
                    href="#footer"
                    className="bg-brain-primary text-white px-4 py-2 rounded-md hover:bg-brain-secondary focus:outline-none focus:ring-2 focus:ring-brain-accent"
                  >
                    Skip to footer
                  </a>
                </li>
              </ul>
            </nav>

            {/* Header */}
            <Header />

            {/* Main Content */}
            <main
              id="main-content"
              className="flex-1"
              role="main"
              aria-label="Main content"
            >
              {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* Live region for screen reader announcements */}
            <div
              id="live-region"
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            />

            {/* Global focus indicator for high contrast mode */}
            <style jsx global>{`
              @media (prefers-contrast: high) {
                :focus {
                  outline: 3px solid currentColor !important;
                  outline-offset: 2px !important;
                }
              }

              @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                  animation-duration: 0.01ms !important;
                  animation-iteration-count: 1 !important;
                  transition-duration: 0.01ms !important;
                  scroll-behavior: auto !important;
                }
              }

              /* Ensure focus is visible in all cases */
              :focus-visible {
                outline: 2px solid #667eea;
                outline-offset: 2px;
              }

              /* High contrast mode adjustments */
              @media (prefers-contrast: high) {
                .high-contrast {
                  filter: contrast(150%);
                }
              }

              /* Large text support */
              .large-text {
                font-size: 120%;
                line-height: 1.6;
              }
            `}</style>
          </div>
        </Providers>

        {/* Analytics and tracking scripts will go here */}
      </body>
    </html>
  );
}