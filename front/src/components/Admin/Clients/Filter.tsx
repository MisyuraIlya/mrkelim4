import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Utils from '../../../utils'
import { Box, Typography } from '@mui/material'
import { themeColors } from '../../../styles/mui'
import { useAdminStore } from '../../../store/admin.store'
import hooks from '../../../hooks'

type RouteParams = {
  userRole: ROLE_TYPES
}

const Filter = () => {
  const { searchClients, setSearchClients } = useAdminStore()
  const navigate = useNavigate()
  const { data } = hooks.admin.useDataUsers()
  const { userRole } = useParams<RouteParams>()

  const handleDebouce = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('search', value)
    const url = urlSearchParams.toString()
    navigate(`/admin/${userRole}?${url}`)
  }
  const total = data?.['hydra:totalItems'] ?? 0
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px 0',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
        <Typography variant="h5">
          {userRole == 'ROLE_AGENT' ? 'סוכנים' : 'לקוחות'}
        </Typography>
        <Typography variant="body1" color={themeColors.asphalt}>
          {'נמצאו: ' + total + ' לקוחות'}
        </Typography>
      </Box>
      <Box>
        <Utils.SearchInput
          handleFunction={handleDebouce}
          value={searchClients}
          setValue={setSearchClients}
          placeholder="חיפוש לפי שם לקוח או מספר לקוח"
        />
      </Box>
    </Box>
  )
}

export default Filter
