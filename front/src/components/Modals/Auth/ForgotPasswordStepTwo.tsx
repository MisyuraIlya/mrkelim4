import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { useModals } from '../../../provider/ModalProvider'
import { useAuth } from '../../../store/auth.store'

type ForgotPasswordStepTwo = {
  token: string
  password: string
  confirmPassword: string
}

const ForgotPasswordStepTwo = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ForgotPasswordStepTwo>()
  const { restorePasswordStepTwo, email, setAction } = useAuth()
  const { setOpenAuthModal } = useModals()

  const handleLogin = (data: ForgotPasswordStepTwo) => {
    restorePasswordStepTwo(email, data.token, data.password)
    setAction('login')
  }

  return (
    <form className="login" onSubmit={handleSubmit(handleLogin)}>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <PersonIcon sx={{ fontSize: '40px' }} />
        <Typography variant="h4">שחזור סיסמא</Typography>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="token"
            control={control}
            defaultValue=""
            rules={{
              required: 'קוד סודי שדה חובה',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="קוד סודי*"
                type="text"
                error={!!errors.token}
                helperText={errors.token?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: ' סיסמא שדה חובה',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="סיסמא"
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon color="primary" />
                      ) : (
                        <RemoveRedEyeOutlinedIcon color="primary" />
                      )}
                    </IconButton>
                  ),
                }}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: ' אימות סיסמא שדה חובה',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="אימות סיסמא"
                type={showPassword2 ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword2(!showPassword2)}
                      edge="end"
                    >
                      {showPassword2 ? (
                        <VisibilityOffOutlinedIcon color="primary" />
                      ) : (
                        <RemoveRedEyeOutlinedIcon color="primary" />
                      )}
                    </IconButton>
                  ),
                }}
              />
            )}
          />
        </FormControl>
        <Button
          sx={{ marginTop: '30px' }}
          fullWidth={true}
          type="submit"
          variant="contained"
          color="primary"
        >
          שינוי סיסמא
        </Button>
      </Box>
    </form>
  )
}

export default ForgotPasswordStepTwo
