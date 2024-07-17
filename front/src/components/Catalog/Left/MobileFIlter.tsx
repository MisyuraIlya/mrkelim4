import React, { useEffect, useState } from 'react'
import Utils from '../../../utils'
import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'
import { useCatalog } from '../../../store/catalog.store'
import hooks from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import GridViewIcon from '@mui/icons-material/GridView'
import TocIcon from '@mui/icons-material/Toc'

const MobileFIlter = () => {
  const [search, setSearch] = useState<string>('')
  const [openDrawver, setOpenDrawver] = useState(false)
  const [openOrden, setOpenOrden] = useState(false)
  const [openProd, setOpenProds] = useState(false)
  const [searchDebounce] = useDebounce(search, 1000)

  const {
    listView,
    setListView,
    prodsPerPage,
    setProdsPerPage,
    sortProdSetting,
    setSortProdSetting,
    sortArr,
    prodsPerPageArr,
  } = useCatalog()

  const { mutate } = hooks.useDataCatalog()

  const navigate = useNavigate()

  const handleSearchValue = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    if (value) {
      urlSearchParams.set('search', value)
    } else {
      urlSearchParams.delete('search')
    }
    const updatedUrl = '?' + urlSearchParams.toString()
    navigate(location.pathname + updatedUrl)
    mutate()
  }

  const handleChangeItemsPerPage = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('itemsPerPage', value)
    urlSearchParams.set('page', '1')
    const updatedUrl = '?' + urlSearchParams.toString()
    setProdsPerPage(value)
    navigate(location.pathname + updatedUrl)
    mutate()
  }

  const handleOrderBy = (value: string) => {
    setSortProdSetting(value)
    if (value == 'שם') {
      value = 'title'
    } else if (value == 'מומלץ') {
      value = 'isSpecial'
    } else if (value == 'חדש') {
      value = 'isNew'
    }
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('orderBy', value)
    const updatedUrl = '?' + urlSearchParams.toString()
    navigate(location.pathname + updatedUrl)
    mutate()
  }

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setListView(newAlignment as typeMode)
  }

  useEffect(() => {
    handleSearchValue(searchDebounce)
  }, [searchDebounce])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Utils.SearchInput
            value={search}
            setValue={setSearch}
            sx={{
              '& .muirtl-152mnda-MuiInputBase-input-MuiOutlinedInput-input': {
                padding: '12px',
              },
            }}
            placeholder="חפש מוצר..."
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => setOpenDrawver(true)}
            variant="contained"
            sx={{
              padding: '0px',
              margin: '0px',
              minWidth: '40px',
              height: '90%',
            }}
          >
            <FilterAltIcon />
          </Button>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: 'flex', justifyContent: 'end', height: '56px' }}
        >
          <ToggleButtonGroup
            value={listView}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="grid">
              <GridViewIcon
                sx={{ color: listView == 'grid' ? 'white' : 'black' }}
              />
            </ToggleButton>
            <ToggleButton value="list">
              <TocIcon sx={{ color: listView == 'list' ? 'white' : 'black' }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Drawer
        anchor="bottom"
        open={openDrawver}
        onClose={() => setOpenDrawver(false)}
      >
        <Box sx={{ height: '100vh', width: '100%' }}>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '16px',
                }}
              >
                <Box>מסננים</Box>
                <IconButton onClick={() => setOpenDrawver(false)}>
                  <CloseIcon />
                </IconButton>
              </ListSubheader>
            }
          >
            <Divider />

            <ListItemButton onClick={() => setOpenOrden(!openOrden)}>
              <ListItemText
                primary="מיון:"
                secondary={sortProdSetting}
                sx={{
                  textAlign: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  gap: '10px',
                  '& .MuiListItemText-primary': {
                    fontSize: '16px',
                  },
                  '& .MuiListItemText-secondary': {
                    fontSize: '16px',
                  },
                }}
              />
              {openOrden ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openOrden} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {sortArr?.map((item, key) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={key}
                    onClick={() => handleOrderBy(item.value)}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            <ListItemButton onClick={() => setOpenProds(!openProd)}>
              <ListItemText
                primary="מוצרים:"
                secondary={prodsPerPage}
                sx={{
                  textAlign: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  gap: '10px',
                  '& .MuiListItemText-primary': {
                    fontSize: '16px',
                  },
                  '& .MuiListItemText-secondary': {
                    fontSize: '16px',
                  },
                }}
              />
              {openProd ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProd} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {prodsPerPageArr?.map((item, key) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={key}
                    onClick={() => handleChangeItemsPerPage(item.value)}
                  >
                    <ListItemText primary={`כמות: ${item.value}`} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default MobileFIlter
