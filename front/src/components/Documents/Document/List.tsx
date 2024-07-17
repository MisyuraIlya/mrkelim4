import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Skeleton,
  IconButton,
  Tooltip,
} from '@mui/material' // Import Material-UI components
import { themeColors } from '../../../styles/mui'
import { DocumentTypeHebrew } from '../../../helpers/DocumentTypeHebrew'
import { useAuth } from '../../../store/auth.store'
import hooks from '../../../hooks'
import InfoIcon from '@mui/icons-material/Info'

const List = () => {
  const { documentType } = useParams()
  const { data, isLoading } = hooks.useDataDocuments()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  console.log('documentType', documentType)
  const handleNavigate = (element: IDocument) => {
    if (documentType === 'history' || documentType === 'draft') {
      navigate(`/documentItemPage/history/${element?.id}`)
    } else {
      navigate(
        `/documentItemPage/${element?.documentType}/${element?.documentNumber}`
      )
    }
  }

  const handleStatus = (value: string) => {
    console.log('value', value)
    if (value === 'paid') {
      return 'שודר'
    } else if (value === 'draft') {
      return 'טיוטה'
    } else if (value === 'pending') {
      return 'ממתין'
    } else if (value === 'failed') {
      return 'שגיאה'
    } else if (value === 'waiting_approve') {
      return 'ממתין לאישור'
    } else {
      return value
    }
  }

  return (
    <Box sx={{ marginTop: '50px' }}>
      {data?.['hydra:member'].length === 0 && !isLoading ? (
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
      {(data?.['hydra:member'] ?? []).length > 0 ? (
        <TableContainer component={Paper}>
          <Table className="lines-sub-cont">
            <TableHead>
              <TableRow className="heading">
                <TableCell className="col-cont sticky-col">#</TableCell>
                <TableCell sx={{ minWidth: '150px' }}>לקוח</TableCell>
                {(user?.role === 'ROLE_AGENT' ||
                  user?.role === 'ROLE_SUPER_AGENT' ||
                  user?.role === 'ROLE_ADMIN') &&
                  documentType == 'order' && (
                    <TableCell sx={{ minWidth: '150px' }}>סוכן</TableCell>
                  )}
                <TableCell sx={{ minWidth: '150px' }}>סוג</TableCell>
                <TableCell sx={{ minWidth: '100px' }}>ת.ערך</TableCell>
                <TableCell sx={{ minWidth: '150px' }}>ת.תשלום</TableCell>
                <TableCell className="col-cont">סה״כ</TableCell>
                <TableCell className="col-cont">סטאטוס</TableCell>
                {isAdmin && documentType === 'history' && (
                  <TableCell className="col-cont">שגיאה</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                data?.['hydra:member']?.map((element, index) => {
                  return (
                    <TableRow
                      key={index}
                      className={'item'}
                      onClick={() => handleNavigate(element)}
                    >
                      <TableCell>
                        <Typography variant="body2">
                          {'#' + element?.documentNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {'#' + element?.userExId}
                        </Typography>
                        <Typography variant="body2">
                          {element?.userName}
                        </Typography>
                      </TableCell>
                      {(user?.role === 'ROLE_AGENT' ||
                        user?.role === 'ROLE_SUPER_AGENT' ||
                        user?.role === 'ROLE_ADMIN') &&
                        documentType == 'order' && (
                          <TableCell>
                            <Typography variant="body2">
                              {element?.agentExId ?? '-'}
                            </Typography>
                            <Typography variant="body2">
                              {element?.agentName}
                            </Typography>
                          </TableCell>
                        )}
                      <TableCell>
                        <Typography variant="body2">
                          {documentType &&
                            DocumentTypeHebrew(
                              element?.documentType as IDocumentTypes
                            )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.createdAt).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.updatedAt).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.total?.toFixed(1)}
                        </Typography>
                      </TableCell>
                      <TableCell>{handleStatus(element?.status)}</TableCell>
                      {isAdmin && documentType === 'history' && (
                        <TableCell>
                          {element?.error && (
                            <Tooltip
                              title={element?.error}
                              style={{ cursor: 'help' }}
                            >
                              <IconButton
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                }}
                              >
                                <InfoIcon color="error" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      )}
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
