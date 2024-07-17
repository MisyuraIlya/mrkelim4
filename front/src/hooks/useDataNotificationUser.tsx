import useSWR from 'swr'
import { useAuth } from '../store/auth.store'
import services from '../services'

const fetchData = async (userId: number | string) => {
  return await services.Notifications.getNotificationByUserId(userId)
}

const useDataNotificationUser = () => {
  const { user } = useAuth()
  const { data, isLoading, mutate } = useSWR(
    `api/notifications/${user?.id}`,
    () => fetchData(user?.id!)
  )

  const updateNotificationUser = async (obj: {
    id: number
    isRead: boolean
  }) => {
    await services.Notifications.updateNotification(obj)
    mutate()
  }

  return {
    data,
    isLoading,
    updateNotificationUser,
    mutate,
  }
}

export default useDataNotificationUser
