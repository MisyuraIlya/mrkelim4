import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import React, { useState } from 'react'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { themeColors } from '../../../styles/mui'
import { useNavigate, useParams } from 'react-router-dom'

const Card = ({
  element,
  pl,
  color,
}: {
  element: ICategory
  pl: number
  color: string
}) => {
  const [open, setOpen] = useState(false)
  const { lvl1, lvl2, lvl3, documentType } = useParams()
  const navigate = useNavigate()

  const handleClick = (category: ICategory) => {
    setOpen(!open)
    if (category.lvlNumber === 1) {
      navigate(`/client/${documentType}/${category?.id}/0/0?page=1`)
    }
    if (category.lvlNumber === 2) {
      navigate(`/client/${documentType}/${lvl1}/${category.id}/0?page=1`)
    }
    if (category.lvlNumber === 3) {
      navigate(`/client/${documentType}/${lvl1}/${lvl2}/${category?.id}?page=1`)
    }
  }

  const isExistCategory = () => {
    if (
      element?.id.toString() == lvl1 ||
      element?.id.toString() == lvl2 ||
      element?.id.toString() == lvl3
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <ListItemButton sx={{ pl: pl }} onClick={() => handleClick(element)}>
        <ListItemText
          primary={element?.title}
          sx={{ color: isExistCategory() ? themeColors.secondary : color }}
        />
        {element && element.categories && element.categories.length > 0 && (
          <>{open ? <ExpandLess /> : <ExpandMore />}</>
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: pl }}>
          {element?.categories?.map((lvl2, index) => (
            <Box key={index}>
              <Card element={lvl2} pl={4} color={themeColors.asphalt} />
            </Box>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default Card
