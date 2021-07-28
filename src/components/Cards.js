import Link from 'next/link'
import Image from 'next/image'
import { capitalizePokemonName } from '../utils/names'
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

                <h6 className={styles.name}>{capitalizePokemonName(pokemon.name)}</h6>
              </a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}