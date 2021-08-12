import { useState, useEffect } from 'react'
import SearchIcon from '../assets/searchIcon'
import { fetchDetailsForPokemons, filterVariants } from '../utils/pokemons'
import styles from '../styles/components/search.module.css'


// TODO
// de search werkt MAAR:
// is enorm langzaam -> elke input change fetched enorm veel data, dit kan op 2 manieren beter:
//  - check eerst of de pokemondata al in de state bestaat (bv. als je voor pikachu zoekt hoeft niet elke keer de data opnieuw gefetched te worden, de pikachu data staat toch al in de state)
//  - op elke search keystroke moeten de 'vorige' fetch requests allemaal geAbort worden (met 'vorige' fetch requests bedoel ik de fetch requests die ggetriggered zijn door de vorige search keystroke want als een user snel genoeg typed dan is de computer de resultaten van je vorige keystroke nog aan het fetchen terwijl je alweer een volgend karakter hebt getyped)
// verder is er een probleem met de useInfiniteScroll hook; deze moet gedisabled worden wanneer de gebruiker aan het zoeken is + loader.js moet niet zichtbaar zijn wanneer de gebruiker aan het zoeken is
// ook kan de code wel wat netter (denk vooral aan de lange/dubbele namen die gebruikt worden om de pokemons op te slaan. bv: 'filteredPokemons', 'matchingPokemons', 'filteredOriginalPokemons'


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