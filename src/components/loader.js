import Pokeball from '../components/pokeball'
import { classNames } from '../utils/classes'
import styles from '../styles/components/loader.module.css'


export default function Loader({ isLoading, isError, incrementFetchIndex }) {
  // the fallback allows users to manually trigger a new content fetch in case the IntersectionObserver fails
  // this is necessary because there are (unlikely) scenarios in which the user gets to the bottom of the screen without triggering the IntersectionObserver:
  // - user goes back to previous page and the last scroll position is restored, this means the user could be at the bottom of the page without needing to scroll and thus not triggering the IntersectionObserver
  // - the 'rootMargin' in pages/index.js is higher than the screen resolution height

  return (
    <div className={styles.outer}>
      { isLoading && 
        <Pokeball className={styles.icon} />
      }

      { isError && 
        <button onClick={incrementFetchIndex} className={ classNames(styles.button, styles.error) }>Click to retry</button>
      }

      {/* fallback */}
      { !isLoading && !isError && 
        <button onClick={incrementFetchIndex} className={ classNames(styles.button, styles.load) }>Load more</button>
      }
    </div>
  )
}