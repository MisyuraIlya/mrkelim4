import {
  Box,
  Chip,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import React, { FC } from 'react'
import { useCart } from '../../../store/cart.store'
import { useAuth } from '../../../store/auth.store'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import { URLS } from '../../../enums/urls'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom'
import { onAsk } from '../../../utils/MySweetAlert'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useMobile } from '../../../provider/MobileProvider'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import PriceChangeIcon from '@mui/icons-material/PriceChange'
import AssignmentIcon from '@mui/icons-material/Assignment'

const clientURL = {
  PROFILE: {
    LINK: URLS.PROFILE.LINK,
    LABEL: URLS.PROFILE.LABEL,
    ICON: <PersonIcon sx={{ width: '22px' }} />,
  },
  DOCUMENTS: {
    LINK: URLS.DOCUMENTS.LINK,
    LABEL: URLS.DOCUMENTS.LABEL,
    ICON: <AssignmentIcon sx={{ width: '22px' }} />,
  },
  CARTESSET: {
    LINK: URLS.CARTESSET.LINK,
    LABEL: URLS.CARTESSET.LABEL,
    ICON: <PriceChangeIcon sx={{ width: '20px' }} />,
  },
  HOVOT: {
    LINK: URLS.GIUL_HOVOT.LINK,
    LABEL: URLS.GIUL_HOVOT.LABEL,
    ICON: <CurrencyExchangeIcon sx={{ width: '20px' }} />,
  },
}

interface MenuProfile {
  handleClose?: () => void
}

const MenuProfile: FC<MenuProfile> = ({ handleClose }) => {
  const { modes, selectedMode, setSelectedMode, cart, setCart } = useCart()
  const { isMobile } = useMobile()
  const { user, logOut, agent, setUser } = useAuth()
  const navigate = useNavigate()

  const handleNaviagte = (link: string) => {
    if (link) {
      navigate(link)
      if (handleClose) {
        handleClose()
      }
    }
  }

  const handleLogOut = async () => {
    const ask = await onAsk('בטוח תרצה לצאת?', '')
    if (ask) {
      logOut()
      if (handleClose) {
        handleClose()
      }
    }
  }

  const handleChange = async (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value
    const selectedItem = modes.find((item) => item.value == selectedValue)
    if (selectedItem) {
      if (selectedItem.value !== selectedMode.value && cart.length > 0) {
        const ask = await onAsk(
          `שאלה`,
          `בטוח תרצה לעבור למוד ${selectedItem.label}?. כל המוצרים מהסל ימחקו`
        )
        if (ask) {
          setCart([])
          setSelectedMode(selectedItem)
        }
      } else {
        setSelectedMode(selectedItem)
      }
    }
  }

  const handleOutClinet = async () => {
    if (cart.length > 0) {
      const ask = await onAsk(
        'בטוח תרצה לצאת מהלקוח?',
        'כל הפריטים ימחקו מהסל קניות'
      )
      if (ask) {
        setCart([])
        setUser(agent)
        navigate(URLS.PROFILE.LINK)
        if (handleClose) {
          handleClose()
        }
      }
    } else {
      setUser(agent)
      navigate(URLS.PROFILE.LINK)
      if (handleClose) {
        handleClose()
      }
    }
  }

  return (
    <Box sx={{ padding: '12px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant={isMobile ? 'h6' : 'h5'}>
            {(user ?? agent)?.name}
          </Typography>
          <Typography variant="caption">{(user ?? agent)?.extId}</Typography>
        </Box>
        {user?.id !== agent?.id && agent && (
          <Chip label="לקוח" variant="outlined" color="info" />
        )}
      </Box>
      <Select
        fullWidth
        value={selectedMode.value}
        sx={{ marginTop: '12px' }}
        onChange={handleChange}
      >
        {modes?.map((item, index) => {
          if (!item.isOnlyAgent || user?.id == agent?.id) {
            return (
              <MenuItem value={item.value} key={index}>
                {item.label}
              </MenuItem>
            )
          }
        })}
      </Select>
      {user?.id !== agent?.id && agent && (
        <MenuItem sx={{ marginTop: '8px' }} onClick={() => handleOutClinet()}>
          <ListItemIcon>
            <TransferWithinAStationIcon color="error" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h6" color={'error'}>
              {'התנתק מהלקוח'}
            </Typography>
          </ListItemText>
        </MenuItem>
      )}
      <Box sx={{ padding: '16px 0' }}>
        <Divider />
      </Box>
      {Object.entries(clientURL).map(([key, value]) => (
        <MenuItem key={key} onClick={() => handleNaviagte(value.LINK)}>
          <ListItemIcon sx={{ width: '16px' }}>{value.ICON}</ListItemIcon>
          <ListItemText>
            <Typography variant="h6">{value.LABEL}</Typography>
          </ListItemText>
        </MenuItem>
      ))}
      <Box sx={{ padding: '16px 0' }}>
        <Divider />
      </Box>
      <MenuItem onClick={() => handleLogOut()}>
        <ListItemIcon>
          <ExitToAppIcon color="error" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="h6" color={'error'}>
            {'התנתק'}
          </Typography>
        </ListItemText>
      </MenuItem>
    </Box>
  )
}

export default MenuProfile
