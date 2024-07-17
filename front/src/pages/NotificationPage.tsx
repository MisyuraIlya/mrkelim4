import React from 'react'
import { Container, Grid } from '@mui/material'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import Admin from '../components/Admin'
const NotificationPage = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: '30px' }}>
      <BreadCrumbsUtil
        array={[
          {
            title: 'הודעות',
            link: '/admin/notification',
          },
        ]}
      />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Admin.Notification.List />
        </Grid>
        <Grid item xs={4}>
          <Admin.Notification.Edit />
        </Grid>
      </Grid>
    </Container>
  )
}

export default NotificationPage
