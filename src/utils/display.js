// utility functions used to format content for display


// format pokemon id's
export function displayId(id, length = 3, char = '0') {
  const stringId = id.toString()
  return stringId.padStart(length, char.toString())
}


// format pokemon names
export function displayName(name) {
  const nameWithSpaces = replaceHyphens(name)
  return titleCase(nameWithSpaces)
}


function replaceHyphens(str) {
  const hyphenRegex = new RegExp(/-/g)
  return str.replace(hyphenRegex, ' ')
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