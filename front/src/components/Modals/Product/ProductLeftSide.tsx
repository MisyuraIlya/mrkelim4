import React from 'react'
import { useSelectedProduct } from '../../../store/selecterdProduct.store'
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  Link,
  TextField,
} from '@mui/material'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import { useCart } from '../../../store/cart.store'
import { useMobile } from '../../../provider/MobileProvider'
import { themeColors } from '../../../styles/mui'
import { useAuth } from '../../../store/auth.store'
import AddToCart from '../../AddToCart'

const ProductLeftSide = () => {
  const { user, isAgent } = useAuth()
  const { selectedProd } = useSelectedProduct()
  const { isMobile } = useMobile()
  const {
    getCartItem,
    selectedMode,
    changePrice,
    changeDiscount,
    changeSum,
    addToCart,
  } = useCart()

  const inCart = getCartItem(selectedProd)

  const handleChangePrice = (value: number) => {
    if (!inCart) {
      addToCart(selectedProd)
    }
    const itemCart = getCartItem(selectedProd)
    changePrice(itemCart!, value)
  }

  const handleChangeDiscount = (value: number) => {
    if (!inCart) {
      addToCart(selectedProd)
    }
    const itemCart = getCartItem(selectedProd)
    changeDiscount(itemCart!, value)
  }

  const handleChangeSum = (value: number) => {
    if (!inCart) {
      addToCart(selectedProd)
    }
    const itemCart = getCartItem(selectedProd)
    changeSum(itemCart!, value)
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        {selectedProd?.title}
      </Typography>
      {selectedProd?.sku && (
        <Grid container sx={{ marginTop: '20px' }}>
          <Grid item xs={4}>
            <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
              {'מספר קטלוגי'}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
              {selectedProd?.sku}
            </Typography>
          </Grid>
        </Grid>
      )}
      {selectedProd?.link && (
        <Grid container sx={{ margin: '10px 0px' }}>
          <Grid item xs={4}>
            <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
              {selectedProd?.linkTitle}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Link
              href={selectedProd?.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton>
                <InsertLinkOutlinedIcon />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      )}
      {selectedProd?.packQuantity && (
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
              {'יחידות במארז'}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
              {selectedProd?.packQuantity}
            </Typography>
          </Grid>
        </Grid>
      )}
      {selectedProd?.length && (
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" color={themeColors.asphalt}>
              אורך:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" color={themeColors.asphalt}>
              {`${selectedProd?.length}`}
            </Typography>
          </Grid>
        </Grid>
      )}

      {selectedProd?.width && (
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" color={themeColors.asphalt}>
              רוחב:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" color={themeColors.asphalt}>
              {`${selectedProd?.width}`}
            </Typography>
          </Grid>
        </Grid>
      )}

      {selectedProd?.height && (
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" color={themeColors.asphalt}>
              גובה:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" color={themeColors.asphalt}>
              {`${selectedProd?.height}`}
            </Typography>
          </Grid>
        </Grid>
      )}

      {selectedProd?.color && (
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" color={themeColors.asphalt}>
              צבע:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" color={themeColors.asphalt}>
              {`${selectedProd?.color}`}
            </Typography>
          </Grid>
        </Grid>
      )}

      {selectedProd?.volume && (
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" color={themeColors.asphalt}>
              נפח:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" color={themeColors.asphalt}>
              {`${selectedProd?.volume}`}
            </Typography>
          </Grid>
        </Grid>
      )}

      {selectedProd?.diameter && (
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" color={themeColors.asphalt}>
              קוטר:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" color={themeColors.asphalt}>
              {`${selectedProd?.diameter}`}
            </Typography>
          </Grid>
        </Grid>
      )}

      {selectedProd?.weight && (
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" color={themeColors.asphalt}>
              משקל:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" color={themeColors.asphalt}>
              {`${selectedProd?.weight}`}
            </Typography>
          </Grid>
        </Grid>
      )}

      {user && (
        <>
          {selectedMode.value !== 'quote' && (
            <>
              <Divider sx={{ margin: '24px 0' }} />
              <Grid container sx={{ margin: '10px 0px' }}>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    sx={{ color: themeColors.asphalt }}
                  >
                    {"מחיר יח'"}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{ display: 'flex', gap: '10px', alignItems: 'end' }}
                >
                  {isAgent ? (
                    <Box sx={{ marginBottom: '10px' }}>
                      <TextField
                        value={
                          inCart?.product.finalPrice ?? selectedProd.finalPrice
                        }
                        onChange={(e) => handleChangePrice(+e.target.value)}
                        placeholder="מחיר יח'"
                        sx={{
                          '& input': {
                            width: '70px',
                            textAlign: 'center',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#f3f5f9',
                          },
                        }}
                      />
                    </Box>
                  ) : (
                    <Typography
                      variant="h5"
                      lineHeight={'25px'}
                      fontSize={'20px'}
                    >
                      ₪{selectedProd?.finalPrice}
                    </Typography>
                  )}

                  {!isAgent &&
                    selectedProd?.finalPrice < selectedProd?.basePrice && (
                      <Typography
                        variant="subtitle1"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ₪{selectedProd?.basePrice}
                      </Typography>
                    )}
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    sx={{ color: themeColors.asphalt }}
                  >
                    {'הנחה'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{ display: 'flex', gap: '10px', alignItems: 'end' }}
                >
                  {isAgent ? (
                    <Box sx={{ marginBottom: '10px' }}>
                      <TextField
                        value={inCart?.discount ?? selectedProd?.discount}
                        onChange={(e) => handleChangeDiscount(+e.target.value)}
                        sx={{
                          '& input': {
                            width: '70px',
                            textAlign: 'center',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#f3f5f9',
                          },
                        }}
                      />
                    </Box>
                  ) : (
                    <Typography
                      variant="h5"
                      lineHeight={'25px'}
                      fontSize={'20px'}
                    >
                      {inCart?.discount}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    sx={{ color: themeColors.asphalt }}
                  >
                    {'סה"כ ליחידה'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{ display: 'flex', gap: '10px', alignItems: 'end' }}
                >
                  {isAgent ? (
                    <Box sx={{ marginBottom: '10px' }}>
                      <TextField
                        value={inCart?.price ?? selectedProd.finalPrice}
                        onChange={(e) => handleChangeSum(+e.target.value)}
                        sx={{
                          '& input': {
                            width: '70px',
                            textAlign: 'center',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#f3f5f9',
                          },
                        }}
                      />
                    </Box>
                  ) : (
                    <Typography
                      variant="h5"
                      lineHeight={'25px'}
                      fontSize={'20px'}
                    >
                      ₪{inCart?.price}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    sx={{ color: themeColors.asphalt }}
                  >
                    {"יח' להזמנה"}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{ display: 'flex', gap: '10px', alignItems: 'end' }}
                >
                  <Typography
                    variant="h5"
                    lineHeight={'25px'}
                    fontSize={'20px'}
                  >
                    {inCart?.quantity}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ margin: '24px 0' }} />
            </>
          )}

          <Box
            sx={{
              display: isMobile ? 'block' : 'flex',
              justifyContent: 'space-between',
              marginTop: selectedMode.value === 'quote' ? '250px' : '50px',
            }}
          >
            {selectedMode.value !== 'quote' && (
              <Box sx={{ display: 'flex', gap: '100px', alignItems: 'center' }}>
                {inCart?.total > 0 && (
                  <>
                    <Typography variant="subtitle1" sx={{ color: '#2196F3' }}>
                      סה״כ להזמנה
                    </Typography>
                    <Typography variant="h5">
                      ₪{inCart?.total.toFixed(2)}
                    </Typography>
                  </>
                )}
              </Box>
            )}

            <Box
              sx={{
                width: { sm: '50%', xs: '100%' },
                paddingTop: { sm: '0px', xs: '30px' },
              }}
            >
              {user && selectedMode ? <AddToCart item={selectedProd} /> : null}
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default ProductLeftSide
