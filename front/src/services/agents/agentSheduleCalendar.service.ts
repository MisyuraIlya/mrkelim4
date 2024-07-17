import axios from 'axios'
import moment from 'moment'

interface AgentObjectiveResponse {
  status: 'success' | 'error'
  data: IAgentObjective[]
  message: ''
}

export const agentSheduleCalendarService = {
  async getAgentObjective(
    agentId: number | string | null,
    dateFrom: string,
    dateTo: string
  ): Promise<AgentObjectiveResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/calendar/${agentId}/${moment(
        dateFrom
      ).format('YYYY-MM-DD')}/${moment(dateTo).format('YYYY-MM-DD')}`
    )
    return response.data
  },

  async updateIsCompleted(id: number, isCompleted: boolean) {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/agent_objectives/${id}`,
      {
        isCompleted,
        completedAt: moment().format('YYYY-MM-DD'),
      },
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )
    return response.data
  },
}
