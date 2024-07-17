export const base64ToFile = (base64Data: string, filename: string): File => {
  const regex = /^data:([a-zA-Z\/]+);base64,/
  const result = regex.exec(base64Data)
  const mimeType = result?.[1]
  const data = base64Data.replace(/^data:[a-zA-Z\/]+;base64,/, '')
  const byteCharacters = atob(data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: mimeType })
  const file = new File([blob], filename, { type: mimeType })

  return file
}
