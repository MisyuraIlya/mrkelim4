import useSWR from 'swr'
import { useLocation } from 'react-router-dom'
import { HydraHandler } from '../../helpers/hydraHandler'
import services from '../../services'

const fetchData = async () => {
  return await services.Admin.AdminClinetsService.getUsers('ROLE_AGENT', 1, '')
}

const useDataAgents = () => {
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const page = urlSearchParams.get('page')
  const search = urlSearchParams.get('search')
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/ROLE_AGENT?page=${page}`,
    () => fetchData()
  )

  let hydraPagination
  if (data) {
    hydraPagination = HydraHandler.paginationHandler(data)
  }

  return {
    data,
    hydraPagination,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataAgents
