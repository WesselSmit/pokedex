import { useState } from 'react'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Header from '../components/header'
import Cards from '../components/cards'
import Loader from '../components/loader'
import Footer from '../components/footer'
import Head from 'next/head'
import styles from '../styles/pages/home.module.css'

// TODO gebruik catch/try in fetchPokemons() + check of de catch/try in getPokemons() goed werkt + handle error state in UI
// TODO add caching for images using a serviceWorker to speed up image load times (check if it's actually faster)
// TODO 404 page maken


export default function Home({ data, next }) {
  let nextFetchLink = next
  const [pokemons, setPokemons] = useState(data)
  const [isFetching, setIsFetching] = useState(false)
  const [targetElement, setTargetElement] = useState(null)

  /*
    TODO
    De huidige website werkt op 1 ding na:
    Wanneer de rootMargin op 100000px staat (een afstand die de gebruiker niet kan scrollen) krijgt de gebruiker een 'load more' button te zien.
    
    Het fetchen van de nieuwe pokemons gaat echter niet goed wanneer de gebruiker op de 'load more' button klikt; de eerste keer gaat het goed en worden pokemons 40-80 gefetched + displayed. Als de gebruiker dan weer naar beneden scrollt en op de button klikt dan worden OPNIEUW pokemons 40-80 gefetched. 
    
    De nextFetchLink update dus niet goed met de 'load more' button maar werkt wel goed met de infinite scroll.

    Dit is hetzelfde probleem als je al eerder had met state die niet geupdate lijkt te worden, dit heeft te maken met clojures (zie ook https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately).
    Het antwoord betekent is waarschijnlijk iets met useEffect.
  */

  async function getPokemons() {
    try {
      // stop if all pokemons are fetched
      if (!nextFetchLink) {
        return 
      }

      setIsFetching(true)

      const { pokemons: fetchedPokemons, next } = await fetchPokemons(nextFetchLink)

      nextFetchLink = next

      // the api contains original pokemons and pokemon 'variants'
      // all 'original' pokemons have an id of lower than 10000
      // all 'variant' pokemons have an id higher than 10000 

      // filter out all non original (variant) pokemons
      const originalPokemons = fetchedPokemons.filter(pokemon => pokemon.id < 10000)

      await setPokemons(pokemons => [...pokemons, ...originalPokemons])
      setIsFetching(false)
    } catch (err) {
      console.error('Could not fetch new pokémons: ', err)
    }
  }
  

  // initialize infinite scroll (use 'rootMargin: 1000px' to start fetching new data before users see the end of screen)
  useInfiniteScroll(targetElement, getPokemons, { rootMargin: '1000px' })

  return (
    <>
      <Head>
        <title>Browse pokemon | Pokédex</title>
      </Head>

      <Header />

      <main className={styles.list}>
        <Cards pokemons={pokemons} />
      </main>

      <div ref={setTargetElement}>
        <Loader isLoading={isFetching} getPokemons={getPokemons} />
      </div>

      <Footer />
    </>
  )
}


async function fetchPokemons(url = 'https://pokeapi.co/api/v2/pokemon?limit=40') {
  // fetch list of the first few pokemons
  const res = await fetch(url)
  const { results, next } = await res.json()

  // 2 API endpoints are needed to get all required data of a single pokemon ('/pokemon/:id' & '/pokemon-species/:id')
  const pokemons = await Promise.all(
    results.map(async result => {
      // fetch basic pokemon data
      const pokemonRes = await fetch(result.url)
      const pokemonData = await pokemonRes.json()

      // fetch pokemon species data
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

  return { pokemons, next }
}


export async function getStaticProps() {
  const { pokemons, next } = await fetchPokemons()

  return {
    props: {
      data: pokemons,
      next
    },
    // regenerate static page every 24 hours (60 seconds x 60 minutes x 24 hours = 86400 seconds)
    revalidate: 86400 
  }
}