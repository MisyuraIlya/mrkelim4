import React, { FC, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material'
import { useModals } from '../provider/ModalProvider'
import { themeColors } from '../styles/mui'
import { useCart } from '../store/cart.store'
import AddToCart from './AddToCart'
import { useCatalog } from '../store/catalog.store'
import { useMobile } from '../provider/MobileProvider'
import { useAuth } from '../store/auth.store'

interface ProductCardProps {
  product: IProduct
  listView?: boolean
}
const ProductCard: FC<ProductCardProps> = ({ product, listView = false }) => {
  const [loading, setLoading] = useState(true)
  const { isMobile } = useMobile()
  const { getCartItem, selectedMode } = useCart()
  const { selectProduct } = useModals()
  const inCart = getCartItem(product)
  const { user } = useAuth()
  const handleImageLoad = () => {
    setLoading(false)
  }

  return (
    <Card
      elevation={0}
      sx={{
        border: inCart
          ? `1px solid ${themeColors.primary}`
          : `1px solid #E1E0E4`,
        position: 'relative',
        boxShadow: 'none',
      }}
    >
      <Grid container>
        <Grid item xs={listView ? (isMobile ? 12 : 4) : 12}>
          {product?.discount ? (
            <Chip
              label={`מבצע ${product?.discount}%`}
              color="info"
              sx={{
                position: 'absolute',
                right: '12px',
                top: '12px',
                zIndex: 10,
              }}
            />
          ) : null}
          {loading && (
            <Skeleton variant="rectangular" width="100%" height={150} />
          )}
          <CardMedia
            onClick={() => selectProduct(product)}
            component="img"
            height={!loading ? 150 : 0}
            sx={{
              display: loading ? 'hidden' : 'block',
              cursor: 'pointer',
              objectFit: 'contain',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
            image={
              product.defaultImagePath
                ? `${process.env.REACT_APP_MEDIA}/product/${product.defaultImagePath}`
                : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
            }
            alt={product.title}
            onLoad={handleImageLoad}
          />
        </Grid>
        <Grid
          item
          xs={listView ? (isMobile ? 12 : 4) : 12}
          sx={{ padding: listView ? '16px' : '0 16px', minHeight: '180px' }}
        >
          <Typography
            variant="subtitle2"
            color={themeColors.primary}
            fontWeight={600}
            lineHeight={'20px'}
            fontStyle={'normal'}
            sx={{ minHeight: '45px', paddingTop: '10px' }}
          >
            {product.title}
          </Typography>
          <Grid spacing={0} container sx={{ paddingTop: '10px' }}>
            <Grid item xs={isMobile ? 3.5 : 2.5}>
              <Typography variant="caption" color={themeColors.asphalt}>
                מק״ט:
              </Typography>
            </Grid>
            <Grid item xs={isMobile ? 8.5 : 9.5}>
              <Typography variant="caption" color={themeColors.asphalt}>
                {product?.sku}
              </Typography>
            </Grid>
            {product?.barcode && (
              <>
                <Grid item xs={isMobile ? 3.5 : 2.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    ברקוד:
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 3.5 : 9.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    {product.barcode}
                  </Typography>
                </Grid>
              </>
            )}
            <Grid item xs={isMobile ? 3.5 : 2.5}>
              <Typography variant="caption" color={themeColors.asphalt}>
                מארז:
              </Typography>
            </Grid>
            <Grid item xs={isMobile ? 3.5 : 9.5}>
              <Typography variant="caption" color={themeColors.asphalt}>
                {`${product?.packQuantity} יח'`}
              </Typography>
            </Grid>

            {product?.length && (
              <>
                <Grid item xs={isMobile ? 3.5 : 2.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    אורך:
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 3.5 : 9.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    {`${product?.length}`}
                  </Typography>
                </Grid>
              </>
            )}

            {product?.width && (
              <>
                <Grid item xs={isMobile ? 3.5 : 2.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    רוחב:
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 3.5 : 9.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    {`${product?.width}`}
                  </Typography>
                </Grid>
              </>
            )}

            {product?.height && (
              <>
                <Grid item xs={isMobile ? 3.5 : 2.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    גובה:
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 3.5 : 9.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    {`${product?.height}`}
                  </Typography>
                </Grid>
              </>
            )}

            {product?.color && (
              <>
                <Grid item xs={isMobile ? 3.5 : 2.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    צבע:
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 3.5 : 9.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    {`${product?.color}`}
                  </Typography>
                </Grid>
              </>
            )}

            {product?.volume && (
              <>
                <Grid item xs={isMobile ? 3.5 : 2.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    נפח:
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 3.5 : 9.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    {`${product?.volume}`}
                  </Typography>
                </Grid>
              </>
            )}

            {product?.diameter && (
              <>
                <Grid item xs={isMobile ? 3.5 : 2.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    קוטר:
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 3.5 : 9.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    {`${product?.diameter}`}
                  </Typography>
                </Grid>
              </>
            )}

            {product?.weight && (
              <>
                <Grid item xs={isMobile ? 3.5 : 2.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    משקל:
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 3.5 : 9.5}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    {`${product?.weight}`}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>

        <Grid
          item
          xs={listView ? (isMobile ? 12 : 4) : 12}
          sx={{
            alignItems: 'end',
            display: 'flex',
            padding: listView ? '16px' : '0',
          }}
        >
          {user && (
            <Box
              sx={{
                display: 'flex',
                gap: '12px',
                alignItems: 'end',
                width: '100%',
              }}
            >
              <Box sx={{ width: '100%' }}>
                {selectedMode.value !== 'quote' && (
                  <>
                    <Box sx={{ padding: listView ? '0' : '16px' }}>
                      {!listView && <Divider sx={{ margin: '10px 0' }} />}
                      <Box
                        sx={{ display: 'flex', gap: '12px', alignItems: 'end' }}
                      >
                        <Typography
                          variant="body1"
                          color={themeColors.primary}
                          fontWeight={500}
                          lineHeight={'21px'}
                        >
                          {product?.finalPrice} ₪
                        </Typography>
                        {product?.finalPrice < product?.basePrice &&
                          product?.finalPrice !== 0 && (
                            <Typography
                              variant="body1"
                              color={themeColors.primary}
                              fontSize={'12px'}
                              fontWeight={500}
                              lineHeight={'18px'}
                              sx={{ textDecoration: 'line-through' }}
                            >
                              {product?.basePrice} ₪
                            </Typography>
                          )}
                      </Box>
                      <Typography variant="caption" color={themeColors.asphalt}>
                        {`מחיר יח'`}
                      </Typography>
                      <Divider sx={{ margin: '10px 0' }} />
                      <Box
                        sx={{
                          display: listView ? 'flex' : 'block',
                          gap: '20px',
                          alignItems: 'end',
                          paddingBottom: '10px',
                        }}
                      >
                        <Typography
                          variant="body1"
                          color={themeColors.primary}
                          fontWeight={500}
                          lineHeight={'22px'}
                        >
                          {inCart?.total?.toFixed(2) ?? 0} ₪
                        </Typography>
                        <Typography
                          variant="caption"
                          color={
                            inCart ? themeColors.info : themeColors.asphalt
                          }
                          lineHeight={'18px'}
                          fontWeight={500}
                        >
                          {`סה״כ להזמנה ל- `}
                          {inCart?.quantity}
                          {" יח'"}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}

                <AddToCart item={product} />
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProductCard
