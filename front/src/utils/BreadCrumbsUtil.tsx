import React, { FC } from 'react'
import { Box, Breadcrumbs, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { themeColors } from '../styles/mui'

interface BreadCrumbsArr {
  title: string
  link: string
}

interface BreadCrumbsProps {
  array: BreadCrumbsArr[]
}

const BreadCrumbsUtil: FC<BreadCrumbsProps> = ({ array }) => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
      }}
    >
      <Breadcrumbs className="centered">
        <Typography
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
          color={themeColors.primary}
          fontSize={'14px'}
        >
          בית
        </Typography>
        {array?.map((element, index) => {
          if (element.title) {
            return (
              <Typography
                key={index}
                fontSize={'14px'}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(element.link)}
                color={themeColors.primary}
              >
                {element.title}
              </Typography>
            )
          }
        })}
      </Breadcrumbs>
      <Button
        endIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        חזור
      </Button>
    </Box>
  )
}

export default BreadCrumbsUtil
