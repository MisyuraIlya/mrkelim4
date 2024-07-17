import React from 'react'
import {
  Box,
  Card as MuiCard,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import Loader from '../../../utils/Loader'
import moment from 'moment'
import Card from './Card'
import hooks from '../../../hooks'

const List = () => {
  const { isLoading, data } = hooks.agent.useDataAgentObjectives('visit')
  return (
    <MuiCard sx={{ marginTop: '50px' }}>
      <Grid
        container
        spacing={2}
        className="head"
        sx={{ borderRadius: '5px', padding: '30px', margin: '10px' }}
      >
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight={700}>
            לקוח
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            כתובת
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            טלפון
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            שעות
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1" fontWeight={700}>
            יום
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1" fontWeight={700}>
            פעולות
          </Typography>
        </Grid>
      </Grid>

      {isLoading ? (
        <Loader />
      ) : (
        data?.['hydra:member']?.map((item, index) => (
          <Card item={item} index={index} />
        ))
      )}

      {data?.['hydra:member'].length === 0 && (
        <Box className="centered" sx={{ minHeight: '100px' }}>
          <Typography variant="body1" fontWeight={700}>
            לא נמצאו תוצאות
          </Typography>
        </Box>
      )}
    </MuiCard>
  )
}

export default List
