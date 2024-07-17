import React from 'react'
import { Box, Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import Loader from '../utils/Loader'
import { findDocumentTypeTitle } from '../helpers/handleBreadCrumbs'
import Documents from '../components/Documents'
import Utils from '../utils'
import hooks from '../hooks'

type RouteParams = {
  documentType: IDocumentTypes
  dateFrom: string
  dateTo: string
}

const DocumentsPage = () => {
  const { documentType } = useParams<RouteParams>()

  let componentToRender: React.ReactNode
  switch (documentType) {
    case 'history':
    case 'draft':
    case 'order':
    case 'priceOffer':
    case 'deliveryOrder':
    case 'aiInvoice':
    case 'ciInvoice':
    case 'returnOrder':
    case 'approve':
      componentToRender = <Documents.Document.List />
      break
    case 'kartesset':
      componentToRender = <Documents.Cartesset.List />
      break
    default:
      componentToRender = <Box>{'לא נמצא סוג מסמך כזה'}</Box>
  }

  const { hydraPagination, isLoading } = hooks.useDataDocuments()

  return (
    <Container maxWidth="xl">
      {isLoading && <Loader />}
      <Box sx={{ mt: '50px' }}>
        <Utils.BreadCrumbsUtil
          array={[
            {
              title: findDocumentTypeTitle(documentType),
              link: '',
            },
          ]}
        />
      </Box>
      <Documents.Document.Filter />
      {componentToRender}
      {hydraPagination && (
        <Utils.PaginationUtil hydraPagination={hydraPagination} />
      )}
    </Container>
  )
}

export default DocumentsPage
