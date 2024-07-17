import React from 'react'
import { Box, List, ListSubheader } from '@mui/material'
import hooks from '../../../hooks'
import Card from './Card'

const Categories = () => {
  const { data } = hooks.useDataCategories()

  return (
    <List
      sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {data?.['hydra:member']?.map((lvl1, index) => (
        <Box key={index}>
          <Card element={lvl1} pl={0} color="black" />
        </Box>
      ))}
    </List>
  )
}

export default Categories
