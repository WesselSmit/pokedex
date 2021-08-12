// utility functions used for manipulating pokemon data


// fetch details for each pokemon
export async function fetchDetailsForPokemons(pokemons) {
  return await Promise.all(
    // 2 api endpoints are needed to get all required data of a single pokemon ('/pokemon/:id' & '/pokemon-species/:id')
    pokemons.map(async pokemon => {
      // fetch basic pokemon data
      const pokemonRes = await fetch(pokemon.url)
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
}


// filter out all pokemon 'variants' and only return the 'original' pokemons
export function filterVariants(pokemons) {
  // the api data contains 'original' pokemons and pokemon 'variants'
  // all 'original' pokemons have an id of lower than 10000
  // all 'variant' pokemons have an id higher than 10000 
  return pokemons.filter(pokemon => pokemon.id < 10000)
}