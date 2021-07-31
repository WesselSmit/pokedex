import styles from '../styles/components/search.module.css'


export default function Search({ pokemons, setFilteredPokemons }) {
  function filter(e) {
    const input = e.target.value.trim()
    const isNum = !isNaN(input)

    if (!input) {
      setFilteredPokemons(pokemons)
      return
    }
    
    const filteredPokemons = pokemons.filter(pokemon => {
      if (isNum) {
        return pokemon.id == input
      } else {
        return pokemon.name.includes(input)
      }
    })

    setFilteredPokemons(filteredPokemons)
  }

  return (
    <input 
      type="text"
      placeholder="Search for a pokémon by name or pokédex number"
      autoComplete="off"
      onChange={filter} 
      className={styles.input} 
    />
  )
}