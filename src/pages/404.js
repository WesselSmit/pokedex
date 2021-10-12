import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'
import styles from '../styles/pages/404.module.css'


export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Pokédex</title>
      </Head>

      <Header />

      <main className={styles.outer}>
        <div className={styles.inner}>
          <h1 className={styles.title}>404</h1>
          <p>This page could not be found.</p>
        </div>
      </main>

      <Footer />
    </>
  )
}
