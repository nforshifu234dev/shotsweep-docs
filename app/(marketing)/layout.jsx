import { ThemeProvider } from 'next-themes'
import { SiteNav } from './components/SiteNav.jsx'
import { SiteFooterMarketing } from './components/SiteFooterMarketing.jsx'
import { LaunchBanner } from './components/LaunchBanner.jsx'
import '../globals.css'

export const metadata = {
  metadataBase: new URL('https://shotsweep.nforshifu234dev.com'),
  title: {
    default: 'ShotSweep — Capture. Compare. Inspect. Ship.',
    template: '%s | ShotSweep'
  },
  description:
    'Screenshot any site — single URL, array, CSV, or a whole sitemap — full page or sectioned, with real auth support and visual diffing between runs.',
  keywords: ['screenshot', 'cli', 'playwright', 'visual regression', 'screenshot diff', 'nextra'],
  icons: { icon: '/favicon.svg' },
  openGraph: {
    siteName: 'ShotSweep',
    type: 'website',
    images: [
      {
        url: 'https://shotsweep.nforshifu234dev.com/shotsweep-poster.png',
        width: 1536,
        height: 1024
      }
    ]
  }
}

export default function MarketingLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="land-body" style={{ margin: 0 }}>
        {/* Same defaults nextra-theme-docs uses internally (attribute="class",
            defaultTheme="system", storageKey="theme") — sharing the storage
            key is what keeps marketing pages and /docs in sync. */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
          <LaunchBanner />
          <SiteNav />
          {children}
          <SiteFooterMarketing />
        </ThemeProvider>
      </body>
    </html>
  )
}