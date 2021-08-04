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

      // fetch detailed data for each pokemon (2 endpoints required: '/pokemon/:id' and '/pokemon-species/:id')
      // the '/pokemon-species/:id' url is included in the '/pokemon/:id' data
      const fetchedPokemons = await Promise.all(
        results.map(async result => {
          const pokemonRes = await fetch(result.url)
          const pokemonData = await pokemonRes.json()
          const pokemonSpeciesRes = await fetch(pokemonData.species.url)
          const pokemonSpeciesData = await pokemonSpeciesRes.json()

          // both pokemonData and pokemonSpeciesData contain an id
          // all id's in pokemonData are unique, even 'variant' pokemons have an unique id (10000+)
          // the pokemonSpeciesData id's are always the id's of the 'original' pokemon, even if the pokemon is a 'variant' (0 - 10000)
          // the is always needs to be unique due to it being used to filter out pokemon 'variants'

          // get rid of 'id' in pokemonSpeciesData
          delete pokemonSpeciesData.id

          return {...pokemonData, ...pokemonSpeciesData}
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

  // TODO refactor de dubbele fetch logica in een losse function (meer DRY)

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

  // fetch detailed data for each pokemon (2 endpoints required: '/pokemon/:id' and '/pokemon-species/:id')
  // the '/pokemon-species/:id' url is included in the '/pokemon/:id' data
  const pokemons = await Promise.all(
    results.map(async result => {
      const pokemonRes = await fetch(result.url)
      const pokemonData = await pokemonRes.json()
      const pokemonSpeciesRes = await fetch(pokemonData.species.url)
      const pokemonSpeciesData = await pokemonSpeciesRes.json()

      // both pokemonData and pokemonSpeciesData contain an id
      // all id's in pokemonData are unique, even 'variant' pokemons have an unique id (10000+)
      // the pokemonSpeciesData id's are always the id's of the 'original' pokemon, even if the pokemon is a 'variant' (0 - 10000)
      // the is always needs to be unique due to it being used to filter out pokemon 'variants'

      // get rid of 'id' in pokemonSpeciesData
      delete pokemonSpeciesData.id

      return {...pokemonData, ...pokemonSpeciesData}
    })
  )

  return {
    props: {
      data: pokemons,
      next
    },
    // regenerate static page every 24 hours (60 seconds x 60 minutes x 24 hours = 86400 seconds)
    revalidate: 86400 
  }
}