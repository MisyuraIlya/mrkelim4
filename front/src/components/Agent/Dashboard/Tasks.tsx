import React, { useState } from 'react'
import moment from 'moment'
import { Box, Card, Grid, IconButton, Typography } from '@mui/material'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import { themeColors } from '../../../styles/mui'
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined'
import Modals from '../../Modals'
import { onSuccessAlert } from '../../../utils/MySweetAlert'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import hooks from '../../../hooks'

const Tasks = () => {
  const [open, setOpen] = useState(false)
  const [choosedObject, setChoosedObject] = useState<IAgentObjective | null>(
    null
  )

  const { data, updateObjective } = hooks.agent.useDataAgentDashboard(
    moment().format('YYYY-MM-DD'),
    moment().format('YYYY-MM-DD')
  )

  const handleUpdate = (obj: IAgentObjective, isDone: boolean) => {
    if (isDone) {
      obj.isCompleted = true
    } else {
      obj.isCompleted = false
    }
    if (!obj.client) {
      delete obj.client
    }
    obj.completedAt = moment().format('YYYY-MM-DD HH:mm')
    updateObjective(obj)
    setOpen(false)
    onSuccessAlert('עודכן בהצלחה', '')
  }

  const handleClick = (obj: IAgentObjective) => {
    setChoosedObject(obj)
    setOpen(true)
  }

  const notCompleted = data?.['hydra:member']?.filter(
    (item) => !item.completedAt
  )

  return (
    <>
      <Card sx={{ marginTop: '50px' }}>
        <Typography variant="h6" sx={{ margin: '20px 40px' }}>
          {' '}
          המשימות הפתוחות שלך להיום
        </Typography>
        {notCompleted?.map((item, index) => (
          <Card
            elevation={4}
            key={index}
            sx={{
              margin: '20px 40px',
              padding: '10px 20px',
              borderRadius: '5px',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={1}
                className="centered"
                onClick={() => handleClick(item)}
              >
                {item?.objectiveType === 'task' ? (
                  <AssignmentLateOutlinedIcon />
                ) : (
                  <FmdGoodOutlinedIcon />
                )}
              </Grid>
              <Grid
                item
                xs={1}
                className="centered"
                onClick={() => handleClick(item)}
              >
                {item?.objectiveType === 'task' ? 'משימה' : 'ביקור'}
              </Grid>
              <Grid
                sx={{ display: 'flex', alignItems: 'center' }}
                item
                xs={5}
                onClick={() => handleClick(item)}
              >
                {item?.objectiveType === 'task' ? (
                  <Typography variant="body1">{item.title}</Typography>
                ) : (
                  <Typography variant="body1">{item?.client?.name}</Typography>
                )}
              </Grid>
              <Grid
                item
                xs={1}
                className="centered"
                onClick={() => handleClick(item)}
              >
                <Typography variant="body1">{item.hourFrom}</Typography>
              </Grid>
              <Grid
                item
                xs={1}
                className="centered"
                onClick={() => handleClick(item)}
              >
                <Typography variant="body1">{item.hourTo}</Typography>
              </Grid>
              <Grid item xs={2} className="centered">
                <Box sx={{ gap: '30px' }} className="centered">
                  <IconButton
                    sx={{
                      borderRadius: '5px',
                      backgroundColor: '#f3f5f9',
                      '&:hover': { background: '#d1d9e8' },
                    }}
                    onClick={() => handleUpdate(item, true)}
                  >
                    <TaskAltIcon
                      sx={{ color: themeColors.primary, fontSize: '25px' }}
                    />
                  </IconButton>
                  <IconButton
                    sx={{
                      borderRadius: '5px',
                      backgroundColor: '#f3f5f9',
                      '&:hover': { background: '#d1d9e8' },
                    }}
                    onClick={() => handleUpdate(item, false)}
                  >
                    <NotInterestedIcon
                      sx={{ color: themeColors.primary, fontSize: '25px' }}
                    />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Card>
        ))}
        {notCompleted?.length === 0 && (
          <Box
            sx={{ minHeight: '100px', display: 'flex', gap: '5px' }}
            className="centered"
          >
            <Typography variant="h6">אין משימות פתוחות להיום</Typography>
            <EventAvailableOutlinedIcon sx={{ fontSize: '30px' }} />
          </Box>
        )}
      </Card>
      {choosedObject && (
        <Modals.Agent.Mission.Update
          item={choosedObject}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  )
}

export default Tasks
