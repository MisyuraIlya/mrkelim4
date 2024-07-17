import axios from 'axios'
import { IsInteger } from '../../helpers/IsInteger'

interface AgentObjectiveResponse extends Hydra {
  'hydra:member': IAgentObjective[]
}

interface AgentTargetResponse extends Hydra {
  'hydra:member': IAgentTaget[]
}

export const agentProfileService = {
  // OBJECTIVES
  async getAgentObjective(
    page: string | number,
    type?: objectiveTypes | null,
    search?: string | null,
    agentId?: string | null,
    dateFrom?: string | null,
    dateTo?: string | null
  ): Promise<AgentObjectiveResponse> {
    try {
      let apiUrl = `${process.env.REACT_APP_API}/api/agent_objectives?page=${page}`
      if (type) {
        apiUrl += `&objectiveType=${type}`
      }
      if (agentId) {
        apiUrl += `&agent.id=${agentId}`
      }
      if (search) {
        if (IsInteger(search)) {
          apiUrl += `&client.extId=${search}`
        } else {
          apiUrl += `&client.name=${search}`
        }
      }
      if (dateFrom && dateTo) {
        apiUrl += `&date[before]=${dateFrom}&date[after]=${dateTo}`
      }
      const response = await axios.get(apiUrl)
      return response.data
    } catch (error) {
      // Handle error here
      console.error('Error fetching agent objectives:', error)
      throw error // Optionally rethrow the error
    }
  },
  async createAgentObjective(
    object: IAgentObjective
  ): Promise<IAgentObjective> {
    console.log('object', object)
    if (object.agent) {
      // @ts-ignore
      object.agent = `/api/users/${object.agent.id}`
    }

    if (object.client) {
      // @ts-ignore
      object.client = `/api/users/${object.client.id}`
    }
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/agent_objectives`,
      object
    )
    return response.data
  },
  async updateAgentObjective(
    object: IAgentObjective
  ): Promise<IAgentObjective> {
    // @ts-ignore
    object.agent = `/api/users/${object?.agent?.id ?? object.agent}`
    if (object?.client) {
      // @ts-ignore
      object.client = `/api/users/${object?.client?.id ?? object.client}`
    }
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/agent_objectives/${object.id}`,
      object,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )
    return response.data
  },
  async deleteAgentObjective(id: number | string): Promise<void> {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/agent_objectives/${id}`
    )
    return response.data
  },

  // TARGETS
  async getAgentTargets(
    agentId: number | string | null,
    year: string
  ): Promise<AgentTargetResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/agent_targets?agent.id=${agentId}&year=${year}`
    )
    return response.data
  },
  async createAgentTarget(object: IAgentTaget): Promise<IAgentTaget> {
    // @ts-ignore
    object.agent = `/api/users/${object.agent.id}`
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/agent_targets`,
      object
    )
    return response.data
  },
  async updateAgentTarget(object: IAgentTaget): Promise<IAgentTaget> {
    // @ts-ignore
    object.agent = `/api/users/${object.agent.id}`
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/agent_targets/${object.id}`,
      object,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )
    return response.data
  },
  async deleteAgentTarget(id: number | string): Promise<void> {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/agent_objectives/${id}`
    )
    return response.data
  },

  // AgentProfile
  async getAgentProfile(
    agentId: number | string | null
  ): Promise<IAgentProfile> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/agentProfile/${agentId}`
    )
    return response.data
  },
}
