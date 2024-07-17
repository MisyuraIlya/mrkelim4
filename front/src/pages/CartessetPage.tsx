import React from 'react'
import Loader from '../utils/Loader'
import Utils from '../utils'
import Documents from '../components/Documents'
import { Box, Container } from '@mui/material'
import hooks from '../hooks'

const CartessetPage = () => {
  const { isLoading } = hooks.useDataCartesset()
  return (
    <Container maxWidth="xl">
      {isLoading && <Loader />}
      <Box sx={{ mt: '50px' }}>
        <Utils.BreadCrumbsUtil
          array={[
            {
              title: 'כרטסת',
              link: '',
            },
          ]}
        />
      </Box>
      <Documents.Cartesset.Filter />
      <Documents.Cartesset.List />
    </Container>
  )
}

export default CartessetPage
