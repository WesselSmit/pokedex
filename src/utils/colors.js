// all pokemon type colors
const colors = {
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


// get pokemon color
export function typeColor(pokemon, colorMode = 'hex', alphaValue = 1) {
  const mainType = pokemon[0].type.name
  const hexColor = colors[mainType]
  let color

  switch(colorMode.toLowerCase()) {
    case 'rgb':
    case 'rgba':
      color = `rgba(${HEXtoRGBA(hexColor, alphaValue)})`
      break
    default:
      color = hexColor
  }

  return color
}


// convert HEX to RGBA (https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
function HEXtoRGBA(hex, a) {
  const sanitizedHEX = sanitizeHEX(hex)
  const hexBigInt = parseInt(sanitizedHEX, 16)
  const r = (hexBigInt >> 16) & 255
  const g = (hexBigInt >> 8) & 255
  const b = hexBigInt & 255

  return [r, g, b, a].join()
}


// get rid of the '#' in hex values (e.g. '#FFFFFF' becomes 'FFFFFF')
function sanitizeHEX(hex) {
  return hex.slice(1)
}