import { useState, useEffect } from 'react'
import SearchIcon from '../assets/searchIcon'
import { fetchDetailsForPokemons, filterVariants } from '../utils/pokemons'
import styles from '../styles/components/search.module.css'


export default function Search({ pokemons, setFilteredPokemons }) {
  const [inputElement, setInputElement] = useState(null)

  useEffect(() => {
    if (!inputElement) return

    focus()
  }, [inputElement])

  function focus() {
    inputElement.focus()
  }

  async function filter() {
    const input = inputElement.value.trim()
    const isNum = !isNaN(input)

    if (!input) {
      setFilteredPokemons(pokemons)
      return
    }

    const matchingPokemons = pokemons.filter(pokemon => {
      if (isNum) {
        return pokemon.id === input
      } else {
        return pokemon.name.includes(input)
      }
    })

    const filteredPokemons = await fetchDetailsForPokemons(matchingPokemons)

    const filteredOriginalPokemons = filterVariants(filteredPokemons)

    setFilteredPokemons(filteredOriginalPokemons)
  }

  function reset() {
    inputElement.value = ''
    filter()
    focus()
  }

  return (
    <section className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.searchBar}>
          <label htmlFor="search" onClick={focus} className={styles.label}>
            <SearchIcon className={styles.icon} />
          </label>

          <input type="text" id="search" placeholder="Search by name or id" maxLength="15" autoComplete="off" spellCheck="false" ref={setInputElement} onChange={filter} className={styles.input} />
          <button onClick={reset} className={styles.reset}></button>
        </div>
      </div>
    </section>
  )
}