import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import services from '../../services'

type RouteParams = {
  lvl1: string
  lvl2: string
}

const fetchData = async (lvl1: string, lvl2: string) => {
  return await services.Admin.AdminCatalogService.getAdminCategoory(lvl1, lvl2)
}

const useDataCategoryEdit = () => {
  const { lvl1, lvl2 } = useParams<RouteParams>()
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/adminCategories/${lvl1}/${lvl2}`,
    () => fetchData(lvl1!, lvl2!)
  )

  const handleUpdate = async (category: any) => {
    await services.Admin.AdminCatalogService.updateCategory(category)
  }

  return {
    data,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
    handleUpdate,
  }
}

export default useDataCategoryEdit
