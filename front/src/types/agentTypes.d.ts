interface IAgentTaget {
  id: number | null
  agent: IUser | null
  month: string
  year: string | null
  currentValue: number | null
  targetValue: number | null
  isCompleted: boolean | null
}

type objectiveTypes = 'visit' | 'task' | 'mix'

interface IAgentObjective {
  id?: number
  agent: IUser
  client?: IUser | null
  isCompleted: boolean
  completedAt: strin
  title: string
  description: string
  week1: boolean
  week2: boolean
  week3: boolean
  week4: boolean
  hourFrom: string
  hourTo: string
  choosedDay: string
  date: string
  createdAt: string
  updatedAt: string
  objectiveType: objectiveTypes
  subTusk: IAgentObjective[]
}

interface IAgentProfile {
  totalPriceMonth: number
  totalPriceYear: number
  averageBasket: number
  totalClients: number

  totalPriceDay: number
  totalDayCount: number

  totalMissions: number
  targetPrecent: number
}

//MERGE VISIT WITH OBJECTIVE the same
// interface IAgnetVisit {
//   id: number;
//   completed: boolean;
//   completedDate: null | string;
//   description: null | string;
//   week1: boolean;
//   week2: boolean;
//   week3: boolean;
//   week4: boolean;
//   choosedDay: string;
//   hourFrom: string;
//   hourTo: string;
//   agentId: string;
//   clientName: string;
//   clientCompany: null | string;
//   clientCode: null | string;
//   clientContact: string;
//   clientBusinessId: null | string;
//   clientAddress: string;
//   clientStatus: null | string;
//   clientPaymentMethod: null | string;
//   clientCreationDate: null | string;
//   clientEmail: null | string;
//   date: string;
//   unpublished: boolean;
// }

interface IPerformanceInfo {
  totalOrderSum: number
  dailySalesSum: number
  dailySalesQuantity: number
  minDate: string
  maxDate: string
  ordersQuantity: number
  monthsQuantityByOrderDates: number
  monthlyAverage: number
  clientsAssigned: number
  monthlySalesSum: number
  targetPercentage: number
}
type typeTask = 'visit' | 'objective'

interface IAgentTask {
  agentId: string
  uniqueId: number
  typeTask: typeTask
  dayOfWeek: string
  date: string
  endHour: string
  startHour: string
  typeId: string
  type: string
  mission: string
  visit: string
  idDocument: number
  tableName: string
  description: string
  completedDate: string | null
  completed: boolean
}

// interface IObjective {
//   id: number
//   hourFrom: number
//   hourTo: number
//   compleated: boolean
//   compleatedDate: string
//   description: string
//   agent: IUser
// }

interface ITodayObjectives {
  visitsTotal: number
  visitsCompleted: number
  objectiveTotal: number
  objectiveCompleted: number
}

interface IGoals {
  name: string
  value: number
  strokeColor: string
}

interface IMonthAgenthSale {
  y: number
  x: string
  goals: IGoals[]
}

interface IScheduleCalendar {
  agentId: number
  uniqueId: number
  dayOfWeek: string
  date: string
  endHour: string
  startHour: string
  typeId: number
  type: typeTask
  mission: string
  visit: string
  idDocument: number
  tableName: string
  description: string
  completedDate: string
  completed: boolean
  subTusk: IAgentTask[]
}
