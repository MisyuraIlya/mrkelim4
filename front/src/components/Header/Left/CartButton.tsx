import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Badge, IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../enums/urls'
import { useCart } from '../../../store/cart.store'

const CartButton = () => {
  const navigate = useNavigate()
  const { cart } = useCart()
  return (
    <Badge badgeContent={cart?.length}>
      <IconButton
        onClick={() => navigate(URLS.CART.LINK)}
        sx={{
          height: '50px',
          width: '50px',
          border: '1px solid #E0E0E0',
        }}
      >
        <Tooltip title={'עגלה'}>
          <ShoppingCartIcon />
        </Tooltip>
      </IconButton>
    </Badge>
  )
}

export default CartButton
