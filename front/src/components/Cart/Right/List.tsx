import React from 'react'
import { useCart } from '../../../store/cart.store'
import AddToCart from '../../AddToCart'
import { useModals } from '../../../provider/ModalProvider'
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
  IconButton,
  TextField,
} from '@mui/material'
import { themeColors } from '../../../styles/mui'
import DeleteIcon from '@mui/icons-material/Delete'
import { onAsk } from '../../../utils/MySweetAlert'
import { useAuth } from '../../../store/auth.store'

const List = () => {
  const { cart, deleteFromCart, changePrice, changeDiscount, changeSum } =
    useCart()
  const { selectProduct } = useModals()
  const { isAgent } = useAuth()

  const handeDelete = async (item: ICart) => {
    const ask = await onAsk(
      'למחוק מהסל',
      `למחוק מהסל את הפריט ${item.product.title}`
    )
    if (ask) {
      deleteFromCart(item.sku)
    }
  }

  return (
    <>
      <Container maxWidth="lg"></Container>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>פריט</TableCell>
              <TableCell>כמות</TableCell>
              <TableCell>מחיר</TableCell>
              <TableCell>הנחה</TableCell>
              <TableCell>סה״כ יחידה</TableCell>
              <TableCell>סה״כ להזמנה</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.map((element, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: '10px', width: '350px' }}>
                      <img
                        width={120}
                        style={{ objectFit: 'contain', height: '70px' }}
                        src={
                          element?.product?.defaultImagePath
                            ? process.env.REACT_APP_MEDIA +
                              '/product/' +
                              element?.product?.defaultImagePath
                            : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
                        }
                        onClick={() => selectProduct(element?.product)}
                      />
                      <Box
                        sx={{
                          textAlign: 'right',
                          display: 'flex',
                          justifyContent: 'right',
                          alignItems: 'center',
                        }}
                      >
                        <Box sx={{ width: '100%', textAlign: 'right' }}>
                          <Typography
                            variant="body2"
                            sx={{ textAlign: 'left' }}
                            color={themeColors.primary}
                          >
                            #{element?.product?.sku}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ textAlign: 'left' }}
                            fontWeight={800}
                            color={themeColors.primary}
                          >
                            {element?.product?.title}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: '0',
                      maxWidth: '250px',
                      zIndex: 1,
                    }}
                  >
                    <Box sx={{ paddingRight: '35px', minWidth: '150px' }}>
                      <AddToCart item={element?.product} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ minWidth: '100px' }}>
                    {isAgent ? (
                      <TextField
                        value={element?.product.finalPrice}
                        onChange={(e) => changePrice(element, +e.target.value)}
                        sx={{
                          width: '50%',
                          '& input': {
                            textAlign: 'center',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#f3f5f9',
                          },
                        }}
                      />
                    ) : (
                      <Typography variant="body1" color={themeColors.primary}>
                        {element?.product?.finalPrice} ₪{' '}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ minWidth: '100px' }}>
                    {isAgent ? (
                      <TextField
                        value={element?.discount}
                        onChange={(e) =>
                          changeDiscount(element, +e.target.value)
                        }
                        sx={{
                          width: '50%',
                          '& input': {
                            textAlign: 'center',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#f3f5f9',
                          },
                        }}
                      />
                    ) : (
                      <Typography variant="body1" color={themeColors.primary}>
                        {element?.discount} %
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ minWidth: '100px' }}>
                    {isAgent ? (
                      <TextField
                        value={element?.price}
                        onChange={(e) => changeSum(element, +e.target.value)}
                        sx={{
                          width: '50%',
                          '& input': {
                            textAlign: 'center',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#f3f5f9',
                          },
                        }}
                      />
                    ) : (
                      <Typography variant="body1" color={themeColors.primary}>
                        ₪{element?.price?.toFixed(2)}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ minWidth: '100px' }}>
                    <Typography
                      variant="subtitle2"
                      color={themeColors.primary}
                      fontWeight={700}
                    >
                      ₪{element?.total?.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box className="centered">
                      <IconButton onClick={() => handeDelete(element)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {cart?.length === 0 && (
        <Box className="centered">
          <Box sx={{ padding: '40px 0' }}>
            <img src={`${process.env.REACT_APP_MEDIA}/emptyCart.svg`} />
          </Box>
        </Box>
      )}
    </>
  )
}

export default List
