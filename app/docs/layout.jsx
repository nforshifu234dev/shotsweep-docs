import Image from 'next/image'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { SiteFooter } from '../components/SiteFooter.jsx'
import { NavExtraLinks } from '../components/NavExtraLinks.jsx'
import '../globals.css'

export const metadata = {
  metadataBase: new URL('https://shotsweep.nforshifu234dev.com'),
  title: {
    default: 'ShotSweep',
    template: '%s | ShotSweep'
  },
  description:
    'Screenshot any site — full page or sectioned, with real auth support and visual diffing between runs.',
  keywords: ['screenshot', 'cli', 'playwright', 'visual regression', 'screenshot diff'],
  icons: { icon: '/favicon.svg' },
  openGraph: {
    siteName: 'ShotSweep',
    type: 'website',
    images: [
      {
        url: 'https://shotsweep.nforshifu234dev.com/api/og?title=ShotSweep&subtitle=Docs',
        width: 1200,
        height: 630
      }
    ]
  }
}

const banner = (
  <Banner storageKey="launch-announcement">
    🎉 ShotSweep is live! Launched on NFSFU234 Open Source Day.
  </Banner>
)

const navbar = (
  <Navbar
    logo={
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Image src="/shotsweep-mark.svg" alt="" width={32} height={32} priority />
        <span className="land-brand-scope">nfsfu234/</span> shotsweep
      </span>
    }
    projectLink="https://github.com/nforshifu234dev/shotsweep"
  >
    <NavExtraLinks />
  </Navbar>
)

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />

      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={
            <Footer>
              <SiteFooter />
            </Footer>
          }
          search={<Search />}
          sidebar={{
            autoCollapse: true,
            defaultMenuCollapseLevel: 1
          }}
          docsRepositoryBase="https://github.com/nforshifu234dev/shotsweep/tree/main/docs-site"
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}