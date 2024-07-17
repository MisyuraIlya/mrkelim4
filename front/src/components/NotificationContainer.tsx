import React from 'react'
import NotificationCard from './Header/Left/NotificationCard'
import { Box, Typography } from '@mui/material'
import hooks from '../hooks'
import { themeColors } from '../styles/mui'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'

const NotificationContainer = () => {
  const { data } = hooks.useDataNotificationUser()

  return (
    <Box sx={{ width: '100%' }}>
      {data?.['hydra:member']?.map((item, index) => (
        <Box key={index}>
          <NotificationCard element={item} />
        </Box>
      ))}
      <Box>
        {data?.['hydra:member'].length === 0 && (
          <Box className="centered" sx={{ marginTop: '100px', gap: '10px' }}>
            <NotificationsOffIcon />
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: themeColors.primary,
              }}
            >
              אין הודעות
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default NotificationContainer
