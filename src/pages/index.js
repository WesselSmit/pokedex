import { useState, useEffect } from 'react'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Header from '../components/Header'
import Search from '../components/Search'
import Cards from '../components/Cards'
import Loader from '../components/Loader'
import Footer from '../components/Footer'
import Head from 'next/head'
import { fetchDetailsForPokemons, filterVariants } from '../utils/pokemons'

// TODO check of het mogelijk is ook de varianten te laten zien (dit zou het onderstaande probleem verhelpen + dan is de pokemon collectie echt compleet met schonere code)
// TODO wanneer users verder dan pokemon 898 en een nieuwe fetch triggeren -> gebruikers zien kort de loading animation en dan meteen weer de 'load more' button maar omdat er geen nieuwe pokemons gefetched worden ziet het er raar uit (miss kan je hier iets op bedenken; bijv. de fetch button/hook weghalen/stoppen als ze op dit punt komen (alle varianten zijn toch altijd als laatste wegens hun index over 10.000))
// TODO als alle pokemons gefetched zijn dan blijft de 'load more' button staan --> deze moet verstopt zijn als er geen NextFetchURL is
// TODO voeg een "skip pokemons" button (dit is goed voor accessibility omdat users anders door 898 items moeten tabben) + eventueel extra "skip pokemons" buttons inserten elke keer dat er een nieuwe lading pokemons word gefetched (op deze manier kunnen gebruikers ook halverwege/tijdens de infinite-scroll skippen)
// TODO search function
// TODO custom scrollbar
// TODO add caching for images using a serviceWorker to speed up image load times (check if it's actually faster)
// TODO readme
// TODO favicon (en dergelijke)

const defaultFetchURL = 'https://pokeapi.co/api/v2/pokemon?limit='


export default function Home({ pokemonList, initialPokemons, next }) {
  const [nextFetchURL, setNextFetchURL] = useState(next)
  const [fetchIndex, setFetchIndex] = useState(0)
  const [pokemons, setPokemons] = useState(initialPokemons)
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons)
  const [isFetching, setIsFetching] = useState(false)
  const [isError, setIsError] = useState(false)
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
      if (!nextFetchURL) return

      setIsFetching(true)

      const { pokemons: fetchedPokemons, next } = await fetchPokemons(nextFetchURL)

      // add property to identify if pokemon is fetched (../components/cards uses this to preload images above the fold)
      fetchedPokemons.forEach(pokemon => pokemon.isFetched = true)

      // filter out all 'variant' pokemons
      const originalPokemons = filterVariants(fetchedPokemons)

      setPokemons(pokemons => [...pokemons, ...originalPokemons])
      setNextFetchURL(next)
      setIsFetching(false)
      setIsError(false)
    } catch (err) {
      setIsFetching(false)
      setIsError(true)
      console.error('Failed to fetch pokémons.', err)
    }
  }

  // initialize infinite scroll (use 'rootMargin: 1000px' to start fetching new data before users see the end of screen)
  useInfiniteScroll(targetElement, incrementFetchIndex, { rootMargin: '1000px' })

  return (
    <>
      <Head>
        <title>Pokédex</title>
      </Head>

      <Header />

      <main>
        <Search pokemons={pokemonList} setFilteredPokemons={setFilteredPokemons} />
        <Cards pokemons={filteredPokemons} />
      </main>

      <div ref={setTargetElement}>
        <Loader isLoading={isFetching} isError={isError} incrementFetchIndex={incrementFetchIndex} />
      </div>

      <Footer />
    </>
  )
}


async function fetchPokemons(url = defaultFetchURL + 40) {
  // fetch list of the first few pokemons
  const res = await fetch(url)
  const { results, next, count } = await res.json()

  const pokemons = await fetchDetailsForPokemons(results)

  return { pokemons, next, count }
}


export async function getStaticProps() {
  const { count, pokemons, next } = await fetchPokemons()

  const res = await fetch(defaultFetchURL + count)
  const { results: pokemonList } = await res.json()

  // assign each pokemon their id
  // use the 'pokemon.url' instead of forEach index because the api gives pokemon 'variants' an index of 10000+
  pokemonList.forEach(pokemon => {
    // get pokemon id from url
    const URLParts = pokemon.url.split('/')
    const id = URLParts[URLParts.length - 2]
    pokemon.id = id
  })

  return {
    props: {
      pokemonList,
      initialPokemons: pokemons,
      next
    },
    // regenerate static page every 24 hours (60 seconds x 60 minutes x 24 hours = 86400 seconds)
    revalidate: 86400
  }
}
