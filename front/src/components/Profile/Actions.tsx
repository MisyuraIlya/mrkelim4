import React, { FC } from 'react'
import { useAuth } from '../../store/auth.store'
import { useCart } from '../../store/cart.store'
import { useNavigate } from 'react-router-dom'
import { useModals } from '../../provider/ModalProvider'
import moment from 'moment'
import { onSuccessAlert } from '../../utils/MySweetAlert'
import { Card, Grid, Typography } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt'
import RestorePageIcon from '@mui/icons-material/RestorePage'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import TourIcon from '@mui/icons-material/Tour'

interface Action {
  title: string
  mode: IDocumentType
  link: string
  img: any
}

interface AgentActionsProps {
  colsNumber: number
}
const Actions: FC<AgentActionsProps> = ({ colsNumber }) => {
  const { user, isAgent } = useAuth()
  const { setSelectedMode } = useCart()
  const navigate = useNavigate()

  const handleCreateVisit = async () => {
    if (user) {
      let obj: IAgentObjective = {
        agent: user,
        client: user,
        isCompleted: true,
        completedAt: moment().format('YYYY-MM-DD'),
        title: '',
        description: '',
        week1: false,
        week2: false,
        week3: false,
        week4: false,
        hourFrom: moment().subtract(1, 'hour').format('HH'),
        hourTo: moment().format('HH'),
        choosedDay: moment().locale('he').format('dddd'),
        date: moment().format('YYYY-MM-DD'),
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD'),
        objectiveType: 'visit',
        subTusk: [],
      }
      // console.log('obj',obj)
      // await createVisit(obj)
      onSuccessAlert('ביקור התווסף', '')
    }
  }
  let actions: Action[] = [
    {
      title: 'הזמנה',
      mode: 'order',
      link: '/CatalogView',
      img: <ListAltIcon sx={{ fontSize: '40px' }} />,
    },
    {
      title: 'החזרה',
      mode: 'return',
      link: '/CatalogView',
      img: <RestorePageIcon sx={{ fontSize: '40px' }} color="info" />,
    },
    {
      title: 'ה.מחיר',
      mode: 'quote',
      link: '/CatalogView',
      img: <RequestQuoteIcon sx={{ fontSize: '40px' }} />,
    },
  ]
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: '50px', marginBottom: '20px' }}>
        {'פעולות'}
      </Typography>
      <Grid container sx={{ marginBottom: '50px' }}>
        {actions?.map((item, key) => (
          <Grid
            item
            key={key}
            xs={12}
            sm={4}
            onClick={() => {
              setSelectedMode({
                value: item.mode,
                label: item.title,
                isOnlyAgent: true,
              })
              navigate(item.link)
            }}
          >
            <Card
              elevation={2}
              sx={{
                padding: '30px 50px',
                gap: '20px',
                cursor: 'pointer',
                margin: '20px 10px',
              }}
              className="centered"
            >
              <Typography variant="h6">{item.title}</Typography>
              {item.img}
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Actions
