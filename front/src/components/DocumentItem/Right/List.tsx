import React from 'react'
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
} from '@mui/material'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useModals } from '../../../provider/ModalProvider'
import { themeColors } from '../../../styles/mui'
import hooks from '../../../hooks'
import { useDocumentStore } from '../../../store/document.store'

const List = () => {
  const { selectProduct } = useModals()
  const { searchProducts } = useDocumentStore()
  const { data, isLoading } = hooks.useDataDocumentsItem()

  const filteredProducts = data?.products['hydra:member']?.filter(
    (element) =>
      element?.title?.toLowerCase().includes(searchProducts.toLowerCase()) ||
      element?.sku?.toLowerCase().includes(searchProducts.toLowerCase())
  )

  return (
    <Box sx={{ marginTop: '30px' }}>
      {isLoading &&
        Array.from({ length: 24 }).map((_, index) => (
          <Skeleton
            variant="rounded"
            key={index}
            height={70}
            sx={{ margin: '5px 20px' }}
          />
        ))}
      <TableContainer component={Paper} elevation={0} sx={{ height: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>מוצר</TableCell>
              <TableCell sx={{ minWidth: '150px' }}></TableCell>
              <TableCell>כמות</TableCell>
              <TableCell>מחיר יח'</TableCell>
              <TableCell>הנחה</TableCell>
              <TableCell>סה״כ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts?.map((element, index) => (
              <TableRow
                key={index}
                onClick={() => selectProduct(element?.product)}
              >
                <TableCell>
                  <img
                    style={{ height: '70px' }}
                    src={
                      element?.product?.defaultImagePath
                        ? process.env.REACT_APP_MEDIA +
                          '/product/' +
                          element?.product?.defaultImagePath
                        : process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                    }
                    alt=""
                  />
                </TableCell>
                <TableCell>
                  <Typography>{'#' + element?.sku}</Typography>
                  <Typography>{element?.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.quantity}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>₪{element?.priceByOne}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.discount?.toFixed(1) + '%'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700}>
                    ₪{numberWithCommas(element?.total?.toFixed(1))}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="centered">
        {filteredProducts?.length === 0 && !isLoading && (
          <Typography variant="h6">לא נמצאו פריטים למסמך זה</Typography>
        )}
      </Box>
    </Box>
  )
}

export default List
