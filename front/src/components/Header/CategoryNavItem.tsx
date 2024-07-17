import React from 'react'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import RemoveIcon from '@mui/icons-material/Remove'
import { useNavigate } from 'react-router-dom'

const CategoryNavItem = ({
  item,
  lvl1,
  handleClose,
}: {
  item: ICategory | null
  lvl1: ICategory
  handleClose: () => void
}) => {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={item?.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item?.categories?.map((lvl3, key) => (
            <ListItemButton
              sx={{ pl: 4 }}
              key={key}
              onClick={() => {
                navigate(
                  `/client/catalog/${lvl1.id}/${item.id}/${lvl3.id}?page=1`
                )
                handleClose()
              }}
            >
              <ListItemIcon>
                <RemoveIcon />
              </ListItemIcon>
              <ListItemText primary={lvl3.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  )
}

export default CategoryNavItem
