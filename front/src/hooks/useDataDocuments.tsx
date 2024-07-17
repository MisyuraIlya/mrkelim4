import useSWR from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import { HydraHandler } from '../helpers/hydraHandler'
import moment from 'moment'
import { useAuth } from '../store/auth.store'
import services from '../services'

type RouteParams = {
  documentType: IDocumentTypes
  dateFrom: string
  dateTo: string
}

const fetchData = async (
  user: IUser,
  documentType: string,
  fromDate: Date,
  toDate: Date,
  page: string | number
): Promise<DocumentsResponse> => {
  return await services.DocumentsService.GetDocuments(
    user,
    documentType,
    fromDate,
    toDate,
    page
  )
}

const useDataDocuments = () => {
  const { user } = useAuth()
  const { documentType, dateFrom, dateTo } = useParams<RouteParams>()
  const fromConverted = moment(dateFrom).format('YYYY-MM-DD')
  const toDateConverted = moment(dateTo).format('YYYY-MM-DD')
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const pageNumber = searchParams.get('page')
  const { data, error, isValidating, mutate } = useSWR<DocumentsResponse>(
    `/api/documents/${documentType}/${fromConverted}/${toDateConverted}${location.search}`,
    () =>
      fetchData(
        user!,
        documentType as IDocumentTypes,
        new Date(dateFrom!),
        new Date(dateTo!),
        pageNumber ?? '1'
      )
  )

  let hydraPagination
  if (data) {
    hydraPagination = HydraHandler.paginationHandler(data)
  }
  return {
    data,
    hydraPagination,
    isLoading: !data && !error,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataDocuments
