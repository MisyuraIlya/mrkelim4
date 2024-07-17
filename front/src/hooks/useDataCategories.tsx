import useSWR from 'swr'
import services from '../services'

const fetchData = async (): Promise<GetCategoriesResponse> => {
  return await services.CatalogService.GetCategories()
}

const useDataCategories = () => {
  const { data, error, isValidating, mutate } = useSWR(
    `/api/categoriesApp`,
    fetchData
  )
  return {
    data,
    isLoading: !data && !error,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataCategories
