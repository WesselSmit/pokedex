import { useState, useEffect } from 'react'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Header from '../components/header'
import Search from '../components/search'
import Cards from '../components/cards'
import Loader from '../components/loader'
import Footer from '../components/footer'
import Head from 'next/head'

// TODO check of het mogelijk is ook de varianten te laten zien (dit zou het onderstaande probleem verhelpen + dan is de pokemon collectie echt compleet met schonere code)
// TODO wanneer users verder dan pokemon 898 en een nieuwe fetch triggeren -> gebruikers zien kort de loading animation en dan meteen weer de 'load more' button maar omdat er geen nieuwe pokemons gefetched worden ziet het er raar uit (miss kan je hier iets op bedenken; bijv. de fetch button/hook weghalen/stoppen als ze op dit punt komen (alle varianten zijn toch altijd als laatste wegens hun index over 10.000))
// TODO voeg een "skip pokemons" button (dit is goed voor accessibility omdat users anders door 898 items moeten tabben) + eventueel extra "skip pokemons" buttons inserten elke keer dat er een nieuwe lading pokemons word gefetched (op deze manier kunnen gebruikers ook halverwege/tijdens de infinite-scroll skippen)
// TODO search function
// TODO add caching for images using a serviceWorker to speed up image load times (check if it's actually faster)
// TODO readme
// TODO favicon (en dergelijke)

export default function Home({ data, next }) {
  const [nextFetchLink, setNextFetchLink] = useState(next)
  const [fetchIndex, setFetchIndex] = useState(0)
  const [pokemons, setPokemons] = useState(data)
  const [isFetching, setIsFetching] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [targetElement, setTargetElement] = useState(null)

  function incrementFetchIndex() {
    setFetchIndex(index => index + 1)
  }

  useEffect(() => {
    if (fetchIndex === 0) return

    getPokemons()
  }, [fetchIndex])

  async function getPokemons() {
    try {
      if (!nextFetchLink) return

      setIsFetching(true)

      const { pokemons: fetchedPokemons, next } = await fetchPokemons(nextFetchLink)

      // add property to identify if pokemon is fetched (../components/cards uses this to preload images above the fold)
      fetchedPokemons.forEach(pokemon => pokemon.isFetched = true)

      // the api contains original pokemons and pokemon 'variants'
      // all 'original' pokemons have an id of lower than 10000
      // all 'variant' pokemons have an id higher than 10000

      // filter out all non original (variant) pokemons
      const originalPokemons = fetchedPokemons.filter(pokemon => pokemon.id < 10000)

      setPokemons(pokemons => [...pokemons, ...originalPokemons])
      setNextFetchLink(next)
      setIsFetching(false)
      setHasError(false)
    } catch (err) {
      setIsFetching(false)
      setHasError(true)
      console.error('Failed to fetch pokémons.', err)
    }
  }

  // initialize infinite scroll (use 'rootMargin: 1000px' to start fetching new data before users see the end of screen)
  useInfiniteScroll(targetElement, incrementFetchIndex, { rootMargin: '10000px' })

  return (
    <>
      <Head>
        <title>Pokédex</title>
      </Head>

      <Header />

      <main>
        <Search />
        <Cards pokemons={pokemons} />
      </main>

      <div ref={setTargetElement}>
        <Loader isLoading={isFetching} hasError={hasError} incrementFetchIndex={incrementFetchIndex} />
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
