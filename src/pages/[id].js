import Head from 'next/head'
import { displayName } from '../utils/display'
import styles from '../styles/pages/pokemon.module.css'


export default function Pokemon({ pokemon }) {
  const { id, name } = pokemon

  return (
    <>
      <Head>
        <title>{id} {displayName(name)} | Pokédex</title>
      </Head>

      <h1>{displayName(name)}</h1>
    </>
  )
}


export async function getServerSideProps(context) {
  let data

  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + context.params.id)
    data = await res.json()
  } catch (err) {
    console.error('Could not fetch pokemon data.')
    // TODO redirect to an error page (OR create an error state on this page)
  }

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pokemon: data
    }
  }
}