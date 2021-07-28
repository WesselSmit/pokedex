import { useState } from 'react'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Search from '../components/Search'
import Cards from '../components/Cards'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pages/Home.module.css'


export default function Home({ data, next }) {
  let nextFetchLink = next
  const [pokemons, setPokemons] = useState(data)
  // const [filteredPokemons, setFilteredPokemons] = useState(pokemons)
  const [targetElement, setTargetElement] = useState(null)

  const fetchPokemons = async () => {
    try {
      // stop if all pokemons are already fetched
      if (!nextFetchLink) {
        return 
      }

      // fetch list of next pokemons
      const res = await fetch(nextFetchLink)
      const { results, next } = await res.json()
  
      nextFetchLink = next

      // fetch detailed data for each pokemon
      const fetchedPokemons = await Promise.all(
        results.map(async result => {
          const res = await fetch(result.url)
          return await res.json()
        })
      )

      // the api contains original pokemons and pokemon 'variants'
      // all 'original' pokemons have an id of lower than 10000
      // all 'variant' pokemons have an id higher than 10000 

      // filter out all non original (variant) pokemons
      const originalPokemons = fetchedPokemons.filter(pokemon => pokemon.id < 10000)

      setPokemons(pokemons => [...pokemons, ...originalPokemons])
    } catch (err) {
      console.error('Could not fetch new pokémons: ', err)
    }
  }
  
  // initialize infinite scroll 
  useInfiniteScroll(targetElement, fetchPokemons, { rootMargin: '1000px' })

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
  // fetch list of the first few pokemons
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40')
  const { results, next } = await res.json()

  // fetch detailed data for each pokemon
  const pokemons = await Promise.all(
    results.map(async result => {
      const res = await fetch(result.url)
      return await res.json()
    })
  )

  return {
    props: {
      data: pokemons,
      next
    }
  }
}