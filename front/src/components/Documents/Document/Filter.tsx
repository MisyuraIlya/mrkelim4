import React, { useState } from 'react'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { documentTypes } from '../../../enums/documentsTypes'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
} from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import hooks from '../../../hooks'
import { useMobile } from '../../../provider/MobileProvider'
const Filter = () => {
  const { documentType, dateFrom, dateTo } = useParams()
  const { isMobile } = useMobile()
  const navigate = useNavigate()

  const handleDateFrom = (e: moment.Moment | null) => {
    if (e) {
      const updatedPathname = `/documentPage/${documentType}/${e.format('YYYY-MM-DD')}/${dateTo}?page=1`
      navigate(updatedPathname)
    }
  }

  const handleDateTo = (e: moment.Moment | null) => {
    if (e) {
      const updatedPathname = `/documentPage/${documentType}/${dateFrom}/${e.format('YYYY-MM-DD')}?page=1`
      navigate(updatedPathname)
    }
  }

  const handleSelect = (parameter: IDocumentTypes) => {
    navigate(`/documentPage/${parameter}/${dateFrom}/${dateTo}?page=1`)
  }

  const { data, mutate } = hooks.useDataDocuments()
  const total = data?.['hydra:totalItems'] ?? 0
  return (
    <Paper
      elevation={4}
      sx={{
        display: { sm: 'flex', xs: 'block' },
        justifyContent: 'space-between',
        padding: { sm: '15px 20px', xs: '12px' },
      }}
    >
      {isMobile && (
        <FormControl fullWidth sx={{ width: '100%', marginTop: '12px' }}>
          <InputLabel id="demo-simple-select-label">מסמך</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={documentType}
            sx={{ height: '40px' }}
            label="מסמך"
            onChange={(e) => handleSelect(e.target.value as IDocumentTypes)}
          >
            {documentTypes?.map((ele, ind) => {
              return (
                <MenuItem value={ele.value} key={ind}>
                  {ele.label}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      )}
      <Box
        sx={{
          display: { sm: 'flex', xs: 'block' },
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <DemoContainer
          components={['DatePicker']}
          sx={{
            width: isMobile ? '100%' : '170px',
            pt: isMobile ? '20px' : '10px',
            '& .MuiOutlinedInput-input': { padding: '10px 16px' },
            '& .MuiInputLabel-root': { top: '-7px' },
          }}
        >
          <DatePicker
            label="מתאריך"
            value={moment(dateFrom)}
            onChange={(e) => handleDateFrom(e)}
          />
        </DemoContainer>
        <DemoContainer
          components={['DatePicker']}
          sx={{
            width: isMobile ? '100%' : '170px',
            pt: isMobile ? '20px' : '10px',
            '& .MuiOutlinedInput-input': { padding: '10px 16px' },
            '& .MuiInputLabel-root': { top: '-7px' },
          }}
        >
          <DatePicker
            label="לתאריך"
            value={moment(dateTo)}
            onChange={(e) => handleDateTo(e)}
          />
        </DemoContainer>
        {!isMobile && (
          <Button
            variant="contained"
            onClick={() => mutate()}
            sx={{ height: '43px', mt: '8px' }}
          >
            חפש
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: { sm: 'flex', xs: 'block' },
          gap: '20px',
          alignItems: 'center',
          pt: '8px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          {!isMobile && (
            <FormControl fullWidth sx={{ width: '300px' }}>
              <InputLabel id="demo-simple-select-label">מסמך</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={documentType}
                sx={{ height: '40px' }}
                label="מסמך"
                onChange={(e) => handleSelect(e.target.value as IDocumentTypes)}
              >
                {documentTypes?.map((ele, ind) => {
                  return (
                    <MenuItem value={ele.value} key={ind}>
                      {ele.label}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          )}
        </Box>
        {isMobile && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => mutate()}
            sx={{ height: '43px', mt: '8px' }}
          >
            חפש
          </Button>
        )}
      </Box>
    </Paper>
  )
}

export default Filter
