import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import services from '../../services'

const fetchDataProfile = async (agentId: string) => {
  return await services.Agents.agentProfileService.getAgentProfile(agentId)
}

type RouteParams = {
  id: string
}

const useDataAgentProfile = () => {
  const { id } = useParams<RouteParams>()

  const { data, isLoading } = useSWR(`/agentProfile/${id}`, () =>
    fetchDataProfile(id!)
  )

  return {
    data,
    isLoading,
  }
}

export default useDataAgentProfile
