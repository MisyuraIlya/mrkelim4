interface IHomeEdit {
  '@id': string
  id: number
  type: string
  orden: number
  isVideo: boolean
  isBanner: boolean
  isActive: boolean
  count: number
  countMobile: number
  isPopUp: boolean
  isDeletable: boolean
  homeMedia: IHomeMedia[]
}
