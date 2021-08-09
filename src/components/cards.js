import Link from 'next/link'
import Image from 'next/image'
import { displayName, displayId } from '../utils/display'
import styles from '../styles/components/cards.module.css'

// TODO check responsiveness (zie ook TODO in JSX)

export default function Card({ pokemons }) {
  return (
    <ul className={styles.list}>
      {pokemons.map(pokemon => {
        const { name, types, sprites, names, id, isFetched = false } = pokemon
        const mainType = types[0].type.name
        const artwork = sprites.other['official-artwork'].front_default
        const { name: japName } = names.find(nameObj => nameObj.language.name === 'ja')
        
        return (
          // the type attribute is used in the css files
          <li key={name} type={mainType} className={isFetched ? styles.item : null}>
            <Link href={'/' + id}>
              <a className={styles.card}>
                <Image 
                  src={artwork} 
                  alt={name} 
                  width={150} 
                  height={150}
                  priority={!isFetched}
                  className={styles.image}
                />

                {/* TODO nidoan (029 & 032) hebben een M en F versie, kijk of het gender in de data aangegeven staat -> als deze data erin staat dan kan het gender misschien uit de naam gehaald worden en '(female)' of '(male)' toegevoegd worden ipv 'F' of 'M' of miss zelf wel een icoon ipv een woord */}
                {/* TODO use the 'pokemon.species.name' property instead of the 'pokemon.name' (check if this property always exists + if there are multiple names for some pokemons) */}
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
  )
}