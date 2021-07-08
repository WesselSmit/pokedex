import styles from '../styles/home.module.css'


export default function Home({ pokemons }) {
  return (
    <>
      <h1>List of pokemons</h1>

      <ol>
        {pokemons.map(pokemon => <li key={pokemon.name}>{pokemon.name}</li>)}
      </ol>
    </>
  )
}


export async function getStaticProps() {
  /*
  The '/pokemon' has 1118 entries.
  Entries 0 - 898 are pokemon with their own (detail) api endpoint.
  Entries 899 - 1118 are 'variants' of the 0 - 898 pokemon entries.
  These 'variants' do not have their own api responses.
  So the fetch excludes all pokemon 'variants' by capping the query limit param to 898. 
  */

  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
  const data = await res.json()

  return {
    props: {
      pokemons: data.results
    },
  }
}