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
  const { data, isLoading } = hooks.useDataCartesset()
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
                <TableCell
                  className="col-cont sticky-col"
                  sx={{ minWidth: '80px' }}
                >
                  ת. למאזן
                </TableCell>
                <TableCell className="col-cont sticky-col">תנועה</TableCell>
                <TableCell className="col-cont">ת.אסמכתא</TableCell>
                <TableCell className="col-cont">ת.ערך</TableCell>
                <TableCell className="col-cont">אסמכתא</TableCell>
                <TableCell className="col-cont">פרטים</TableCell>
                <TableCell className="col-cont">חובה/זכות</TableCell>
                <TableCell className="col-cont">יתרה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                data?.lines?.['hydra:member']?.map((element, index) => {
                  return (
                    <TableRow key={index} className={'item'}>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.createdAt).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{element?.tnua}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.asmahta1}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.dateEreh).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{element?.hova}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{element?.zhut}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.yetra ? element.yetra : ''}
                        </Typography>
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
