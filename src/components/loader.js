import Pokeball from '../components/pokeball'
import styles from '../styles/components/loader.module.css'


export default function Loader({ isLoading, getPokemons }) {
  return (
    <div className={styles.outer}>
      { isLoading ?
        <Pokeball />
        :
        // fallback for if an unexpected error occurs with the IntersectionObserver
        // examples of unexpected IntersectionObserver errors:
        // - IntersectionObserver doesn't initialize (in time)
        // - user goes back to previous page and the scroll position is restored, this means the user could be at the bottom of the page without needing to scroll and thus not triggering the IntersectionObserver
        <button onClick={getPokemons} className={styles.button}>Load more</button>
      }
    </div>
  )
}