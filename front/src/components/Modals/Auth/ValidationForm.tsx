import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { useAuth } from '../../../store/auth.store'

type ValidationForm = {
  userExtId: string
  phone: string
}

const ValidationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ValidationForm>()
  const { validation, setAction, loading } = useAuth()

  const handleLogin = async (data: ValidationForm) => {
    await validation(data.userExtId, data.phone)
  }

  return (
    <form
      className="register"
      onSubmit={handleSubmit(handleLogin)}
      style={{ margin: '0 8px' }}
    >
      <Box sx={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
        <PersonIcon sx={{ fontSize: '50px' }} />
        <Typography variant="h4">אימות לקוח</Typography>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="userExtId"
            control={control}
            defaultValue=""
            rules={{
              required: 'מספר לקוח שדה חובה',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="מספר לקוח פנימי*"
                placeholder="הכנס את המספר שלך"
                type="text"
                error={!!errors.userExtId}
                helperText={errors.userExtId?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: 'טלפון שדה חובה',
              minLength: {
                value: 10,
                message: 'טלפון חייב להכיל לפחות 10 תווים',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                placeholder="00000000000"
                label="טלפון*"
                type="tel"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </FormControl>
        <Box sx={{ position: 'relative', marginTop: '40px' }}>
          <Button
            sx={{ height: '44px' }}
            variant="contained"
            type={!loading ? 'submit' : 'button'}
            fullWidth
          >
            {!loading && 'אימות'}
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
    </form>
  )
}

export default ValidationForm
