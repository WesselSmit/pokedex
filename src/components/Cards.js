import Link from 'next/link'
import Image from 'next/image'
import { displayName } from '../utils/names'
import styles from '../styles/components/Cards.module.css'


export default function Card({ pokemons }) {
  return (
    <ul className={styles.list}>
      {pokemons.map(pokemon => {
        return (
          <li key={pokemon.name}>
            <Link href={'/' + pokemon.name}>
              <a className={styles.card}>
                <Image src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} width={200} height={200} />

                {/* TODO use the 'pokemon.species.name' property instead of the 'pokemon.name' (check if this property always exists + if there are multiple names for some pokemons + if this will cause problems with the URLs for the detail pages) */}
                <h6 className={styles.name}>{displayName(pokemon.name)}</h6>
              </a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}