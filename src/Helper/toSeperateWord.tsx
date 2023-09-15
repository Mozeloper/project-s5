//This function helps to seperate joined words/string to single words/string
// the function only accepts string
const camelCaseToSingleWords = (word: string) => {
  return word.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
}

export { camelCaseToSingleWords }