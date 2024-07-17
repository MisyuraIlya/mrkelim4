import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../enums/urls'

const Logo = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <img
        style={{ cursor: 'pointer' }}
        src={`${process.env.REACT_APP_MEDIA}/logo.png`}
        width={100}
        onClick={() => navigate(URLS.HOME.LINK)}
      />
    </Box>
  )
}

export default Logo
