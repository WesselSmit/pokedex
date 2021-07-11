// capitalize the first letter of a name
export function capitalizePokemonName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}


// pad index with zeros to always be 3 chars
export function padStart(index) {
  return ('00' + index).slice(-3)
}