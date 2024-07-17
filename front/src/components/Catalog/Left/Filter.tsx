import React, { useEffect, useState } from 'react'
import { useCatalog } from '../../../store/catalog.store'
import { useDebounce } from 'use-debounce'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'

import GridViewIcon from '@mui/icons-material/GridView'
import TocIcon from '@mui/icons-material/Toc'
import Utils from '../../../utils'
import CustomSelectBox from '../../../utils/CustomSelectBox'
import hooks from '../../../hooks'

const Filter = () => {
  const [search, setSearch] = useState<string>('')
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
  const location = useLocation()
  const navigate = useNavigate()
  const [searchDebounce] = useDebounce(search, 1000)

  const handleSearchValue = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    const res = urlSearchParams.get('search')
    urlSearchParams.set('page', '1')
    if (value || res) {
      urlSearchParams.set('search', value ? value : res!)
    } else {
      urlSearchParams.delete('search')
    }
    const updatedUrl = '?' + urlSearchParams.toString()
    navigate(location.pathname + updatedUrl)
    mutate()
  }

  const handleClose = () => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    urlSearchParams.delete('search')
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
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'space-between',
          height: '44px',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Utils.SearchInput
            value={search}
            setValue={setSearch}
            handleClose={() => handleClose()}
            sx={{
              '& .muirtl-152mnda-MuiInputBase-input-MuiOutlinedInput-input': {
                padding: '12px',
              },
            }}
            // handleFunction={handleDebounced}
            placeholder="חפש מוצר..."
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <CustomSelectBox
            label="הצג"
            value={prodsPerPage}
            onChange={(e) => handleChangeItemsPerPage(e)}
            options={prodsPerPageArr}
          />
          <CustomSelectBox
            label="מיון"
            value={sortProdSetting}
            onChange={(e) => handleOrderBy(e)}
            options={sortArr}
          />

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
        </Box>
      </Box>
    </>
  )
}

export default Filter
