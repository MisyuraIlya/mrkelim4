import React from 'react'
import { useAuth } from '../../store/auth.store'
import { Paper, Typography, Grid } from '@mui/material'
import { themeColors } from '../../styles/mui'

const Money = () => {
  const { user } = useAuth()
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: '50px' }}>
        {'כספים'}
      </Typography>
      <Paper
        sx={{
          padding: '15px 40px',
          marginTop: '20px',
          minHeight: '100px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Grid container spacing={1}>
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {'מס חברה'}
            </Typography>
            <Typography variant="body1">{user?.hp ?? '-'}</Typography>
          </Grid>
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {'קוד תנאי תשלום'}
            </Typography>
            <Typography variant="body1">{user?.payCode ?? '-'}</Typography>
          </Grid>
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {'תנאי תשלום'}
            </Typography>
            <Typography variant="body1">{user?.payDesc ?? '-'}</Typography>
          </Grid>
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {'תיקרת אשראי'}
            </Typography>
            <Typography variant="body1">{user?.maxCredit ?? '-'}</Typography>
          </Grid>
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {'תיקרת אובליגו'}
            </Typography>
            <Typography variant="body1">{user?.maxObligo ?? '-'}</Typography>
          </Grid>
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {'קוד ניכוי מס'}
            </Typography>
            <Typography variant="body1">{user?.taxCode ?? '-'}</Typography>
          </Grid>
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {'חובות פתוחים'}
            </Typography>
            <Typography variant="body1">{user?.taxCode ?? '-'}</Typography>
          </Grid>
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {'שיקים לפרעון'}
            </Typography>
            <Typography variant="body1">{user?.taxCode}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default Money
