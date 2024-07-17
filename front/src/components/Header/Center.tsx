import { Box } from '@mui/material'
import React, { useState } from 'react'
import ProductList from '../../utils/SearchInput/components/ProductList'
import { useDebounce } from 'use-debounce'
import { useModals } from '../../provider/ModalProvider'
import Utils from '../../utils'
import hooks from '../../hooks'

const Center = () => {
  const [search, setSearch] = useState<string>('')
  const [valueDebounced] = useDebounce(search, 1000)
  const { data, isLoading } = hooks.useDataCatalog(valueDebounced)
  const { selectProduct } = useModals()
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        zIndex: 10,
        paddingTop: '5px',
      }}
    >
      <Utils.SearchInput
        value={search}
        setValue={setSearch}
        placeholder="חפש מוצר..."
        microphone={true}
        ListComponent={
          <ProductList
            onClick={(product) => selectProduct(product)}
            array={data?.['hydra:member'] ?? []}
            loading={isLoading}
            totalFound={data?.['hydra:totalItems'] ?? 0}
            searchValue={search}
            setSearchValue={setSearch}
          />
        }
      />
    </Box>
  )
}

export default Center
