import '@/styles/globals.css'
import '@/styles/torsten.css'
import '@/styles/murray.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}