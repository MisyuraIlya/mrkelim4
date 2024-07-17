import React from 'react'
import { Box, Container, Divider, Grid } from '@mui/material'
import Cart from '../components/Cart'
import Utils from '../utils'

const CartPage = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={9}>
        <Box sx={{ mt: '20px', padding: '0 20px' }}>
          <Utils.BreadCrumbsUtil
            array={[
              {
                title: 'עגלה',
                link: '',
              },
            ]}
          />
        </Box>
        <Cart.Right.Options />
        <Cart.Right.List />
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        sx={{
          position: {
            xs: { position: 'fixed' },
            sm: { position: 'relative' },
          },
          right: '0px',
          top: '0px',
          width: '100%',
          height: 'auto',
          minHeight: '100vh',
        }}
      >
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            position: 'fixed',
            height: '100vh',
            width: '2px',
            top: 0,
            zIndex: 9,
          }}
        />
        <Box sx={{ position: 'sticky', top: '150px' }}>
          <Cart.Left.Summary />
        </Box>
      </Grid>
    </Grid>
  )
}

export default CartPage
