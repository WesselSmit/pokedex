import Link from 'next/link'
import Image from 'next/image'
import { displayName, displayId } from '../utils/display'
import styles from '../styles/components/cards.module.css'

// TODO maak responsive

export default function Card({ pokemons }) {
  return (
    <section className={styles.outer}>
      <ul className={styles.list}>
        {pokemons.map(pokemon => {
          const { name, types, sprites, names, id, isFetched = false } = pokemon
          const mainType = types[0].type.name
          const artwork = sprites.other['official-artwork'].front_default
          const { name: japName } = names.find(nameObj => nameObj.language.name === 'ja')
          
          return (
            // the type attribute is used in the css files (see ../styles/global/types.css)
            <li key={id} type={mainType} className={isFetched ? styles.item : null}>
              <Link href={'/' + id}>
                <a className={styles.card}>
                  <Image 
                    src={artwork} 
                    alt={'Image of ' + name} 
                    width={150} 
                    height={150}
                    priority={!isFetched}
                    className={styles.image}
                  />

                  <article className={styles.textOuter}>
                    <div className={styles.textInner}>
                      <h6 className={styles.name}>{displayName(name)}</h6>
                      <p className={styles.japaneseName}>{japName}</p>
                    </div>
                    <p className={styles.id}>{displayId(id)}</p>
                  </article>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}