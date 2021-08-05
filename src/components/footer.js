import GithubIcon from '../icons/github'
import Link from 'next/link'
import styles from '../styles/components/footer.module.css'


export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.outer}>
      <div className={styles.inner}>
        <nav className={styles.navigation}>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link href="/">
                <a className={styles.link}>Overview</a>
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/about">
                <a className={styles.link}>About</a>
              </Link>
            </li>
          </ul>
        </nav>

        <a href="https://github.com/WesselSmit/pokedex" target="_blank" rel="noreferrer">
          <GithubIcon className={styles.icon} />
        </a>

        <p className={styles.copyright}>© {currentYear} Wessel Smit</p>
      </div>
    </footer>
  )
}