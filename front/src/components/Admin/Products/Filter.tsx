import React from 'react'
import Utils from '../../../utils'
import { Box, Typography } from '@mui/material'
import { useAdminStore } from '../../../store/admin.store'

const Filter = () => {
  const { searchProducts, setSearchProducts } = useAdminStore()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">מוצרים</Typography>
      <Box sx={{ width: '40%' }}>
        <Utils.SearchInput
          value={searchProducts}
          setValue={setSearchProducts}
          placeholder="חיפוש לפי שם numr"
        />
      </Box>
    </Box>
  )
}

export default Filter
