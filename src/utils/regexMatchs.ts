export const getAccount = (whoamiText: string): string => {
  const regexp = new RegExp(/logged into (\w+) as/)

  return regexp.exec(whoamiText.toLocaleLowerCase())[1].trim()
}

export const getWS = (whoamiText: string): string => {
  const regexp = new RegExp(/workspace (\w+)/)

  return regexp.exec(whoamiText.toLocaleLowerCase())[1].trim()
}
