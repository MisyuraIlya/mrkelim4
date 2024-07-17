import React from 'react'
import { themeColors } from '../../../styles/mui'
import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import moment from 'moment'
import hooks from '../../../hooks'

const List = () => {
  const { data, isLoading } = hooks.useDataHovot()
  return (
    <Box sx={{ margin: '50px 0px' }}>
      {data?.lines?.['hydra:member'].length === 0 && !isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={`${process.env.REACT_APP_MEDIA}/empyDocument.svg`} />
        </Box>
      ) : null}
      {isLoading &&
        Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            variant="rounded"
            key={index}
            height={50}
            sx={{ margin: '5px 0' }}
          />
        ))}
      {(data?.lines?.['hydra:member'] ?? []).length > 0 ? (
        <TableContainer component={Paper}>
          <Table className="lines-sub-cont">
            <TableHead>
              <TableRow className="heading">
                <TableCell className="col-cont sticky-col">שורה</TableCell>
                <TableCell className="col-cont sticky-col">
                  תאריך חשבונית
                </TableCell>
                <TableCell className="col-cont">חשבונית</TableCell>
                <TableCell className="col-cont">סכום חשבונית</TableCell>
                <TableCell className="col-cont">חוב מצטבר</TableCell>
                <TableCell className="col-cont">תאריך תשלום</TableCell>
                <TableCell className="col-cont">ימי פיגור</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                data?.lines?.['hydra:member']?.map((element, index) => {
                  const fncDate = moment(element?.payDate, 'YYYY-MM-DD')
                  const daysDiff = fncDate.isValid()
                    ? moment().diff(fncDate, 'days')
                    : 'Invalid Date'

                  return (
                    <TableRow key={index} className={'item'}>
                      <TableCell>
                        <Typography variant="body2">{index + 1}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.createdAt).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.documentNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.debit} ₪
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.lineSum} ₪
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.payDate).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{daysDiff} ימים</Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Box>
  )
}

export default List
