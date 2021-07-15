import { useState, useRef, useEffect } from 'react'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Search from '../components/Search'
import Cards from '../components/Cards'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pages/Home.module.css'


export default function Home({ data }) {
  let { next } = data

  const [pokemons, setPokemons] = useState(data.results)
  // const [filteredPokemons, setFilteredPokemons] = useState(pokemons)

  const [targetElement, setTargetElement] = useState(null)

  const fetchImages = async () => {
    // TODO: check of er nog genoeg pokemons zijn om op te uit de API (als alle pokemons opgehaald zijn moet er een early return zijn)
    try {
      const res = await fetch(next)
      const data = await res.json()
  
      next = data.next
  
      setPokemons((pokemons) => [...pokemons, ...data.results])
    } catch (err) {
      console.log('Could not fetch new pokémons: ', err)
    }
  }

  useInfiniteScroll(targetElement, fetchImages, { rootMargin: '1000px' })
  
  return (
    <>
      <Head>
        <title>Browse pokemon | Pokédex</title>
      </Head>

      <div style={{position:'fixed',top:'100px',zIndex:10000,background:'orange'}}>number of pokemons: {pokemons.length}</div>

      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="Pokédex logo" width={434} height={156} />
        </div>

        {/* <Search pokemons={pokemons} setFilteredPokemons={setFilteredPokemons} /> */}
      </header>

      <main className={styles.list}>
        <Cards pokemons={pokemons} />
        {/* <Cards pokemons={filteredPokemons} /> */}
      </main>

      <div ref={setTargetElement}>TARGET</div>
    </>
  )
}


export async function getStaticProps() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}