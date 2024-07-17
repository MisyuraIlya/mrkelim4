import React, { useState } from 'react'
import AppsIcon from '@mui/icons-material/Apps'
import {
  Box,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import { URLS } from '../../../enums/urls'
import AddHomeIcon from '@mui/icons-material/AddHome'
import { Navigate, useNavigate } from 'react-router-dom'
export const AdminURL = {
  CATALOG_EDIT: {
    LINK: URLS.ADMIN_EDIT_CATALOG.LINK,
    LABEL: URLS.ADMIN_EDIT_CATALOG.LABEL,
    ICON: <PermMediaIcon sx={{ fontSize: '25px' }} />,
  },
  HOME_EDIT: {
    LINK: URLS.ADMIN_EDIT_HOME.LINK,
    LABEL: URLS.ADMIN_EDIT_HOME.LABEL,
    ICON: <AddHomeIcon sx={{ fontSize: '25px' }} />,
  },
  CLIENTS: {
    LINK: URLS.ADMIN_CLIENTS.LINK,
    LABEL: URLS.ADMIN_CLIENTS.LABEL,
    ICON: <GroupIcon sx={{ fontSize: '25px' }} />,
  },
  AGENTS: {
    LINK: URLS.ADMIN_AGENTS.LINK,
    LABEL: URLS.ADMIN_AGENTS.LABEL,
    ICON: <GroupIcon sx={{ fontSize: '25px' }} />,
  },
  ORDERS: {
    LINK: URLS.DOCUMENTS.LINK,
    LABEL: URLS.DOCUMENTS.LABEL,
    ICON: <FileCopyIcon sx={{ fontSize: '25px' }} />,
  },
  HISTORY: {
    LINK: URLS.HISTORY.LINK,
    LABEL: URLS.HISTORY.LABEL,
    ICON: <FileCopyIcon sx={{ fontSize: '25px' }} />,
  },
  NOTIFICATIONS: {
    LINK: URLS.ADMIN_NOTIFICATIONS.LINK,
    LABEL: URLS.ADMIN_NOTIFICATIONS.LABEL,
    ICON: <NotificationAddIcon sx={{ fontSize: '25px' }} />,
  },
}

const AdminDrawver = () => {
  const [openAdminSideBar, setOpenAdminSideBar] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <Box>
        <IconButton onClick={() => setOpenAdminSideBar(true)}>
          <AppsIcon sx={{ fontSize: '35px' }} />
        </IconButton>
      </Box>
      <Drawer
        open={openAdminSideBar}
        onClose={() => setOpenAdminSideBar(false)}
      >
        <Box className="centered" sx={{ marginTop: '50px' }}>
          <img
            src={`${process.env.REACT_APP_MEDIA}/logo.png`}
            alt=""
            style={{ width: '60%' }}
          />
        </Box>
        <Box>
          {Object.entries(AdminURL).map(([key, value]) => {
            return (
              <MenuItem
                key={key}
                sx={{ margin: '20px' }}
                onClick={() => navigate(value.LINK)}
              >
                <ListItemIcon>{value.ICON}</ListItemIcon>
                <ListItemText>
                  <Typography variant="h6">{value.LABEL}</Typography>
                </ListItemText>
              </MenuItem>
            )
          })}
        </Box>
      </Drawer>
    </>
  )
}

export default AdminDrawver
