export const MONTH_HEBREW_1 = [
  {
    id: 1,
    name: 'ינואר',
  },
  {
    id: 2,
    name: 'פבואר',
  },
  {
    id: 3,
    name: 'מרץ',
  },
  {
    id: 4,
    name: 'אפריל',
  },
  {
    id: 5,
    name: 'מאי',
  },
  {
    id: 6,
    name: 'יוני',
  },
  {
    id: 7,
    name: 'יולי',
  },
  {
    id: 8,
    name: 'אוגוסט',
  },
  {
    id: 9,
    name: 'ספטמבר',
  },
  {
    id: 10,
    name: 'אוקטובר',
  },
  {
    id: 11,
    name: 'נובמבר',
  },
  {
    id: 12,
    name: 'דצמבר',
  },
]
export const MONTH_HEBREW_2 = [
  'ינואר',
  'פבואר',
  'מרץ',
  'אפריל',
  'מאי',
  'יוני',
  'יולי',
  'אוגוסט',
  'ספטמבר',
  'אוקטובר',
  'נובמבר',
  'דצמבר',
]

export const MONTH_HEBREW_3 = [
  { value: 'ינואר', label: 'ינואר' },
  { value: 'פבואר', label: 'פבואר' },
  { value: 'מרץ', label: 'מרץ' },
  { value: 'אפריל', label: 'אפריל' },
  { value: 'מאי', label: 'מאי' },
  { value: 'יוני', label: 'יוני' },
  { value: 'יולי', label: 'יולי' },
  { value: 'אוגוסט', label: 'אוגוסט' },
  { value: 'ספטמבר', label: 'ספטמבר' },
  { value: 'אוקטובר', label: 'אוקטובר' },
  { value: 'נובמבר', label: 'נובמבר' },
  { value: 'דצמבר', label: 'דצמבר' },
]

export const ReactSelectOptionsOfFullHour = [
  {
    value: '06:00',
    label: '06:00',
  },
  {
    value: '07:00',
    label: '07:00',
  },
  {
    value: '08:00',
    label: '08:00',
  },
  {
    value: '09:00',
    label: '09:00',
  },
  {
    value: '10:00',
    label: '10:00',
  },
  {
    value: '11:00',
    label: '11:00',
  },
  {
    value: '12:00',
    label: '12:00',
  },
  {
    value: '13:00',
    label: '13:00',
  },
  {
    value: '14:00',
    label: '14:00',
  },
  {
    value: '15:00',
    label: '15:00',
  },
  {
    value: '16:00',
    label: '16:00',
  },
  {
    value: '17:00',
    label: '17:00',
  },
  {
    value: '18:00',
    label: '18:00',
  },
  {
    value: '19:00',
    label: '19:00',
  },
  {
    value: '20:00',
    label: '20:00',
  },
  {
    value: '21:00',
    label: '21:00',
  },
  {
    value: '22:00',
    label: '22:00',
  },
]

export const HEBREW_DAYS = [
  { value: 'ראשון', label: 'ראשון' },
  { value: 'שני', label: 'שני' },
  { value: 'שלישי', label: 'שלישי' },
  { value: 'רביעי', label: 'רביעי' },
  { value: 'חמישי', label: 'חמישי' },
  { value: 'שישי', label: 'שישי' },
  { value: 'שבת', label: 'שבת' },
]

export const findMonthNumber = (name: string): number | null => {
  const res = MONTH_HEBREW_1.find((item) => item.name == name)
  if (res) {
    return res.id
  } else {
    return null
  }
}

export const findMonthName = (
  id: number
): { value: null | string; label: null | string } => {
  const res = MONTH_HEBREW_1.find((item) => item.id == id)
  if (res) {
    return { value: res.name, label: res.name }
  } else {
    return { value: null, label: null }
  }
}

export const ConvertNumberToHebrewMonth = (number: string) => {
  switch (number) {
    case '1':
      return 'ינואר'
    case '2':
      return 'פבואר'
    case '3':
      return 'מרץ'
    case '4':
      return 'אפריל'
    case '5':
      return 'מאי'
    case '6':
      return 'יוני'
    case '7':
      return 'יולי'
    case '8':
      return 'אוגוסט'
    case '9':
      return 'ספטמבר'
    case '10':
      return 'אוקטובר'
    case '11':
      return 'נובמבר'
    case '12':
      return 'דצמבר'
  }
}
