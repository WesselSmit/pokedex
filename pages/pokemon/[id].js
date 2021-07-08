import styles from '../../styles/pokemon.module.css'


export default function Pokemon({ pokemon }) {
  return (
    <>
      <h1>{pokemon.name}</h1>
    </>
  )
}


export async function getServerSideProps(context) {
  let data

  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + context.params.id)
    data = await res.json()
  } catch (err) {
    console.log('Could not fetch pokemon data.')
  }

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pokemon: data
    }, 
  }
}