import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import hooks from '../hooks'

const CatalogView = () => {
  const { data } = hooks.useDataCategories()
  const { lvl1 } = useParams()
  const navigate = useNavigate()
  return (
    <Container maxWidth="lg" sx={{ marginBottom: '200px' }}>
      <BreadCrumbsUtil array={[{ title: 'קטגוריות', link: '' }]} />
      <Grid container spacing={2}>
        {data?.['hydra:member']?.map((element: ICategory, index) => {
          if (element?.parent?.id == lvl1) {
            return (
              <Grid item sm={3} xs={6} key={index}>
                <Card
                  elevation={0}
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    navigate(`/client/catalog/${element.id}/0/0?page=1`)
                  }
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    src={
                      element?.MediaObject?.filePath
                        ? `${process.env.REACT_APP_MEDIA}/category/${element?.MediaObject?.filePath}`
                        : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
                    }
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h5">{element?.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          }
        })}
      </Grid>
    </Container>
  )
}

export default CatalogView
