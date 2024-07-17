import React from 'react'
import { useCatalog } from '../../../store/catalog.store'
import { Box, Grid, Skeleton, Typography } from '@mui/material'
import ProductCard from '../../ProductCard'
import hooks from '../../../hooks'
import { useMobile } from '../../../provider/MobileProvider'
const List = () => {
  const { listView } = useCatalog()
  const { data, isLoading } = hooks.useDataCatalog()
  const { isMobile } = useMobile()
  return (
    <Grid container spacing={2}>
      {isLoading ? (
        <>
          {Array.from({ length: 24 }).map((_, index) => (
            <Grid
              item
              xs={listView == 'list' ? 12 : isMobile ? 6 : 3}
              key={index}
            >
              <Skeleton
                variant="rounded"
                height={listView == 'list' ? 150 : 120}
                sx={{ margin: '5px 0' }}
              />
              {listView != 'list' && (
                <>
                  <Skeleton
                    variant="rounded"
                    height={120}
                    sx={{ margin: '5px 0' }}
                  />
                  <Skeleton variant="rounded" height={60} />
                </>
              )}
            </Grid>
          ))}
        </>
      ) : (
        <>
          {data?.['hydra:member']?.map((product, index) => (
            <Grid
              item
              xs={listView == 'list' ? 12 : 6}
              key={index}
              sm={listView == 'list' ? 12 : 3}
            >
              <ProductCard product={product} listView={listView == 'list'} />
            </Grid>
          ))}
        </>
      )}
      {data?.['hydra:member']?.length == 0 && (
        <Box
          sx={{
            minHeight: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <img src={`${process.env.REACT_APP_MEDIA}/catalogEmpty.svg`} />
        </Box>
      )}
    </Grid>
  )
}

export default List
