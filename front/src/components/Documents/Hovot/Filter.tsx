import React from 'react'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import hooks from '../../../hooks'
import { useMobile } from '../../../provider/MobileProvider'
import ArticleIcon from '@mui/icons-material/Article'
import {
  ExcelGeneratorICartesset,
  ExcelGeneratorIHovot,
} from '../../../helpers/ExcelGenerator'
import { themeColors } from '../../../styles/mui'

const Filter = () => {
  const { dateFrom, dateTo } = useParams()
  const { isMobile } = useMobile()
  const navigate = useNavigate()

  const handleDateFrom = (e: moment.Moment | null) => {
    if (e) {
      const updatedPathname = `/hovot/${e.format('YYYY-MM-DD')}/${dateTo}?page=1`
      navigate(updatedPathname)
    }
  }

  const handleDateTo = (e: moment.Moment | null) => {
    if (e) {
      const updatedPathname = `/hovot/${dateFrom}/${e.format('YYYY-MM-DD')}?page=1`
      navigate(updatedPathname)
    }
  }

  const { data, mutate } = hooks.useDataHovot()
  return (
    <Paper
      elevation={4}
      sx={{
        display: { sm: 'flex', xs: 'block' },
        justifyContent: 'space-between',
        padding: '15px 20px',
      }}
    >
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
            pt: isMobile ? '25px' : '10px',
            width: isMobile ? '100%' : '170px',
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
            pt: isMobile ? '25px' : '10px',
            width: isMobile ? '100%' : '170px',
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
        <Button
          fullWidth={isMobile}
          variant="contained"
          onClick={() => mutate()}
          sx={{ height: '43px', mt: isMobile ? '15px' : '8px' }}
        >
          חפש
        </Button>
      </Box>
      <Box
        sx={{
          display: { sm: 'flex', xs: 'block' },
          gap: '20px',
          alignItems: 'center',
          pt: '8px',
        }}
      >
        {data && data?.total > 0 && (
          <Typography variant="subtitle2" sx={{ color: themeColors.asphalt }}>
            סה"כ חוב: ₪{data?.total}
          </Typography>
        )}

        {data && (
          <Button
            sx={{ height: '40px' }}
            variant="outlined"
            startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
            onClick={() => ExcelGeneratorIHovot(data)}
          >
            XL
          </Button>
        )}
      </Box>
    </Paper>
  )
}

export default Filter
