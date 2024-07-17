import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { themeColors } from '../../../styles/mui'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { green } from '@mui/material/colors'
import { useAuth } from '../../../store/auth.store'

type LoginForm = {
  email: string
  password: string
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login, setAction, loading } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginForm>()

  const handleLogin = (data: LoginForm) => {
    login(data.email, data.password)
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} style={{ margin: '0 8px' }}>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <PersonIcon sx={{ fontSize: '40px' }} />
        <Typography variant="h4">כניסה</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          marginTop: '16px',
          marginLeft: '5px',
        }}
      >
        <Typography variant="subtitle1" color={'primary'} fontWeight={600}>
          טרם נרשמת?
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: themeColors.info,
          }}
          onClick={() => setAction('validation')}
        >
          לחץ כאן להרשמה
        </Typography>
      </Box>
      <Box>
        <FormControl fullWidth margin="normal">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'מייל שדה חובה',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'מייל אינו תקין',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                placeholder="האימייל שלך"
                label="מייל*"
                type="mail"
                error={!!errors.email}
                helperText={errors.email?.message}
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
              required: 'סיסמא שדה חובה',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="סיסמה*"
                placeholder="הסיסמה שלך"
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
        <Box sx={{ position: 'relative', marginTop: '40px' }}>
          <Button
            sx={{ height: '44px' }}
            variant="contained"
            type={!loading ? 'submit' : 'button'}
            fullWidth
          >
            {!loading && 'כניסה'}
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

        <Box sx={{ marginTop: '30px' }}>
          <Typography
            fontWeight={600}
            onClick={() => setAction('forgotPassordStepOne')}
            variant="subtitle1"
            sx={{
              cursor: 'pointer',
              textDecoration: 'underline',
              color: themeColors.info,
            }}
            color={'primary'}
          >
            שחזר סיסמה
          </Typography>
        </Box>
      </Box>
    </form>
  )
}

export default LoginForm
