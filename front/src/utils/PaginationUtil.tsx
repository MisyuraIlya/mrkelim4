import { Box, Pagination, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface PaginationUtilProps {
  hydraPagination: hydraPagination
}
const PaginationUtil: FC<PaginationUtilProps> = ({ hydraPagination }) => {
  const navigate = useNavigate()

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', page.toString())
    const updatedUrl = '?' + urlSearchParams.toString()
    navigate(location.pathname + updatedUrl)
    window.scrollTo(0, 0)
  }

  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(65,67,106,.2117647059)',
        borderBottom: '1px solid rgba(65,67,106,.2117647059)',
        padding: '10px',
        margin: '30px 0',
        marginBottom: '70px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Pagination
        count={+hydraPagination.totalPages}
        page={+hydraPagination.page}
        onChange={handlePageChange}
      />
      <Box sx={{ gap: '10px' }} className="centered">
        <Typography>עמוד {hydraPagination.page}</Typography>
        <Typography>עמוד {hydraPagination.totalPages}</Typography>
      </Box>
    </Box>
  )
}

export default PaginationUtil
