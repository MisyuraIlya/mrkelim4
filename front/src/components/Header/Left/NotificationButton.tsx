import React, { useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {
  Badge,
  Box,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { themeColors } from '../../../styles/mui'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import NotificationCard from './NotificationCard'
import hooks from '../../../hooks'
import { useMobile } from '../../../provider/MobileProvider'

const NotificationButton = () => {
  const [openDrawver, setOpenDrawver] = useState(false)
  const { data } = hooks.useDataNotificationUser()
  const { isMobile } = useMobile()
  return (
    <>
      <Badge badgeContent={data?.['hydra:totalItems'] ?? 0}>
        <IconButton
          onClick={() => setOpenDrawver(true)}
          sx={{
            height: '50px',
            width: '50px',
            border: isMobile ? 'none' : '1px solid #E0E0E0',
          }}
        >
          <Tooltip title={'הודעות'}>
            <NotificationsIcon />
          </Tooltip>
        </IconButton>
      </Badge>
      <Drawer
        anchor="right"
        open={openDrawver}
        onClose={() => setOpenDrawver(false)}
      >
        <Box sx={{ width: '300px' }} className="centered">
          <Box sx={{ width: '90%' }}>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: themeColors.primary,
                marginTop: '20px',
              }}
            >
              הודעות
            </Typography>
            <Box sx={{ width: '100%' }}>
              {data?.['hydra:member']?.map((item, index) => (
                <Box key={index}>
                  <NotificationCard element={item} />
                </Box>
              ))}
              <Box>
                {data?.['hydra:member'].length === 0 && (
                  <Box
                    className="centered"
                    sx={{ marginTop: '100px', gap: '10px' }}
                  >
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
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default NotificationButton
