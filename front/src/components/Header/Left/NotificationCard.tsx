import React, { FC, useState } from 'react'
import './NotificationCard.styles.scss'
import moment from 'moment'
import { useOneSignalStore } from '../../../store/oneSignal.store'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CardMedia,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { themeColors } from '../../../styles/mui'
import hooks from '../../../hooks'

interface NotificationCardProps {
  element: INotificationUser
}
const NotificationCard: FC<NotificationCardProps> = ({ element }) => {
  const { updateNotificationUser } = hooks.useDataNotificationUser()

  const handleRead = () => {
    updateNotificationUser({ id: element.id, isRead: true })
  }

  return (
    <>
      <Accordion sx={{ width: '100%', margin: '20px 0px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box sx={{ gap: '10px', display: 'flex' }}>
              <NotificationsNoneOutlinedIcon />
              <Typography>הודעה</Typography>
            </Box>
            <Typography>
              {moment(element.notification.createdAt).format('DD-MM-YYYY')}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="h6"
            sx={{ color: themeColors.primary, textDecoration: 'underline' }}
          >
            {element.notification.title}
          </Typography>
          <Typography variant="body2">
            {element.notification.description}
          </Typography>
          <CardMedia
            component="img"
            sx={{
              marginTop: '20px',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
            src={
              element?.notification?.image?.filePath
                ? `${process.env.REACT_APP_MEDIA}/notifications/${element?.notification?.image?.filePath}`
                : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
            }
          />
          <Box sx={{ marginTop: '10px' }}>
            <Button
              variant="outlined"
              startIcon={<CheckOutlinedIcon />}
              onClick={() => handleRead()}
            >
              קראתי
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
export default NotificationCard
