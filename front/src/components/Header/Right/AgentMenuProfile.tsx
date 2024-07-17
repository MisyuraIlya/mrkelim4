import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material'
import React, { FC } from 'react'
import { URLS } from '../../../enums/urls'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined'
import { useAuth } from '../../../store/auth.store'
import { useNavigate } from 'react-router-dom'

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

interface AgentMenuProfileProps {
  handleClose?: () => void
}
const AgentMenuProfile: FC<AgentMenuProfileProps> = ({ handleClose }) => {
  const { agent } = useAuth()
  const navigate = useNavigate()

  const handleClick = (link: string) => {
    if (handleClose) {
      handleClose()
    }
    navigate(link)
  }

  return (
    <Box>
      <Box>
        <Typography variant="h5">{agent?.name}</Typography>
      </Box>
      <Box sx={{ padding: '16px 0' }}>
        <Divider />
      </Box>
      {Object.entries(agentURL).map(([key, value]) => (
        <MenuItem key={key} onClick={() => handleClick(value.LINK)}>
          <ListItemIcon>{value.ICON}</ListItemIcon>
          <ListItemText>
            <Typography variant="h6">{value.LABEL}</Typography>
          </ListItemText>
        </MenuItem>
      ))}
    </Box>
  )
}

export default AgentMenuProfile
