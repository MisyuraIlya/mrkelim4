import axios from 'axios'

interface MediaObjectResponse {
  '@id': string
  contentUrl: string
  createdAt: string
  source: string
}

export const MediaObjectService = {
  async uploadImage(file: File, source: string): Promise<MediaObjectResponse> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('source', source)
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/media_objects`,
      formData
    )
    return response.data
  },

  async ftpUploader(fileName: string, sourceVps1: string, sourceVps3: string) {
    let obj = {
      fileName,
      sourceVps1,
      sourceVps3,
    }
    const response = await axios.post(
      `${process.env.REACT_APP_API}/ftpFileUploader`,
      obj
    )
    return response.data
  },
}
