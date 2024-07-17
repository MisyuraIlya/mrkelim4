import React from 'react'
import { Box, Container } from '@mui/material'
import Loader from '../utils/Loader'
import { useParams } from 'react-router-dom'
import Admin from '../components/Admin'
import Utils from '../utils'
import hooks from '../hooks'

type RouteParams = {
  userRole: ROLE_TYPES
}
const Users = () => {
  const { hydraPagination, isLoading } = hooks.admin.useDataUsers()
  const { userRole } = useParams<RouteParams>()

  let componentToRender: React.ReactNode

  switch (userRole) {
    case 'ROLE_USER':
    case 'ROLE_AGENT':
    case 'ROLE_SUPER_AGENT':
      componentToRender = <Admin.Clients.List />
      break
    default:
      componentToRender = <Box>{'לא נמצא סוג לקוח כזה'}</Box>
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
      {isLoading && <Loader />}
      <Utils.BreadCrumbsUtil
        array={[
          {
            title: userRole == 'ROLE_AGENT' ? 'סוכנים' : 'לקוחות',
            link: '',
          },
        ]}
      />

      <Admin.Clients.Filter />
      <Box sx={{ paddingTop: '16px' }}>{componentToRender}</Box>
      {hydraPagination && (
        <Utils.PaginationUtil hydraPagination={hydraPagination} />
      )}
    </Container>
  )
}

export default Users
