import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { AdminProductService } from '../../../services/admin/AdminProducts.service'
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Card from './Card'
import { useAdminStore } from '../../../store/admin.store'
import hooks from '../../../hooks'

const List = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const { data } = hooks.admin.useDataProductsEdit()
  const { searchProducts } = useAdminStore()

  const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? '#e5e5e5' : '#ddd',
  })

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return
    }
    const items = reorder(
      products,
      result.source.index,
      result.destination.index
    )
    setProducts(items)
    await AdminProductService.updateProduct({
      id: result.draggableId,
      orden: result.destination.index,
    })
  }

  const reorder = (list: IProduct[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  useEffect(() => {
    setProducts(data?.['hydra:member'] ?? [])
  }, [data?.['hydra:member']])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Box
            sx={{ margin: '0' }}
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <TableContainer component={Paper} elevation={0}>
              <Table className="lines-sub-cont">
                <TableHead>
                  <TableRow className="heading">
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">תמונה</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">גלריה</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">מק״ט</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">כותרת מוצר</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">חדש?</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">נמכר ביותר?</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">סטטוס</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .filter((element) => {
                      if (!searchProducts) return true
                      const searchLower = searchProducts.toLowerCase()
                      return (
                        element.title.toLowerCase().includes(searchLower) ||
                        element.sku.toLowerCase().includes(searchLower)
                      )
                    })
                    .map((element, index) => {
                      return (
                        <Card key={index} element={element} index={index} />
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default List
