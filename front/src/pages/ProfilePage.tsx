import React from 'react'
import { Container } from '@mui/material'
import Profile from '../components/Profile'
import Utils from '../utils'

const ProfilePage = () => {
  return (
    <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
      <Utils.BreadCrumbsUtil
        array={[
          {
            title: 'פרופיל',
            link: '',
          },
        ]}
      />
      <Profile.Info />
      <Profile.Money />
      <Profile.Actions colsNumber={3} />
    </Container>
  )
}

export default ProfilePage
