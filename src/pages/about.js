import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from '../styles/pages/about.module.css'


export default function About() {
  return (
    <>
      <Head>
        <title>About - Pokédex</title>
      </Head>

      <Header />

      <main className={styles.outer}>
        <div className={styles.inner}>
          <h1 className={styles.title}>About</h1>

          <h2 className={styles.heading}>What is this?</h2>

          <p className={styles.text}>As a developer I think it is important to try out new web technologies and to stay up to date with the industry. That is why this website was made as a project to try out <a href="https://reactjs.org" target="_blank" rel="noreferrer" className={styles.link}>React.js</a>, <a href="https://nextjs.org" target="_blank" rel="noreferrer" className={styles.link}>Next.js</a> and <a href="https://github.com/css-modules/css-modules" target="_blank" rel="noreferrer" className={styles.link}>CSS Modules</a>.</p>

          <h2 className={styles.heading}>Pokémon Data</h2>

          <p className={styles.text}>A lot of pokémon data is required to make sure this website functions. All pokémon related data is from the <a href="https://pokeapi.co" target="_blank" rel="noreferrer" className={styles.link}>PokéAPI</a>. Without it this website would not be possible. All Pokemon data is freely interpreted and may differ from official sources.</p>

          <h2 className={styles.heading}>Affiliation</h2>

          <p className={styles.text}>This website is a fan project. It is in no way affiliated with The Pokémon Company or its subsidiaries.</p>
        </div>
      </main>

      <Footer />
    </>
  )
}