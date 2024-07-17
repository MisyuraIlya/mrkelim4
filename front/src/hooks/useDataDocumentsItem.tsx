import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { useAuth } from '../store/auth.store'
import services from '../services'

type RouteParams = {
  documentItemType: IDocumentTypes
  id: string
}

const fetchData = async (
  documentItemType: IDocumentTypes,
  id: string,
  user: IUser
) => {
  return await services.DocumentsService.GetDocumentsItem(
    documentItemType as IDocumentTypes,
    id,
    user
  )
}

const useDataDocumentsItem = () => {
  const { documentItemType, id } = useParams<RouteParams>()
  const { user } = useAuth()
  const { data, error, isValidating, mutate } = useSWR<IDocumentItems>(
    `api/documents/${documentItemType}/${id}`,
    () => fetchData(documentItemType!, id!, user!)
  )

  return {
    data,
    isLoading: !data && !error,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataDocumentsItem
