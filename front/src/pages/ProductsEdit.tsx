import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import Loader from '../utils/Loader'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import { findCategoryTitleById } from '../helpers/handleBreadCrumbs'
import Admin from '../components/Admin'
import hooks from '../hooks'

const ProductsEdit = () => {
  const { lvl1, lvl2, lvl3 } = useParams()
  const { isLoading } = hooks.admin.useDataProductsEdit()
  const { data } = hooks.useDataCategories()
  const categoriesArray = data?.['hydra:member'] || []
  const res1 = findCategoryTitleById(+lvl1!, categoriesArray)
  const res2 = findCategoryTitleById(+lvl2!, categoriesArray)
  const res3 = findCategoryTitleById(+lvl2!, categoriesArray)

  return (
    <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
      {isLoading && <Loader />}
      <BreadCrumbsUtil
        array={[
          {
            title: res1 ?? '',
            link: `/admin/category-edit/${lvl1}/0/0` || '',
          },
          {
            title: res2 ?? '',
            link: `/admin/category-edit/${lvl1}/${lvl2}/0` || '',
          },
        ]}
      />
      <Admin.Products.Filter />
      <Box sx={{ paddingTop: '16px' }}>
        <Admin.Products.List />
      </Box>
    </Container>
  )
}

export default ProductsEdit
