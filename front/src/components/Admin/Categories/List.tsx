import React, { useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { AdminCatalogService } from '../../../services/admin/AdminCatalog.service'
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
import Card from './Card'
import { useAdminStore } from '../../../store/admin.store'
import hooks from '../../../hooks'

const List = () => {
  const { data } = hooks.admin.useDataCategoryEdit()
  const { searchCategories } = useAdminStore()
  const [categories, setCategories] = useState<ICategory[]>([])

  const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? '#e5e5e5' : '#ddd',
  })

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: any
  ): React.CSSProperties => ({
    userSelect: 'none',
    background: isDragging ? '#f9f9f9' : '#fff',
    ...draggableStyle,
  })

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderedCategories = reorder(
      categories,
      result.source.index,
      result.destination.index
    )

    const updatedCategories = reorderedCategories.map((category, index) => ({
      ...category,
      orden: index,
    }))

    setCategories(updatedCategories)
    await AdminCatalogService.dragAndDropCategories(updatedCategories)
  }

  const reorder = (list: ICategory[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  useEffect(() => {
    setCategories(data?.['hydra:member'] ?? [])
  }, [data?.['hydra:member']])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Box
            sx={{ margin: '0' }}
            {...provided.innerRef}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>תמונה</TableCell>
                    <TableCell>מזהה</TableCell>
                    <TableCell>שם קטגוריה</TableCell>
                    <TableCell>סטאטוס</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories
                    ?.filter((element) => {
                      if (!searchCategories) return true
                      const searchLower = searchCategories.toLowerCase()
                      return element.title.toLowerCase().includes(searchLower)
                    })
                    .map((element, index) => {
                      return (
                        <Draggable
                          key={element.id}
                          draggableId={element.id + ''}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <TableRow
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <Card element={element} />
                            </TableRow>
                          )}
                        </Draggable>
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
