import { useState, useEffect } from 'react'
import useWindowSize from '../hooks/useWindowSize'
import GithubIcon from '../icons/github'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/components/header.module.css'


export default function Header() {
  const [activeMenu, setActiveMenu] = useState(false)
  const [menuClickedOpen, setMenuClickedOpen] = useState(false)
  const { width: screenWidth } = useWindowSize()

  // '480' is the same width as in the header.module.css media query
  const isMobileScreenSize = screenWidth <= 480 

  useEffect(() => {
    // if menu is open and screen resizes to non-mobile screen (devtools), automatically close the menu
    if (!isMobileScreenSize && activeMenu) {
      setMenuClickedOpen(false)
    }

    // if device is a phone (isMobileScreenSize) and user opened the menu (menuClickedOpen), the menu should be open
    setActiveMenu(isMobileScreenSize && menuClickedOpen)
  }, [isMobileScreenSize, menuClickedOpen])

  function handleClick() {
    setMenuClickedOpen(!menuClickedOpen)
  }

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
                <GithubIcon className={styles.githubIcon} />
              </a>
            </li>
          </ul>
        </nav>

        {/* TODO: schrijf utils functie om meerdere classNames te kunnen gebruiken (join ze aan elkaar met reduce) */}
        <button className={styles.menuIcon + ' ' + (activeMenu ? styles.open : styles.closed)} onClick={handleClick}></button>
      </div>
    </header>
  )
}