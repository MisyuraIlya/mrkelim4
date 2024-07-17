import React, { useEffect, useState } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material'
import { useCart } from '../../../store/cart.store'
import { themeColors } from '../../../styles/mui'
import { useModals } from '../../../provider/ModalProvider'
import { useAuth } from '../../../store/auth.store'
import CartServices from '../../../services/cart.services'
import PriceCalculator from '../../../helpers/PriceClass'
import hooks from '../../../hooks'
import SendIcon from '@mui/icons-material/Send'
import { onErrorAlert, onSuccessAlert } from '../../../utils/MySweetAlert'

const Summary = () => {
  const { user, agent } = useAuth()
  const [loading, setLoading] = useState(false)
  const [tax, setTax] = useState(0)
  const { mutate } = hooks.useDataNotificationUser()
  const { selectedMode, cart, comment, setComment, sendOrder, setCart } =
    useCart()

  const { openPopUpPay, setOpenPopUpPay } = useModals()

  const handlePay = () => {
    setOpenPopUpPay(true)
  }

  const handleSendOrder = async () => {
    try {
      setLoading(true)
      if (user) {
        const response = await sendOrder(user, agent, user.discount ?? 0, true)
        if (response?.data.orderNumber) {
          onSuccessAlert(
            'הזמנה בוצה בהצלחה!',
            `מספר הזמנה ${response?.data.orderNumber}`
          )
          setCart([])
          setComment('')
        } else {
          onErrorAlert('הזמנה לא בוצעה', response?.message)
        }
        setTimeout(() => {
          mutate()
        }, 1000)
      }
    } catch (e) {
      console.log('[ERROR]', e)
    } finally {
      setLoading(false)
    }
  }

  const checkCart = async () => {
    if (user && cart.length > 0) {
      try {
        setLoading(true)
        const response = await CartServices.CheckCart(user, cart)
        setTax(response.data.maam)
      } catch (e) {
        console.log('error', e)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    checkCart()
  }, [])

  const priceCalculator = new PriceCalculator(tax, user, cart)

  const isDisabledButton = () => {
    if (priceCalculator.getCountFromMinimumPirce() > 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <Container sx={{ position: 'relative', height: '100%' }}>
      {loading ? (
        <Box sx={{ position: 'absolute', top: '35%', left: '50%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Box sx={{ textAlign: 'left' }}>
            <Typography
              variant="h4"
              fontWeight={400}
              fontSize={24}
              sx={{ paddingTop: '10px' }}
            >
              {'פרטי מסמך'}
            </Typography>
          </Box>
          <List style={{ paddingTop: '15px' }}>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0px',
              }}
            >
              <Typography variant="body1" color={themeColors.asphalt}>
                כמות שורות
              </Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {cart.length}
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0px',
              }}
            >
              <Typography
                variant="body1"
                color={themeColors.asphalt}
              >{`סה"כ לפני מע"מ`}</Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {priceCalculator.getTotalPriceBeforeTax()?.toFixed(2)} ₪
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0px',
              }}
            >
              <Typography
                variant="body1"
                color={themeColors.asphalt}
              >{`דמי משלוח`}</Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {settings?.deliveryPrice} ₪
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0px',
              }}
            >
              <Typography
                variant="body1"
                color={themeColors.asphalt}
              >{`חייב במע״מ`}</Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {priceCalculator.getTaxedPrice()?.toFixed(2)} ₪
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0px',
              }}
            >
              <Typography
                variant="body1"
                color={themeColors.asphalt}
              >{`מחיר אחרי מע״מ`}</Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {priceCalculator.getTotalPriceAfterTax()?.toFixed(2)} ₪
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0px',
              }}
            >
              <Typography
                variant="subtitle2"
                color={themeColors.primary}
                fontWeight={600}
                fontSize={16}
              >
                {'מחיר לתשלום'}
              </Typography>
              <Typography
                variant="h6"
                fontWeight={900}
                color={themeColors.primary}
              >
                {priceCalculator.getFinalPrice()} ₪
              </Typography>
            </ListItem>
          </List>

          {selectedMode.value === 'quote' && (
            <List>
              <ListItem>
                <ListItemText primary={`ללא אישור מנהל`} />
              </ListItem>
            </List>
          )}

          {settings?.minimumPrice > 0 &&
          selectedMode.value === 'order' &&
          priceCalculator.getCountFromMinimumPirce() > 0 ? (
            <Typography
              color={themeColors.primary}
              sx={{ textAlign: 'center', padding: '10px 0px' }}
            >
              {'עליך לצבור עוד ' +
                priceCalculator.getCountFromMinimumPirce()?.toFixed(2) +
                ' ש"ח עד למינימום הזמנה'}
            </Typography>
          ) : null}

          <Box sx={{ margin: '10px 0px' }}>
            <TextField
              label="הערה למשלוח"
              placeholder="הערה למשלוח"
              rows={4}
              fullWidth
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex', marginTop: '150px', gap: '50px' }}>
            <Button
              onClick={handleSendOrder}
              startIcon={<SendIcon />}
              disabled={isDisabledButton()}
              variant="contained"
              fullWidth
              sx={{ padding: '12px 26px' }}
            >
              שדר הזמנה
            </Button>
            {settings.paymentSystem !== 'none' && (
              <Button
                onClick={() => handlePay()}
                disabled={isDisabledButton()}
                variant="outlined"
                fullWidth
                sx={{ padding: '12px 26px' }}
              >
                לתשלום
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default Summary
