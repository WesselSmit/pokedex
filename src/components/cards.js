import Link from 'next/link'
import Image from 'next/image'
import { typeColor } from '../utils/colors'
import { displayName, displayId } from '../utils/display'
import styles from '../styles/components/cards.module.css'

// TODO zoek een nette manier om de kleuren dynamisch te houden (:hover en :focus moeten ook stylebaar zijn)
// TODO mogelijke oplossing: classes voor elk type hardcoden in css module
// TODO check responsiveness (zie ook TODO in JSX)
// TODO cleanup

export default function Card({ pokemons }) {
  return (
    <ul className={styles.list}>
      {pokemons.map(pokemon => {
        const { name, types, sprites, names, id, isFetched = false } = pokemon
        const { name: japName } = names.find(nameObj => nameObj.language.name === 'ja')

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
                  priority={!isFetched}
                />

                {/* TODO use the 'pokemon.species.name' property instead of the 'pokemon.name' (check if this property always exists + if there are multiple names for some pokemons) */}
                <article className={styles.textOuter}>
                  <div className={styles.textInner}>
                    <h6
                      className={styles.name}
                      style={{color: typeColor(types)}}
                    >{displayName(name)}</h6>
                    {/* TODO de regel hieronder is de langste pokemon naam, gebruik deze om de responsiveness te checken ivm font-size */}
                    {/* >{displayName('crabominable')}</h6> */}
                    <p className={styles.japaneseName} style={{color: typeColor(types)}}>{japName}</p>
                  </div>

                  <p className={styles.id} style={{color: typeColor(types)}}>{displayId(id)}</p>
                </article>
              </a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}