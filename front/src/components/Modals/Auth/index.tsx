import React, { FC } from 'react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import ForgotPasswordStepOne from './ForgotPasswordStepOne'
import ForgotPasswordStepTwo from './ForgotPasswordStepTwo'
import ValidationForm from './ValidationForm'
import { Box, IconButton, Modal, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useAuth } from '../../../store/auth.store'

type AuthPopUpProps = {
  active: boolean
  setActive: (bol: boolean) => void
}

const Auth: FC<AuthPopUpProps> = ({ active, setActive }) => {
  const { loading, action, login, registration, validation } = useAuth()
  return (
    <Modal
      open={active}
      onClose={() => setActive(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={9}
        sx={{
          width: '400px',
          margin: '20px',
          padding: '40px',
          outline: 'none',
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', right: '10px', top: '10px' }}>
          <IconButton onClick={() => setActive(false)}>
            <CloseIcon sx={{ fontSize: '35px', cursor: 'pointer' }} />
          </IconButton>
        </Box>
        {action === 'login' && <LoginForm />}
        {action === 'register' && <RegistrationForm />}
        {action === 'forgotPassordStepOne' && <ForgotPasswordStepOne />}
        {action === 'forgotPassordStepTwo' && <ForgotPasswordStepTwo />}
        {action === 'validation' && <ValidationForm />}
      </Paper>
    </Modal>
  )
}

export default Auth
