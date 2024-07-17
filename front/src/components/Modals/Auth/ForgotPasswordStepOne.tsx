import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { useAuth } from '../../../store/auth.store'
import { useModals } from '../../../provider/ModalProvider'

type ForgotPasswordStepOne = {
  phone: string
}

const ForgotPasswordStepOne = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ForgotPasswordStepOne>()
  const { restorePasswordStepOne, setAction, setEmail } = useAuth()
  const { setOpenAuthModal } = useModals()

  const handleLogin = (data: ForgotPasswordStepOne) => {
    restorePasswordStepOne(data.phone)
    setEmail(data.phone)
    setAction('forgotPassordStepTwo')
  }

  return (
    <form className="login" onSubmit={handleSubmit(handleLogin)}>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <PersonIcon sx={{ fontSize: '40px' }} />
        <Typography variant="h4">שחזור סיסמא</Typography>
      </Box>
      <Box sx={{ marginTop: '40px' }}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: 'מספר טלפון',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="טלפון*"
                placeholder="00000000000"
                type="tel"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </FormControl>
        <Button
          sx={{ marginTop: '30px', height: '44px' }}
          fullWidth={true}
          type="submit"
          variant="contained"
          color="primary"
        >
          שלח קוד סודי
        </Button>
      </Box>
    </form>
  )
}

export default ForgotPasswordStepOne
