import { Chip } from '@mui/material'

export const UserStatus = (user: IUser) => {
  if (user.isRegistered) {
    if (user.isBlocked) {
      return (
        <Chip
          variant="outlined"
          sx={{ minWidth: '100px' }}
          label="לקוח חסום"
          color="error"
        />
      )
    } else {
      return (
        <Chip
          variant="outlined"
          sx={{ minWidth: '100px' }}
          label="לקוח פעיל"
          color="success"
        />
      )
    }
  } else {
    return (
      <Chip
        variant="outlined"
        sx={{ minWidth: '100px' }}
        label="לקוח לא פעיל"
        color="info"
      />
    )
  }
}

export const DocumentsStatus = () => {}
