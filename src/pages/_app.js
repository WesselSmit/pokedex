import Head from 'next/head'
import '../styles/global/reset.css'
import '../styles/global/variables.css'
import '../styles/global/base.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <Component {...pageProps} />
    </>    
  )
}