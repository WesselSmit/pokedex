import { useState } from 'react'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Header from '../components/header'
import Cards from '../components/cards'
import Footer from '../components/footer'
import Head from 'next/head'
import styles from '../styles/pages/home.module.css'


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

  // TODO add loading state
  // TODO add 'load more' button for when the page isn't loading (this is necessary because if you go back to the overview page from a detail page, then you might be at the bottom of the page but since you didn't scroll the IntersectionObserver did not get triggered)
  // TODO add caching for images using a serviceWorker to speed up image load times (check if it's actually faster)

  // TODO clean up JSX template

  return (
    <>
      <Head>
        <title>Browse pokemon | Pokédex</title>
      </Head>

      <Header />

      {/* <Search pokemons={pokemons} setFilteredPokemons={setFilteredPokemons} /> */}

      <main className={styles.list}>
        <Cards pokemons={pokemons} />
        {/* <Cards pokemons={filteredPokemons} /> */}
      </main>

      {/* TODO use element underneath for a loading state */}
      <div ref={setTargetElement}>TARGET</div>

      <Footer />
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