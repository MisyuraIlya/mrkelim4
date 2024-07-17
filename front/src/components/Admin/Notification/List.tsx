import React from 'react'
import hooks from '../../../hooks'
import { Box } from '@mui/material'
import Card from './Card'

const List = () => {
  const { data } = hooks.admin.useDataNotification()
  return (
    <Box>
      {data?.['hydra:member']?.map((element, index) => {
        return <Card element={element} index={index} />
      })}
    </Box>
  )
}

export default List
