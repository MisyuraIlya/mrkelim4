import { Box, MenuItem, Select, Typography } from '@mui/material'
import React, { FC } from 'react'

type arr = {
  value: string
  label: string
}

interface CustomSelectBox {
  label: string
  value: string
  onChange: (value: string) => void
  options: arr[]
}

const CustomSelectBox: FC<CustomSelectBox> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <Select
      sx={{
        minWidth: '150px',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E0E0E0',
        },
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <Typography fontWeight={600} lineHeight={'12px'}>
            {label}:
          </Typography>
          <Typography>{selected}</Typography>
        </Box>
      )}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.label}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default CustomSelectBox
