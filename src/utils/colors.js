export function typeColor(type) {
  // TODO use better looking colors + rename function to be more descriptive
  const colors = { // pokemondb.net (figma image 2)
    normal: '#AAAA9B',
    fire: '#EC5435',
    fighting: '#AE5B4A',
    water: '#5099F7',
    flying: '#8A9BF8',
    grass: '#8BC965',
    poison: '#9F5B96',
    electric: '#F8CD55',
    ground: '#D8BB65',
    psychic: '#EC6398',
    rock: '#B8AA6F',
    ice: '#7FCBFA',
    bug: '#ADBA44',
    dragon: '#736AE6',
    ghost: '#6567B5',
    dark: '#725647',
    steel: '#AAAABA',
    fairy: '#E29EE9'
  }
  // const colors = { // figma image 1
  //   normal: '#EAEADE',
  //   fire: '#F8B80E',
  //   fighting: '#D36063',
  //   water: '#36AFF6',
  //   flying: '#DCE5EA',
  //   grass: '#67F70A',
  //   poison: '#CA72EC',
  //   electric: '#F7FF85',
  //   ground: '#EDE293',
  //   psychic: '#F55792',
  //   rock: '#94834F',
  //   ice: '#66D1E5',
  //   bug: '#D9FE9E',
  //   dragon: '#D6B1FE',
  //   ghost: '#BD98CB',
  //   dark: '#916852',
  //   steel: '#BBC5C4',
  //   fairy: '#FDD1E0'
  // }
  // const colors = { // sjors
  //   normal: '#A8A878',
  //   fire: '#F08030',
  //   fighting: '#C03028',
  //   water: '#6890F0',
  //   flying: '#A890F0',
  //   grass: '#78C850',
  //   poison: '#A040A0',
  //   electric: '#F8D030',
  //   ground: '#E0C068',
  //   psychic: '#F85888',
  //   rock: '#B8A038',
  //   ice: '#98D8D8',
  //   bug: '#A8B820',
  //   dragon: '#7038F8',
  //   ghost: '#705898',
  //   dark: '#705848',
  //   steel: '#B8B8D0',
  //   fairy: '#EE99AC'
  // }
  

  return colors[type]
}