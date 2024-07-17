import React, { useState } from 'react'
import { Box, IconButton, Menu, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { useAuth } from '../../../store/auth.store'
import { useModals } from '../../../provider/ModalProvider'
import MenuProfile from './MenuProfile'
import { useCart } from '../../../store/cart.store'

const ProfileButton = () => {
  const { user, setAction } = useAuth()
  const { setOpenAuthModal } = useModals()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { selectedMode } = useCart()
  const open = Boolean(anchorEl)

  const handleOpenAuth = () => {
    setAction('login')
    setOpenAuthModal(true)
  }
  return (
    <Box>
      <IconButton
        onClick={(event) => {
          user ? setAnchorEl(event.currentTarget) : handleOpenAuth()
        }}
        sx={{
          height: '50px',
          border: '1px solid #E0E0E0',
          borderRadius: '100px',
          padding: '0 12px',
          gap: '6px',
        }}
      >
        <PersonIcon />
        {user && (
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '18px',
              minWidth: '50px',
            }}
          >
            {selectedMode.label}
          </Typography>
        )}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ borderRadius: '8px' }}
      >
        <Box sx={{ padding: '4px 12px', width: '312px' }}>
          <MenuProfile handleClose={() => setAnchorEl(null)} />
        </Box>
      </Menu>
    </Box>
  )
}

export default ProfileButton
