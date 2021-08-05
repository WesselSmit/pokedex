import Link from 'next/link'
import Image from 'next/image'
import { typeColor } from '../utils/colors'
import { displayName } from '../utils/names'
import styles from '../styles/components/cards.module.css'

// TODO zoek een nette manier om de kleuren dynamisch te houden (:hover en :focus moeten ook stylebaar zijn)
  // TODO mogelijke oplossing: classes voor elk type hardcoden in css module
// TODO check responsiveness
// TODO cleanup

export default function Card({ pokemons }) {
  return (
    <ul className={styles.list}>
      {pokemons.map(pokemon => {
        const { name, types, sprites, names, id } = pokemon

        const japNameObj = names.find(nameObj => nameObj.language.name === 'ja')
        const japName = japNameObj.name

        const displayId = id.toString().padStart(3, '0')

        return (
          <li key={name}>
            <Link href={'/' + id}>
              <a 
                className={styles.card} 
                style={{backgroundColor: typeColor(types, 'rgba', 0.25)}}
              >
                <Image 
                  src={sprites.other['official-artwork'].front_default} 
                  alt={name} 
                  width={150} 
                  height={150}
                />

                {/* TODO use the 'pokemon.species.name' property instead of the 'pokemon.name' (check if this property always exists + if there are multiple names for some pokemons + if this will cause problems with the URLs for the detail pages) */}
                <article className={styles.textOuter}>
                  <div className={styles.textInner}>
                    <h6
                      className={styles.name}
                      style={{color: typeColor(types)}}
                    >{displayName(name)}</h6>
                    <p className={styles.japanese} style={{color: typeColor(types)}}>{japName}</p>
                  </div>

                  <p className={styles.id} style={{color: typeColor(types)}}>{displayId}</p>
                </article>
              </a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}