import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { themeColors } from '../../../styles/mui'
import { useAuth } from '../../../store/auth.store'

type RegistrationForm = {
  email: string
  password: string
  confirmPassword: string
  token: string
  privacy: string | boolean
}

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationForm>()
  const [acceptCondition, setAcceptCondition] = useState(false)
  const { registration, userExtId, phone, setAction, loading } = useAuth()

  const handleLogin = (data: RegistrationForm) => {
    // if(!acceptCondition) {
    //     onErrorAlert('אנא אשר את תנאי שימוש')
    // }
    registration(userExtId, data.email, data.password, phone, data.token)
  }

  return (
    <form className="login" onSubmit={handleSubmit(handleLogin)}>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <PersonIcon sx={{ fontSize: '40px' }} />
        <Typography variant="h4">הרשמה</Typography>
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
          כבר יש לך חשבון?
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: themeColors.info,
          }}
          onClick={() => setAction('login')}
        >
          כניסה
        </Typography>
      </Box>
      <Box sx={{ marginTop: '10px' }}>
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
                label="סיסמא*"
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
              required: 'סיסמא שדה חובה',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="סיסמא*"
                type={showPassword2 ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword2(!showPassword2)}
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
                type="mail"
                error={!!errors.token}
                helperText={errors.token?.message}
              />
            )}
          />
        </FormControl>
        <FormControlLabel
          sx={{ marginTop: '10px' }}
          control={
            <Controller
              name="privacy"
              control={control}
              defaultValue={false}
              render={({ field }) => <Checkbox {...field} color="primary" />}
            />
          }
          label="אנא קרא והסכם לתנאי שימוש"
        />
        <Box sx={{ position: 'relative', marginTop: '40px' }}>
          <Button
            sx={{ height: '44px' }}
            variant="contained"
            type={!loading ? 'submit' : 'button'}
            fullWidth
          >
            {!loading && 'הרשמה'}
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

export default RegistrationForm
