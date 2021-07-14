import { useState, useRef, useEffect } from 'react'
import Search from '../components/Search'
import Cards from '../components/Cards'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pages/Home.module.css'


export default function Home({ data }) {
  // TODO werkt 'next' dit ook met useState of useRef ipv een let?
  // let { next: nextFetchLink } = data
  // const [next, setNext] = useState(data.next)
  let next = data.next

  const [pokemons, setPokemons] = useState(data.results)
  // const [filteredPokemons, setFilteredPokemons] = useState(pokemons)
  
  // TODO werkt dit ook met een useRef ipv een useState?
  // const target = useRef(null)
  const [targetElement, setTargetElement] = useState(null)
  const prevY = useRef(0) // storing the last intersection y position

  // TODO: spelen met de options (rootMargin eerder zetten)
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  }

  // TODO: werkt de infinite scroll ook zonder de check voor 'prevY'?
  const handleObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y

    if (prevY.current > y) {
      fetchImages()
    }

    prevY.current = y
  }

  // TODO (lelijke oplossing): IntersectionObserver werkt alleen met useEffect, maar useEffect kan geen waarde returnen dus moet er gebruik gemaakt worden van setState om de observer op te slaan
  const [observer, setObserver] = useState(null)

  useEffect(() => {
    setObserver(new IntersectionObserver(handleObserver, options))
  }, [])

  // TODO werkt dit ook met useRef ipv useState? (als dit werkt dan kan de [targetElement] een lege dependency-array/[] worden)
  useEffect(() => {
    if (targetElement) {
      observer.observe(targetElement)
    }
  }, [targetElement])

  const fetchImages = async () => {
    // TODO gebruikt try catch + loading state
    const res = await fetch(next)
    const data = await res.json()

    next = data.next

    // TODO waarom werkt het een wel en het ander niet? --> VRAAG AAN SJORS
    // setPokemons([...pokemons, ...data.results]) // werkt niet
    setPokemons((pokemons) => [...pokemons, ...data.results]) // werkt wel
  }

  // TODO clean up de code
  
  return (
    <>
      <Head>
        <title>Browse pokemon | Pokédex</title>
      </Head>

      <div style={{position:'fixed',top:'100px',zIndex:10000,background:'orange'}}>number of pokemons: {pokemons.length}</div>

      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="Pokédex logo" width={434} height={156} />
        </div>

        {/* <Search pokemons={pokemons} setFilteredPokemons={setFilteredPokemons} /> */}
      </header>

      <main className={styles.list}>
        <Cards pokemons={pokemons} />
        {/* <Cards pokemons={filteredPokemons} /> */}
      </main>

      <div ref={setTargetElement}>TARGET</div>
    </>
  )
}


export async function getStaticProps() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}