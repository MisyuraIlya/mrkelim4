import React, { useState } from 'react'
import Utils from '../../../utils'
import { Box, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import hooks from '../../../hooks'

const Filter = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { agentId } = useParams()
  const { data } = hooks.agent.useDataAgentClients()

  const handleDebouce = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    urlSearchParams.set('search', value)
    const url = urlSearchParams.toString()
    navigate(`/agentClients/${agentId}?${url}`)
  }

  const totalCount = data?.['hydra:totalItems'] ?? 0

  return (
    <Box
      sx={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ width: '50%' }}>
        <Utils.SearchInput
          handleFunction={handleDebouce}
          value={search}
          setValue={setSearch}
          placeholder="חיפוש לפי שם לקוח או מספר לקוח"
        />
      </Box>
      <Box className="centered">
        <Typography variant="body1">{`סה״כ לקוחות: ${totalCount}`}</Typography>
      </Box>
    </Box>
  )
}

export default Filter
