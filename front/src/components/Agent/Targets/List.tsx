import React from 'react'
import Loader from '../../../utils/Loader'
import { useAuth } from '../../../store/auth.store'
import { Box, Card as MuiCard, Grid, Typography } from '@mui/material'
import { MONTH_HEBREW_1 } from '../../../helpers/arrayOfMonths'
import Card from './Card'
import hooks from '../../../hooks'

const List = ({ year }: { year: string }) => {
  const { user } = useAuth()
  const { data, isLoading } = hooks.agent.useDataAgentTargets(year)

  const targets: IAgentTaget[] = MONTH_HEBREW_1.map((item) => {
    const matchingData = data?.['hydra:member']?.find(
      (res) => item.name === res.month
    )
    return {
      id: matchingData ? matchingData.id : null,
      agent: user,
      month: item.name,
      year: year,
      currentValue: matchingData ? matchingData.currentValue : 0,
      targetValue: matchingData ? matchingData.targetValue : 0,
      isCompleted: matchingData ? matchingData.isCompleted : false,
    }
  })

  return (
    <MuiCard sx={{ marginTop: '50px' }}>
      <Grid container spacing={2} sx={{ margin: '5px', padding: '10px 20px' }}>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            תאריך
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            מחזור
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            יעד
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            מחזור
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            סטאטוס
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1" fontWeight={700}>
            פעולות
          </Typography>
        </Grid>
      </Grid>
      {isLoading ? (
        <Box className="centered">
          <Loader />
        </Box>
      ) : (
        <Box>
          {targets?.map((item, index) => <Card item={item} index={index} />)}
        </Box>
      )}
    </MuiCard>
  )
}

export default List
