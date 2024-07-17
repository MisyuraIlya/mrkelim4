import { Box, Container } from '@mui/material'
import React from 'react'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import Admin from '../components/Admin'

const HomeEditPage = () => {
  return (
    <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
      <BreadCrumbsUtil
        array={[
          {
            title: 'ניהול עמוד בית',
            link: '',
          },
        ]}
      />
      {/* {isLoading && <Loader />} */}
      <Admin.HomeEdit.Options />
      <Box sx={{ paddingTop: '16px' }}>
        <Admin.HomeEdit.List />
      </Box>
    </Container>
  )
}

export default HomeEditPage
