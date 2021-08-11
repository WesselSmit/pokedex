import { useState, useEffect } from 'react'
import SearchIcon from '../assets/searchIcon'
import styles from '../styles/components/search.module.css'


export default function Search() {
  const [inputElement, setInputElement] = useState(null)

  useEffect(() => {
    if (!inputElement) return

    inputElement.focus()
  }, [inputElement])

  return (
    <section className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.searchBar}>
          <SearchIcon className={styles.searchIcon} />
          <input type="text" placeholder="Search by name or id..." autoComplete="off" spellCheck="false" ref={setInputElement} className={styles.input} />
        </div>

        <button className={styles.reset}>Reset</button>
      </div>
    </section>
  )
}