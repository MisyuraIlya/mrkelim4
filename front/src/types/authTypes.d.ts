type ROLE_TYPES = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_AGENT' | 'ROLE_SUPER_AGENT'

interface IUser {
  id?: number
  extId: string
  email: string | null
  isRegistered: boolean
  isBlocked: boolean
  name: string
  phone: string
  city: string
  address: string
  createdAt: string
  updatedAt: string
  discount: number
  roles?: Array<'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_AGENT' | 'ROLE_SUPER_AGENT'>
  role: ROLE_TYPES
  isAllowOrder: boolean
  isAllowAllClients: boolean
  passwordUnencrypted: string | null
  password?: string
  payCode: string
  payDesc: float
  maxCredit: float
  maxObligo: float
  hp: string
  taxCode: string
  agentId: IUser
  isAgent: boolean
}

interface IAtarim {
  address: string
  city: string
  extId: string
  id: number
  title: string
}

interface ITokens {
  token: string
  refresh_token: string
}
interface IAuthResponse extends ITokens {
  status: string
  user: IUser
}

interface IDefaultAuthResponse {
  status: 'success' | 'error'
  data: null
  message: string
}

interface validationData {
  exId: string
  name: string
}
interface IValidationResponse {
  status: 'success' | 'error'
  data: validationData
  message: string
}

interface IRegistrationResponse {
  status: 'success' | 'error'
  data: null
  message: string
}

interface formNewB2bForm {
  fullName: string
  phone: string
  town: string
  address: string
  email: string
  password: string
  business: string
  confirmPassword: string
}

interface UserDocs {
  EXTFILEDES: string
  CURDATE: string
  EXTFILENAME: string
  SUFFIX: 'pdf' | 'png'
}

interface createUserDoc {
  userExtId: string
  title: string
  base64Pdf: string
}

interface UsersResponse extends Hydra {
  'hydra:member': IUser[]
}
