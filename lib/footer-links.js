export const socialIcons = {
  github: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`,
  npm: `<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="currentColor" d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z"/></svg>`,
  mail: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1.5" y="3.5" width="13" height="9" rx="1.5"/><path d="m2 4.5 6 4.5 6-4.5"/></svg>`
}

export const docsPrimaryColumn = {
  title: 'Documentation',
  links: [
    { label: 'Introduction', href: '/docs' },
    { label: 'Installation', href: '/docs/installation' },
    { label: 'Quick Start', href: '/docs/quick-start' },
    { label: 'CLI Reference', href: '/docs/cli-reference' }
  ]
}

export const sharedFooterColumns = [
  {
    title: 'Guides',
    links: [
      { label: 'Authentication', href: '/docs/authentication/login-sessions' },
      { label: 'Visual Diffing', href: '/docs/visual-comparison/diff' },
      { label: 'CI/CD', href: '/docs/automation/ci-cd' },
      { label: 'Recipes', href: '/docs/recipes' }
    ]
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub Repo', href: 'https://github.com/nforshifu234dev/shotsweep', iconKey: 'github' },
      { label: 'Report a Bug', href: 'https://github.com/nforshifu234dev/nfsfu234-shotsweep/issues/new' },
      { label: 'npm Package', href: 'https://www.npmjs.com/package/@nfsfu234/shotsweep', iconKey: 'npm' },
      { label: 'Changelog', href: '/docs/changelog' }
    ]
  },
  {
    title: 'NFORSHIFU234 Dev',
    accent: true,
    links: [
      { label: 'nforshifu234dev.com', href: 'https://nforshifu234dev.com' },
      { label: 'form-validation', href: 'https://form-validation.nforshifu234dev.com' },
      { label: 'tour-guide', href: 'https://tour-guide.nforshifu234dev.com' },
      { label: 'healthhub', href: 'https://healthhub.nforshifu234dev.com' },
      { label: 'WishIT', href: 'https://wish-it.app' },
      { label: 'IAMNOTSHIFU', href: 'https://iamnotshifu.com' }
    ]
  }
]

export const ecosystemLinks = sharedFooterColumns.find(c => c.title === 'NFORSHIFU234 Dev').links