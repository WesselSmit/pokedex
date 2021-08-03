import Head from 'next/head'
import Footer from '../components/footer'
import styles from '../styles/pages/about.module.css'


export default function About() {
  return (
    <>
      <Head>
        <title>About | Pokédex</title>
      </Head>

      <h1>About</h1>

      <Footer />
    </>
  )
}