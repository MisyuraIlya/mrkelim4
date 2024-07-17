import useSWR from 'swr'
import moment from 'moment'
import { onAsk } from '../../utils/MySweetAlert'
import services from '../../services'
const fetchData = async () => {
  const data =
    await services.Admin.AdminNotificationsServices.fetchNotifications()
  return data
}

const useDataNotification = () => {
  const { data, isLoading, mutate } = useSWR(
    `api/notifications?isSystem=false`,
    fetchData
  )

  const createMutation = async (object: INotification | null) => {
    const newObject: INotification = {
      title: null,
      description: null,
      link: null,
      createdAt: moment().format('YYYY-MM-DD'),
      isSend: false,
      image: null,
      isPublic: false,
      isPublished: false,
      isSystem: false,
    }
    if (object?.id) {
      newObject.title = object?.title
      newObject.description = object?.description
      newObject.link = object?.link
      if (object?.image) {
        //@ts-ignore
        newObject.image = object?.image['@id']
      }
    }
    await services.Admin.AdminNotificationsServices.createItem(newObject)
    mutate()
  }

  const updateMutation = async (obj: INotification) => {
    await services.Admin.AdminNotificationsServices.updateItem(obj)
    mutate()
  }

  const deleteMutation = async (id: string | number) => {
    const ask = await onAsk('למחוק שורה זו?', '')
    if (ask) {
      await services.Admin.AdminNotificationsServices.deleteItem(id)
      mutate()
    }
  }

  return {
    data,
    isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}

export default useDataNotification
