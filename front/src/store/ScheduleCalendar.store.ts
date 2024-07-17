import { create } from 'zustand'
import moment from 'moment'
import { agentSheduleCalendarService } from '../services/agents/agentSheduleCalendar.service'
import { onSuccessAlert } from '../utils/MySweetAlert'
import { agentProfileService } from '../services/agents/agentProfile.service'
interface ScheduleCalendarState {
  loading: boolean
  weekFrom: string
  weekTo: string
  daysOfWeek: DayOfWeek[]
  hoursOfDay: HourOfDay[]
  handleStatus: (id: number, status: boolean) => void
  switchCalendarBackWeek: () => void
  switchCalendarForwardWeek: () => void
  selectedObjectItem: IAgentObjective | null
  setSelectedObjectItem: (value: IAgentObjective | null) => void
  createNewTask: (
    hourFrom: string,
    hourTo: string,
    description: string,
    date: string,
    agent: IUser
  ) => void
}

type DayOfWeek = 'ראשון' | 'שני' | 'שלישי' | 'רביעי' | 'חמישי' | 'שישי' | 'שבת'

export type HourOfDay =
  | '06:00'
  | '07:00'
  | '08:00'
  | '09:00'
  | '10:00'
  | '11:00'
  | '12:00'
  | '13:00'
  | '14:00'
  | '15:00'
  | '16:00'
  | '17:00'
  | '18:00'
  | '19:00'
  | '20:00'
  | '21:00'

export const useMyScheduleCalendar = create<ScheduleCalendarState>(
  (set, get) => ({
    loading: false,
    weekFrom: moment().weekday(0).format('L'),
    weekTo: moment().endOf('week').format('L'),
    handleStatus: async (id: number, status: boolean) => {
      try {
        set({ loading: true })
        const response = await agentSheduleCalendarService.updateIsCompleted(
          id,
          status
        )
        onSuccessAlert('נתונים עודכנו בהצלחה', '')
      } catch (e) {
        console.log('[ERROR] update is completed')
      } finally {
        set({ loading: false })
      }
    },
    createNewTask: async (
      hourFrom: string,
      hourTo: string,
      description: string,
      date: string,
      agent: IUser
    ) => {
      try {
        console.log('agent', agent)
        set({ loading: true })
        let obj: IAgentObjective = {
          agent: agent,
          isCompleted: false,
          completedAt: null,
          title: '',
          description,
          week1: false,
          week2: false,
          week3: false,
          week4: false,
          hourFrom,
          hourTo,
          choosedDay: moment(date).locale('he').format('dddd'),
          date,
          createdAt: moment().format('DD-MM-YYYY'),
          updatedAt: moment().format('DD-MM-YYYY'),
          objectiveType: 'task',
          subTusk: [],
        }
        await agentProfileService.createAgentObjective(obj)
      } catch (e) {
        console.log('[ERROR]', e)
      } finally {
        set({ loading: false })
      }
    },
    switchCalendarBackWeek: () => {
      const weekFromUp = moment(get().weekFrom)
        .subtract(1, 'week')
        .day(0)
        .format('L')
      const weekToUp = moment(get().weekFrom)
        .subtract(1, 'week')
        .day(6)
        .format('L')
      set({ weekFrom: weekFromUp, weekTo: weekToUp })
    },

    switchCalendarForwardWeek: () => {
      const weekFromUp = moment(get().weekFrom)
        .add(1, 'week')
        .day(0)
        .format('L')
      const weekToUp = moment(get().weekFrom).add(1, 'week').day(6).format('L')
      set({ weekFrom: weekFromUp, weekTo: weekToUp })
    },

    daysOfWeek: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
    hoursOfDay: [
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
    ],

    selectedObjectItem: null,
    setSelectedObjectItem: (value: IAgentObjective | null) =>
      set({ selectedObjectItem: value }),
  })
)
