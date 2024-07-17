import useSWR from 'swr'
import services from '../../services'

const fetchData = async () => {
  return await services.Admin.AdminHomeMediaService.getHomeMedia()
}

const useHomeMeida = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/homeMedia`,
    () => fetchData()
  )

  const createHandler = async (home: any) => {
    await services.Admin.AdminHomeMediaService.createHomeMedia(home)
  }
  const updateHandler = async (home: any) => {
    await services.Admin.AdminHomeMediaService.updateHomeMedia(home)
  }

  const deleteHandler = async (id: number) => {
    await services.Admin.AdminHomeMediaService.deleteHomeMedia(id)
    mutate()
  }

  return {
    data,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
    updateHandler,
    createHandler,
    deleteHandler,
  }
}

export default useHomeMeida
