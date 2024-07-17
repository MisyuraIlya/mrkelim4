import React from 'react'
import Loader from '../utils/Loader'
import { Container } from '@mui/material'
import hooks from '../hooks'
import Utils from '../utils'
import Agent from '../components/Agent'
const AgentClinets = () => {
  const { hydraPagination, isLoading } = hooks.agent.useDataAgentClients()

  return (
    <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
      <Utils.BreadCrumbsUtil
        array={[
          {
            title: 'לקוחות שלי',
            link: '',
          },
        ]}
      />
      {isLoading && <Loader />}
      <Agent.Clients.Filter />
      <Agent.Clients.List />
      {hydraPagination && (
        <Utils.PaginationUtil hydraPagination={hydraPagination} />
      )}
    </Container>
  )
}

export default AgentClinets
