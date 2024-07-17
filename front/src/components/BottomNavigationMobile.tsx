import React, { useState } from 'react'
import {
  BottomNavigation,
  Box,
  Drawer,
  Paper,
  Select,
  Typography,
  useMediaQuery,
} from '@mui/material'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { themeColors } from '../styles/mui'
import { useAuth } from '../store/auth.store'
import { onAsk } from '../utils/MySweetAlert'
import { useNavigate } from 'react-router-dom'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { useModals } from '../provider/ModalProvider'
import { useMobile } from '../provider/MobileProvider'
import MenuProfile from './Header/Left/MenuProfile'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import AgentMenuProfile from './Header/Right/AgentMenuProfile'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'

const BottomNavigationMobile = () => {
  const [value, setValue] = useState('')
  const { user, agent, logOut, isAgent } = useAuth()
  const { setOpenAuthModal } = useModals()
  const [openDrawver, setOpenDrawver] = useState(false)
  const [openDrawverAgent, setOpenDrawverAgent] = useState(false)
  const { isMobile } = useMobile()
  const navigate = useNavigate()

  const beforeLogOut = async () => {
    const ask = await onAsk('האם אתה בטוח?', 'כל המוצרים בסל ימחקו')
    if (ask) {
      logOut()
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    if (newValue == '2') {
      if (user) {
        setOpenDrawver(true)
      } else {
        setOpenAuthModal(true)
      }
    }

    if (newValue == '1') {
      setOpenDrawverAgent(true)
    }
    if (newValue == '3') {
      navigate('/cart')
    }

    if (newValue == '5') {
      navigate(`/agentClients/${agent?.id}?page=1`)
    }
  }

  return (
    <>
      {isMobile && (
        <>
          <Paper
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 999,
            }}
            elevation={10}
          >
            <BottomNavigation value={value} onChange={handleChange}>
              {agent && (
                <BottomNavigationAction
                  label="סוכן"
                  value="1"
                  icon={<AssignmentIndIcon />}
                />
              )}

              <BottomNavigationAction
                label="פרופיל"
                value="2"
                icon={<PersonIcon />}
              />

              {isAgent && (
                <BottomNavigationAction
                  label="לקוחות"
                  value="5"
                  icon={<GroupIcon />}
                />
              )}
              {user && (
                <BottomNavigationAction
                  label="עגלה"
                  value="3"
                  icon={<ShoppingCartIcon />}
                />
              )}
            </BottomNavigation>
          </Paper>

          <Drawer
            anchor="bottom"
            open={openDrawver}
            onClose={() => setOpenDrawver(false)}
            sx={{ zIndex: 998 }}
          >
            <Box sx={{ minHeight: '550px', padding: '12px 16px' }}>
              <MenuProfile handleClose={() => setOpenDrawver(false)} />
            </Box>
          </Drawer>
          <Drawer
            anchor="bottom"
            open={openDrawverAgent}
            onClose={() => setOpenDrawverAgent(false)}
            sx={{ zIndex: 998 }}
          >
            <Box sx={{ minHeight: '280px', padding: '12px 16px' }}>
              <AgentMenuProfile
                handleClose={() => setOpenDrawverAgent(false)}
              />
            </Box>
          </Drawer>
        </>
      )}
    </>
  )
}

export default BottomNavigationMobile
