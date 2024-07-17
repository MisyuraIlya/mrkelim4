import React from 'react'
import { useCart } from '../../../store/cart.store'
import { onAsk } from '../../../utils/MySweetAlert'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Box, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { useAuth } from '../../../store/auth.store'
import { themeColors } from '../../../styles/mui'
import { useMobile } from '../../../provider/MobileProvider'

const Options = () => {
  const { cart, setCart, selectedMode, saveDraft } = useCart()
  const { isMobile } = useMobile()
  const { user } = useAuth()
  const navigate = useNavigate()
  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().format('YYYY-MM-DD')

  const askDelete = async () => {
    const ask = await onAsk('האם אתה בטוח?', 'כל המוצרים בעגלה יימחקו')
    if (ask) {
      setCart([])
    }
  }

  const handleSaveAsDraft = async () => {
    const ask = await onAsk(
      'שמור הזמנה כטיוטה?',
      'טיוטה תשמר וסל הקניות הנוכחי יתרוקן'
    )
    if (ask && user) {
      saveDraft(user)
      navigate(`/documentPage/history/${from}/${to}?page=1`)
      setCart([])
    }
  }

  const handleToDraft = () => {
    navigate(`/documentPage/history/${from}/${to}?page=1`)
  }

  return (
    <Box
      sx={{
        display: isMobile ? 'block' : 'flex',
        justifyContent: 'space-between',
        margin: '0 20px',
      }}
    >
      <Box>
        <Typography
          variant="h5"
          fontWeight={600}
        >{`סיכום ${selectedMode?.label}`}</Typography>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color={themeColors.asphalt}
          sx={{ margin: '10px 0' }}
        >
          {user?.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: '20px',
        }}
      >
        {cart.length > 0 && selectedMode.value == 'order' && (
          <Button
            variant="outlined"
            onClick={() => handleSaveAsDraft()}
            sx={{
              fontSize: '14px',
              whiteSpace: 'nowrap',
              minWidth: {
                sm: { minWidth: '130px' },
                xs: { minWidth: '100px' },
              },
              height: '35px',
            }}
            startIcon={<SaveAsIcon />}
          >
            שמור טיוטה
          </Button>
        )}
        {selectedMode.value == 'order' && (
          <Button
            variant="outlined"
            onClick={() => handleToDraft()}
            sx={{
              fontSize: '14px',
              whiteSpace: 'nowrap',
              minWidth: {
                sm: { minWidth: '130px' },
                xs: { minWidth: '100px' },
              },
              height: '35px',
            }}
            startIcon={<FileUploadIcon />}
          >
            טען טיוטה
          </Button>
        )}
        {cart.length > 0 && (
          <Button
            onClick={() => askDelete()}
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              fontSize: '14px',
              whiteSpace: 'nowrap',
              minWidth: {
                sm: { minWidth: '130px' },
                xs: { minWidth: '100px' },
              },
              height: '35px',
            }}
          >
            מחק סל
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Options
