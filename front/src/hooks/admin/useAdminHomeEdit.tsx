import useSWR from 'swr'
import services from '../../services'

const fetchData = async () => {
  return await services.Admin.AdminHomeEditService.getHomeEdits()
}

const useHomeEdit = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/homeEdit`,
    () => fetchData()
  )

  const handleUpdate = async (home: any) => {
    await services.Admin.AdminHomeEditService.updateHome(home)
  }

  const handleCreate = async (home: any) => {
    await services.Admin.AdminHomeEditService.createHomeEdits(home)
    mutate()
  }

  const handleDelete = async (id: number) => {
    await services.Admin.AdminHomeEditService.deleteHomeEdit(id)
    mutate()
  }

  return {
    data,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
    handleUpdate,
    handleCreate,
    handleDelete,
  }
}

export default useHomeEdit
