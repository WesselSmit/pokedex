import GithubIcon from '../icons/github'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/components/header.module.css'


export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        <Link href="/">
          <a>
            <Image 
              src="/logo.png" 
              alt="Pokédex logo" 
              width={150} 
              height={54} 
              className={styles.logo} 
            />
          </a>
        </Link>

        <nav>
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
            <li className={styles.listItem}>
              <a href="https://github.com/WesselSmit/pokedex" target="_blank" rel="noreferrer">
                <GithubIcon className={styles.icon} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}