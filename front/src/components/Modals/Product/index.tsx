import React, { FC } from 'react'
import ProductLeftSide from './ProductLeftSide'
import ProductRightSide from './ProductRightSide'
import { Box, Button, Grid } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import { useModals } from '../../../provider/ModalProvider'
import Modals from '../../../components/Modals'
import { useMobile } from '../../../provider/MobileProvider'
import { useSelectedProduct } from '../../../store/selecterdProduct.store'
import { useAuth } from '../../../store/auth.store'
type ProductPopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const Product: FC<ProductPopUpProps> = ({ active, setActive }) => {
  const { setActivePurchase } = useModals()
  const { selectedProd } = useSelectedProduct()
  const { isMobile } = useMobile()
  const { user } = useAuth()
  const share = () => {
    let message = 'שיתוף לינק לתמונה \n'
    message += 'מק״ט: ' + selectedProd?.sku + '\n'
    message += 'מוצר: ' + selectedProd?.title + '\n'
    message += 'לינק: '
    message += `${process.env.REACT_APP_MEDIA}/product/${selectedProd.defaultImagePath}`
    window.open(
      'https://api.whatsapp.com/send?text=' + encodeURIComponent(message)
    )
  }

  const openLink = () => {
    const imageURL = `${process.env.REACT_APP_MEDIA}/product/${selectedProd.defaultImagePath}`
    window.open(imageURL, '_blank')

    //TODO handle if there cordova
    // var ref = cordova.InAppBrowser.open(imageURL, '_system', 'location=yes');
  }

  return (
    <Modals.ModalWrapper
      active={active}
      setActive={setActive}
      height={isMobile ? '87%' : 'auto'}
      width={65}
      zIndex={999999}
      component={
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="outlined"
            sx={{ minWidth: '40px', p: '5px' }}
            onClick={() => openLink()}
          >
            <InsertLinkIcon />
          </Button>
          <Button
            variant="outlined"
            sx={{ minWidth: '40px', p: '5px' }}
            onClick={() => share()}
          >
            <ShareIcon />
          </Button>
          {user && (
            <Button
              variant="outlined"
              endIcon={<RemoveRedEyeIcon />}
              onClick={() => setActivePurchase(true)}
            >
              היסטוריית רכישה
            </Button>
          )}
        </Box>
      }
    >
      <Grid container spacing={2}>
        <Grid item sm={5} xs={12}>
          <ProductRightSide />
        </Grid>
        <Grid item sm={7} xs={12}>
          <ProductLeftSide />
        </Grid>
      </Grid>
    </Modals.ModalWrapper>
  )
}

export default Product
