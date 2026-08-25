export function buildOrganizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NFORSHIFU234 Dev',
    url: 'https://nforshifu234dev.com',
    logo: 'https://shotsweep.nforshifu234dev.com/shotsweep-mark.svg',
    sameAs: [
      'https://github.com/nforshifu234dev'
    ]
  }
}

export function buildSoftwareApplicationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NFSFU234 ShotSweep',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Linux, Windows',
    description:
      'A developer-first CLI for automated website screenshots, authenticated pages, sectioned captures, visual diffs, and AI-ready capture workflows.',
    softwareVersion: '0.1.0',
    license: 'https://github.com/nforshifu234dev/shotsweep/blob/main/LICENSE',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    url: 'https://shotsweep.nforshifu234dev.com',
    downloadUrl: 'https://www.npmjs.com/package/@nfsfu234/shotsweep'
  }
}
