import React, { FC } from 'react'
import ModalWrapper from './ModalWrapper'
import { useSelectedProduct } from '../../store/selecterdProduct.store'
import moment from 'moment'
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { themeColors } from '../../styles/mui'
import hooks from '../../hooks'
import ArticleIcon from '@mui/icons-material/Article'
import { ExcelGeneratorIHistoryPurchse } from '../../helpers/ExcelGenerator'
import { useMobile } from '../../provider/MobileProvider'

type TablePopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const HistoryPurchse: FC<TablePopUpProps> = ({ active, setActive }) => {
  const { selectedProd } = useSelectedProduct()
  const { data, isLoading } = hooks.useDataPurchesHistory(selectedProd.sku)
  const { isMobile } = useMobile()
  return (
    <ModalWrapper
      width={70}
      height={'80%'}
      active={active}
      setActive={setActive}
      component={
        <Box sx={{ display: isMobile ? 'block' : 'flex', gap: '20px' }}>
          <Box>
            <img
              src={
                selectedProd.defaultImagePath
                  ? `${process.env.REACT_APP_MEDIA}/product/${selectedProd.defaultImagePath}`
                  : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
              }
              style={{ width: '90px', height: '90px', objectFit: 'contain' }}
            />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800}>
              {'פירוט היסטוריית רכישה'}
            </Typography>
            <Typography variant="h6">{selectedProd?.title}</Typography>
            <Typography variant="h6">מק"ט {selectedProd?.sku}</Typography>
          </Box>
        </Box>
      }
    >
      <Box>
        <>
          {data && (
            <Button
              sx={{ height: '40px', margin: '10px 0' }}
              variant="outlined"
              startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
              onClick={() => ExcelGeneratorIHistoryPurchse(data)}
            >
              XL
            </Button>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{'מסמך'}</TableCell>
                  <TableCell sx={{ minWidth: '150px' }}>{'תאריך'}</TableCell>
                  <TableCell>{'כמות'}</TableCell>
                  <TableCell>{'מחיר'}</TableCell>
                  <TableCell>{'מחיר אחרי מע"מ'}</TableCell>
                  <TableCell>{'הנחה'}</TableCell>
                  <TableCell>{'סה"כ בתנועה'}</TableCell>
                  <TableCell>{'סה"כ בתנועה אחרי מע"מ'}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  data?.['hydra:member']?.map((element, index) => (
                    <TableRow
                      key={index}
                      // onClick={() => selectProduct(element?.product)}
                    >
                      <TableCell>
                        <Typography>{element?.documentNumber}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {moment(element?.date).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.quantity}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.price}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.vatPrice}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.discount}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.totalPrice}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.vatTotal}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {data?.['hydra:member'].length === 0 && !isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '50px',
              }}
            >
              <img src={`${process.env.REACT_APP_MEDIA}/empyDocument.svg`} />
            </Box>
          )}
        </>
      </Box>
    </ModalWrapper>
  )
}

export default HistoryPurchse
