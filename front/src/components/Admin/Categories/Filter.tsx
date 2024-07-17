import React from 'react'
import { Box, Typography } from '@mui/material'
import Utils from '../../../utils'
import { useAdminStore } from '../../../store/admin.store'

const Filter = () => {
  const { searchCategories, setSearchCategories } = useAdminStore()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">קטגוריות</Typography>
      <Box sx={{ width: '40%' }}>
        <Utils.SearchInput
          value={searchCategories}
          setValue={setSearchCategories}
          placeholder="חיפוש לפי שם קטגוריה"
          sx={{
            '& .muirtl-152mnda-MuiInputBase-input-MuiOutlinedInput-input': {
              padding: '1px',
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default Filter
