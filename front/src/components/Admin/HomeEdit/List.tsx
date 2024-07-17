import React, { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import hooks from '../../../hooks'
import Card from './Card'
import { AdminHomeEditService } from '../../../services/admin/AdminHomeEdit.service'

const List = () => {
  const { data } = hooks.admin.useHomeEdit()
  const [homeEdit, setHomeEdit] = useState<IHomeEdit[]>([])

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderedCategories = reorder(
      homeEdit,
      result.source.index,
      result.destination.index
    )

    const updatedCategories = reorderedCategories.map((category, index) => ({
      ...category,
      orden: index,
    }))

    setHomeEdit(updatedCategories)
    await AdminHomeEditService.dragAndDropEdit(updatedCategories)
  }

  const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? '#e5e5e5' : '#ddd',
  })

  const reorder = (list: IHomeEdit[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: any
  ): React.CSSProperties => ({
    userSelect: 'none',
    background: isDragging ? '#f9f9f9' : '#fff',
    ...draggableStyle,
  })

  useEffect(() => {
    setHomeEdit(data?.['hydra:member'] ?? [])
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
                    <TableCell>סוג</TableCell>
                    <TableCell>מיקום</TableCell>
                    <TableCell>סרטון</TableCell>
                    <TableCell>באננר</TableCell>
                    {/* <TableCell>פופ אפ</TableCell> */}
                    <TableCell>סטטוס</TableCell>
                    <TableCell>כמות עמודות בדסקטופ</TableCell>
                    <TableCell>כמות עמודות במובייל</TableCell>
                    <TableCell>שיוך מדייה</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {homeEdit.map((element, index) => {
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
