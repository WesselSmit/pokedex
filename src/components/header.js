import { useState } from 'react'
import GithubIcon from '../assets/githubIcon'
import Link from 'next/link'
import Image from 'next/image'
import { classNames } from '../utils/classes'
import styles from '../styles/components/header.module.css'


export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  function handleClick() {
    setMenuIsOpen(!menuIsOpen)
  }

  return (
    <header className={ classNames(styles.outer, menuIsOpen ? styles.open : styles.closed) }>
      <div className={styles.inner}>
        <Link href="/">
          <a>
            <Image 
              src="/logo.png" 
              alt="Pokédex logo" 
              width={150} 
              height={54} 
              priority="true"
              className={styles.logo} 
            />
          </a>
        </Link>

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
            <li className={styles.listItem}>
              <a href="https://github.com/WesselSmit/pokedex" target="_blank" rel="noreferrer">
                <p className={ classNames(styles.link, styles.githubLink) }>Github</p>
                <GithubIcon className={styles.githubIcon} />
              </a>
            </li>
          </ul>
        </nav>

        <button className={styles.menuIcon} onClick={handleClick}></button>
      </div>
    </header>
  )
}