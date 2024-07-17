import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { useAuth } from '../store/auth.store'
import moment from 'moment'
import services from '../services'

type RouteParams = {
  dateFrom: string
  dateTo: string
}

const fetchData = async (
  fromDate: Date,
  toDate: Date,
  user: IUser
): Promise<HovotResponse> => {
  return await services.DocumentsService.GetHovot(user, fromDate, toDate)
}

const useDataHovot = () => {
  const { dateFrom, dateTo } = useParams<RouteParams>()
  const { user } = useAuth()
  const fromConverted = moment(dateFrom).format('YYYY-MM-DD')
  const toDateConverted = moment(dateTo).format('YYYY-MM-DD')
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<HovotResponse>(
      `/api/hovot/${fromConverted}/${toDateConverted}?userId=${user?.id}`,
      () =>
        fetchData(new Date(fromConverted!), new Date(toDateConverted!), user!)
    )

  return {
    data,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataHovot
