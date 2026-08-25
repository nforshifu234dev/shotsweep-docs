import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  contentDirBasePath: '/docs'
})

export default withNextra({
  reactStrictMode: false,

  images: {
    unoptimized: true
  }
})