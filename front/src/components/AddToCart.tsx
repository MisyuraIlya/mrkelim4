import React, { FC, useState } from 'react'
import { Input, Grid, IconButton, Box, Typography } from '@mui/material'
import { useCart } from '../store/cart.store'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { themeColors } from '../styles/mui'
import { useModals } from '../provider/ModalProvider'
import { useAuth } from '../store/auth.store'
import { onInfoAlert } from '../utils/MySweetAlert'

interface AddToCartProps {
  item: IProduct
}

const AddToCart: FC<AddToCartProps> = ({ item }) => {
  const {
    cart,
    addToCart,
    increaseCart,
    decreaseCart,
    deleteFromCart,
    changeQuantity,
  } = useCart()
  const { user } = useAuth()
  const find = cart?.filter((itemCart) => itemCart?.sku === item?.sku)
  const Quantity = find[0]?.quantity
  const isInCart = find[0]?.sku ? true : false
  const { setNotifyStock, setNotifyAddTocart } = useModals()
  const { selectedMode } = useCart()

  const addToCartFunc = () => {
    if (!user) {
      onInfoAlert('לא ניתן להוסיף לסל', 'צריך להכנס למערכת')
      return
    }
    if (settings.isWithStock) {
      if (item?.stock >= item.packQuantity || selectedMode.value === 'quote') {
        addToCart(item)
        setNotifyAddTocart(true)
      } else {
        setNotifyStock(true)
      }
    } else {
      addToCart(item)
      setNotifyAddTocart(true)
    }
  }

  const increaseCartFunc = () => {
    if (settings.isWithStock) {
      if (item?.stock > Quantity || selectedMode.value === 'quote') {
        increaseCart(item.sku)
      } else {
        setNotifyStock(true)
      }
    } else {
      increaseCart(item.sku)
    }
  }

  const onChangeQuantityFunc = (value: number) => {
    if (settings.isWithStock) {
      if (
        item?.stock >= value * item.packQuantity ||
        selectedMode.value === 'quote'
      ) {
        changeQuantity(item.sku, value)
      } else {
        setNotifyStock(true)
      }
    } else {
      changeQuantity(item.sku, value)
    }
  }

  const handleTitleButton = () => {
    if (selectedMode.value === 'order') {
      return 'הוספה לסל'
    } else if (selectedMode.value === 'quote') {
      return 'הוספה להצעת מחיר'
    } else if (selectedMode.value === 'return') {
      return 'הוספה להחזרה'
    }
  }

  return (
    <Grid className="centered" style={{ padding: '0px', margin: '0px' }}>
      {isInCart ? (
        <>
          <Grid
            item
            xs={12}
            container
            sx={{ backgroundColor: themeColors.primary, borderRadius: '4px' }}
          >
            <Grid
              item
              xs={4}
              className="centered"
              sx={{ borderRight: '1px solid white' }}
            >
              <IconButton
                onClick={() => increaseCartFunc()}
                sx={{ borderRadius: '0px', width: '100%' }}
              >
                <AddIcon sx={{ color: 'white' }} />
              </IconButton>
            </Grid>
            <Grid item xs={4} className="centered">
              <Input
                type="text"
                value={Quantity}
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  '& input': {
                    textAlign: 'center',
                    justifyContent: 'center',
                  },
                  '&::before': {
                    borderBottom: '0px !important',
                  },
                  '&::after': {
                    borderBottom: '0px',
                  },
                  '&:hover': {
                    borderBottom: '0px',
                  },
                }}
                onChange={(e) => onChangeQuantityFunc(parseInt(e.target.value))}
              />
            </Grid>
            <Grid
              item
              xs={4}
              className="centered"
              sx={{ borderLeft: '1px solid white' }}
            >
              <IconButton
                onClick={
                  isInCart && Quantity > 1
                    ? () => decreaseCart(item.sku)
                    : () => deleteFromCart(item.sku)
                }
                sx={{ borderRadius: '0px', width: '100%' }}
              >
                <RemoveIcon sx={{ color: 'white' }} />
              </IconButton>
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid
          item
          container
          style={{ padding: '0px' }}
          onClick={isInCart ? undefined : () => addToCartFunc()}
        >
          <Grid
            item
            xs={12}
            className="centered"
            sx={{
              bgcolor: '#F6F6F6',
              cursor: 'pointer',
              height: '40px',
              color: themeColors.primary,
              '&:hover': {
                background: themeColors.primary,
                color: 'white',
              },
            }}
          >
            <Typography variant="button">{handleTitleButton()}</Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default AddToCart
