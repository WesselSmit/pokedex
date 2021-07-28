// format pokemon names to be displayed
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