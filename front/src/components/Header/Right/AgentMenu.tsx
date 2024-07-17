import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import WifiOffOutlinedIcon from '@mui/icons-material/WifiOffOutlined'
import { URLS } from '../../../enums/urls'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/auth.store'
import AgentMenuProfile from './AgentMenuProfile'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
const agentURL = {
  // DOCUMENT_APPROCE: {
  //   LINK: URLS.AGNET_DASHBOARD.LINK,
  //   LABEL: URLS.AGNET_DASHBOARD.LABEL,
  //   ICON: <ChecklistRtlIcon sx={{ fontSize: '25px' }} />,
  // },
  // HISTORY_AGENT: {
  //   LINK: URLS.HISTORY.LINK,
  //   LABEL: URLS.HISTORY.LABEL,
  //   ICON: <ArticleOutlinedIcon sx={{ fontSize: '25px' }} />,
  // },
  ORDER_TO_VERIFY: {
    LINK: URLS.APPROVE.LINK,
    LABEL: URLS.APPROVE.LABEL,
    ICON: <ChecklistRtlIcon sx={{ fontSize: '25px' }} />,
  },
  ORDER_AGENT: {
    LINK: URLS.DOCUMENTS.LINK,
    LABEL: URLS.DOCUMENTS.LABEL,
    ICON: <StickyNote2OutlinedIcon sx={{ fontSize: '25px' }} />,
  },
  // AGENT_STATISTICS: {
  //   LINK: URLS.AGNET_AGENT_STATISTICS.LINK,
  //   LABEL: URLS.AGNET_AGENT_STATISTICS.LABEL,
  //   ICON: <SupportAgentOutlinedIcon sx={{ fontSize: '25px' }} />,
  // },
  // DOCUMENT_OFFLINE: {
  //   LINK: URLS.AGENT_DOCUMENT_OFFLINE.LINK,
  //   LABEL: URLS.AGENT_DOCUMENT_OFFLINE.LABEL,
  //   ICON: <WifiOffOutlinedIcon sx={{ fontSize: '25px' }} />,
  // },
}

const AgentMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  return (
    <Box>
      <IconButton
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{
          height: '50px',
          width: '50px',
          border: '1px solid #E0E0E0',
        }}
      >
        <AssignmentIndIcon />
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
        <Box sx={{ padding: '4px 12px', minWidth: '312px' }}>
          <AgentMenuProfile handleClose={() => setAnchorEl(null)} />
        </Box>
      </Menu>
    </Box>
  )
}
export default AgentMenu
