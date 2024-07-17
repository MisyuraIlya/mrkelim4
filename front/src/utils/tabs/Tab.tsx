import { Tab as MuiTab } from '@mui/material'

type Props = {
  label: string
  children: JSX.Element | JSX.Element[]
}

export const Tab = ({ label }: Props) => <MuiTab label={label} />
