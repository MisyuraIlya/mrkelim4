import useSWR from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import { HydraHandler } from '../../helpers/hydraHandler'
import services from '../../services'

const fetchData = async (
  page: string = '1',
  objective: objectiveTypes,
  search: string,
  agentId: string
) => {
  return await services.Agents.agentProfileService.getAgentObjective(
    page ?? 1,
    objective,
    search,
    agentId
  )
}

type RouteParams = {
  id: string
}

const useDataAgentObjectives = (objective: objectiveTypes) => {
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const page = urlSearchParams.get('page')
  const search = urlSearchParams.get('search')
  const { id } = useParams<RouteParams>()

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/agent_objectives/${id}?page=${page}&${search}`,
    () => fetchData(page!, objective, search!, id!)
  )

  const createVisit = async (obj: IAgentObjective) => {
    try {
      await services.Agents.agentProfileService.createAgentObjective(obj)
    } catch (e) {
      console.log('[ERROR] error', e)
    } finally {
      mutate()
    }
  }

  const updateVisit = async (obj: IAgentObjective) => {
    try {
      await services.Agents.agentProfileService.updateAgentObjective(obj)
    } catch (e) {
      console.log('[ERROR] error', e)
    } finally {
      mutate()
    }
  }

  const deleteVisit = async (id: number | string) => {
    try {
      await services.Agents.agentProfileService.deleteAgentObjective(id)
    } catch (e) {
      console.log('[ERROR] error', e)
    } finally {
      mutate()
    }
  }

  let hydraPagination
  if (data) {
    hydraPagination = HydraHandler.paginationHandler(data)
  }

  return {
    data,
    hydraPagination,
    createVisit,
    updateVisit,
    deleteVisit,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataAgentObjectives
