import React from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { themeColors } from '../../../styles/mui'
import { UserStatus } from '../../../enums/status'
import { useCart } from '../../../store/cart.store'
import { onAsk } from '../../../utils/MySweetAlert'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/auth.store'
import hooks from '../../../hooks'
import { URLS } from '../../../enums/urls'

const List = () => {
  const { data, isLoading } = hooks.agent.useDataAgentClients()
  const { setUser } = useAuth()
  const { cart, setCart } = useCart()
  const navigate = useNavigate()

  const handleUser = async (user: IUser) => {
    if (cart.length > 0) {
      const ask = await onAsk('קיימים פריטים בסל', 'כל הפריטים ימחקו')
      if (ask) {
        setCart([])
        setUser(user)
        navigate(URLS.PROFILE.LINK)
      }
    } else {
      setUser(user)
      navigate(URLS.PROFILE.LINK)
    }
  }
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table className="lines-sub-cont">
          <TableHead>
            <TableRow className="heading">
              <TableCell
                className="col-cont sticky-col"
                sx={{ minWidth: '80px' }}
              >
                שם לקוח
              </TableCell>
              <TableCell className="col-cont sticky-col">מס לקוח</TableCell>
              <TableCell className="col-cont sticky-col">טלפון</TableCell>
              <TableCell className="col-cont">ח.פ/ע.מ</TableCell>
              <TableCell className="col-cont">אובליגו</TableCell>
              <TableCell className="col-cont">יתרת חוב</TableCell>
              <TableCell className="col-cont">כתובת</TableCell>
              <TableCell className="col-cont">עיר</TableCell>
              <TableCell className="col-cont">סטאטוס</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              data?.['hydra:member']?.map((element, index) => {
                return (
                  <TableRow
                    key={index}
                    className={'item'}
                    onClick={() => handleUser(element)}
                  >
                    <TableCell>
                      <Typography variant="body2">{element?.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{element?.extId}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{element?.phone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{element?.hp}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {element?.maxObligo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {element?.maxCredit}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {element?.address}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{element?.city}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {UserStatus(element)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default List
