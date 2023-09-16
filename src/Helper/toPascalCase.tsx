  //Convert a string to be Capitalized
  const toPascalCase =  function camelSentence(str: string) {
    return  (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
}

export { toPascalCase }