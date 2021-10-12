import { useState, useEffect } from 'react'
import SearchIcon from '../assets/SearchIcon'
import styles from '../styles/components/search.module.css'

// TODO search function implementeren

export default function Search() {
  const [inputElement, setInputElement] = useState(null)

  useEffect(() => {
    if (!inputElement) return

    focus()
  }, [inputElement])

  function focus() {
    inputElement.focus()
  }

  function reset() {
    inputElement.value = ''
    focus()
  }

  return (
    <section className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.searchBar}>
          <label
            htmlFor="search"
            onClick={focus}
            className={styles.label}
          >
            <SearchIcon className={styles.icon} />
          </label>

          <input
            type="text"
            id="search"
            placeholder="Search by name or id"
            maxLength="15"
            autoComplete="off"
            spellCheck="false"
            ref={setInputElement}
            className={styles.input}
          />
          <button onClick={reset} className={styles.reset}></button>
        </div>
      </div>
    </section>
  )
}
