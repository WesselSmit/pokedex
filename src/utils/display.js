// utility functions used to format content for display


// format pokemon id's
export function displayId(id, length = 3, char = '0') {
  const stringId = id.toString()
  return stringId.padStart(length, char.toString())
}


// format pokemon names
export function displayName(name) {
  const spacedName = replaceHyphens(name)
  const genderedName = formatGender(spacedName)
  return titleCase(genderedName)
}


function replaceHyphens(str) {
  const hyphenRegex = new RegExp(/-/g)
  return str.replace(hyphenRegex, ' ')
}


// replace gender string characters with unicode characters (e.g. 'f' becomes '♀')
function formatGender(name) {
  const lastTwoChar = name.slice(-2)
  const femaleUnicode = '\u2640'
  const maleUnicode = '\u2642'
  let baseName

  switch (lastTwoChar) {
    case ' f':
      console.log(name)
      baseName = name.split(' f')[0]
      return `${baseName} ${femaleUnicode}`
    case ' m':
      console.log(name)
      baseName = name.split(' m')[0]
      return `${baseName} ${maleUnicode}`
    default:
      return name
  }
}


// capitalize the first letter of each word
function titleCase(str) {
  const parts = str.split(' ')
  const titleCased = parts.map(part => {
    const firstLetterCapitalized = part.charAt(0).toUpperCase()
    const remainingLetters = part.slice(1)
    return firstLetterCapitalized + remainingLetters
  })
  
  return titleCased.join(' ')
}