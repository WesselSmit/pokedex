import { useState } from 'react'
import Search from '../components/Search'
import Cards from '../components/Cards'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pages/Home.module.css'


export default function Home({ pokemons }) {
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons)

  return (
    <>
      <Head>
        <title>Browse pokemon | Pokédex</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="Pokédex logo" width={434} height={156} />
        </div>

        <Search pokemons={pokemons} setFilteredPokemons={setFilteredPokemons} />
      </header>

      <main className={styles.list}>
        <Cards pokemons={filteredPokemons} />
      </main>
    </>
  )
}


export async function getStaticProps() {
  /*
  The '/pokemon' endpoint has 1118 entries.
  Entries 0 - 898 are pokemon with their own (detail) api endpoint.
  Entries 899 - 1118 are 'variants' of the 0 - 898 pokemon entries.
  These 'variants' do not have their own (detail) api endpoints.
  So the fetch excludes all pokemon 'variants' by capping the query limit param to 898. 
  */

  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
  const data = await res.json()

  const pokemons = data.results.map((pokemon, i) => ({
    name: pokemon.name,
    id: i + 1
  }))

  return {
    props: {
      pokemons
    }
  }
}