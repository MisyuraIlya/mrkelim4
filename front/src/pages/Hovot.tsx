import React from 'react'
import Loader from '../utils/Loader'
import Utils from '../utils'
import Documents from '../components/Documents'
import { Box, Container } from '@mui/material'
import hooks from '../hooks'

const HovotPage = () => {
  const { isLoading } = hooks.useDataCartesset()
  return (
    <Container maxWidth="xl">
      {isLoading && <Loader />}
      <Box sx={{ mt: '50px' }}>
        <Utils.BreadCrumbsUtil
          array={[
            {
              title: 'גיול חובות',
              link: '',
            },
          ]}
        />
      </Box>
      <Documents.Hovot.Filter />
      <Documents.Hovot.List />
    </Container>
  )
}

export default HovotPage
