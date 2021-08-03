import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from '../styles/pages/about.module.css'


export default function About() {
  return (
    <>
      <Head>
        <title>About | Pokédex</title>
      </Head>

      <Header />

      <Footer />
    </>
  )
}