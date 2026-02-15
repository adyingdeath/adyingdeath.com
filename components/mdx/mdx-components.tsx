import localFont from 'next/font/local'

const mapleMono = localFont({
  src: './MapleMono-Regular.ttf',
  display: 'swap',
  variable: '--maplemono',
})

export const mdxComponents = {
  code: ({ children }: { children: React.ReactNode }) => (
    <code className={mapleMono.className}>{children}</code>
  ),
}
