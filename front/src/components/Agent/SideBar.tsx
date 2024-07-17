import React from 'react'
import { useAuth } from '../../store/auth.store'
import { useNavigate, useParams } from 'react-router-dom'
import hooks from '../../hooks'
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'

const SideBar = () => {
  // const { agentList } = useAgentProfileStore()
  const { setAgent, user } = useAuth()
  const { id } = useParams()
  console.log('user', user)
  // const { pathname } = useLocation()
  // const page = pathname.split('/')[1]
  const { data } = hooks.agent.useDataAgents()
  const navigate = useNavigate()

  const handleChange = (agent: IUser) => {
    setAgent(agent)
    navigate(`/agentDashboard/0/${agent.id}`)
  }
  return (
    <>
      <List sx={{ width: '100%' }}>
        {data?.['hydra:member']?.map((item, index) => (
          <ListItem
            onClick={() => handleChange(item)}
            alignItems="flex-start"
            key={index}
            sx={{
              margin: '10px 0',
              cursor: 'pointer',
              borderRadius: '5px',
              background: id == item.id ? '#d1d9e8' : null,
              border: user?.id == item.id ? '1px solid #d1d9e8' : null,
            }}
          >
            <ListItemAvatar>
              <Avatar alt={item.name} />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.phone}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      {/* <div className="agentsListMainCont">
        <div className="AgentsList">
          <div className="MyDivider"></div>
          <div className="AgentsListCont">
            {agentList && agentList.length
              ? agentList.map((item, index) => {
                  return (
                    <Link key={index} to={`/${page}/${item.id}`}>
                      <div
                        className={item?.id === Number(id) ? 'set-border' : ''}
                      >
                        <div
                          className={
                            item?.id === Number(id)
                              ? 'AgentsListContRow active'
                              : 'AgentsListContRow'
                          }
                        >
                          <p>{'#' + item.extId}</p>
                          <p>{item.name}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })
              : null}
          </div>
        </div>
      </div> */}
    </>
  )
}

export default SideBar
