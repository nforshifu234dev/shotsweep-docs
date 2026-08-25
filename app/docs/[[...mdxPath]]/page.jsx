import fs from 'node:fs/promises'
import path from 'node:path'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components.js'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)

  return metadata
}

/**
 * Reads the original MDX/Markdown source for a documentation page.
 *
 * Nextra's page-level actions can use the source to provide
 * "Copy page as Markdown for LLMs" and related functionality.
 */
async function readSourceCode(mdxPath) {
  const segments = mdxPath ?? []

  const base = path.join(process.cwd(), 'content', ...segments)

  const candidates = [
    `${base}.mdx`,
    `${base}.md`,
    path.join(base, 'index.mdx'),
    path.join(base, 'index.md')
  ]

  for (const file of candidates) {
    try {
      return await fs.readFile(file, 'utf8')
    } catch {
      // Try the next possible source file.
    }
  }

  return undefined
}

export default async function Page(props) {
  const params = await props.params

  const {
    default: MDXContent,
    toc,
    metadata
  } = await importPage(params.mdxPath)

  const sourceCode = await readSourceCode(params.mdxPath)

  const Wrapper = getMDXComponents().wrapper

  return (
    <Wrapper
      toc={toc}
      metadata={metadata}
      sourceCode={sourceCode}
    >
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}