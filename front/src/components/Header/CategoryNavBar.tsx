import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Grid,
  ListItemButton,
  Box,
} from '@mui/material'
import { themeColors } from '../../styles/mui'
import hooks from '../../hooks'
import { useAuthProvider } from '../../provider/AuthProvider'

const CategoryNavBar = () => {
  const { data } = hooks.useDataCategories()
  const [active, setActive] = useState<number>(0)
  const navigate = useNavigate()
  const { isAuthrized } = useAuthProvider()

  const handlePush = (
    lvl1: ICategory,
    lvl2: ICategory,
    currentItem: ICategory
  ) => {
    if (currentItem.lvlNumber === 2) {
      navigate(`/client/catalog/${lvl1.id}/${lvl2.id}/0?page=1`)
    }
    if (currentItem.lvlNumber === 3) {
      navigate(`/client/catalog/${lvl1.id}/${lvl2.id}/${currentItem.id}?page=1`)
    }
    setActive(0)
  }

  return (
    <List
      sx={{
        backgroundColor: themeColors.primary,
        minHeight: '30px',
        color: 'white',
        marginTop: '10px',
      }}
      onMouseLeave={() => setActive(0)}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          position: 'relative',
          gap: '30px',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        {isAuthrized &&
          data?.['hydra:member']?.map((element, index) => {
            if (element.lvlNumber === 1 && element.isPublished) {
              return (
                <>
                  <Box
                    sx={{
                      height: '30px',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    key={index}
                    onMouseEnter={() => setActive(element.id)}
                  >
                    <Typography
                      sx={{
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: themeColors.secondary,
                        },
                      }}
                      onClick={() =>
                        navigate(`/client/catalog/${element.id}/0/0?page=1`)
                      }
                    >
                      {element?.title}
                    </Typography>
                  </Box>

                  {active == element.id && (
                    <Paper
                      elevation={4}
                      sx={{
                        minHeight: '200px',
                        maxHeight: '500px',
                        overflow: 'auto',
                        position: 'absolute',
                        width: '100%',
                        top: '38px',
                      }}
                      onMouseEnter={() => setActive(element.id)}
                      onMouseLeave={() => setActive(0)}
                    >
                      <Grid
                        container
                        spacing={2}
                        sx={{ padding: '20px 50px 50px 50px' }}
                      >
                        {element?.categories &&
                          element.categories.length > 0 &&
                          element.categories?.map((lvl2, key) => {
                            return (
                              <Grid item xs={2} key={key}>
                                <Typography
                                  variant="body1"
                                  fontWeight={900}
                                  color={themeColors.primary}
                                  sx={{ cursor: 'pointer', textAlign: 'left' }}
                                  onClick={() =>
                                    handlePush(element, lvl2, lvl2)
                                  }
                                >
                                  {lvl2.title}
                                </Typography>
                                <List sx={{ margin: '0', padding: '0' }}>
                                  {lvl2?.categories?.map((lvl3, key2) => (
                                    <ListItem
                                      key={key2}
                                      sx={{ margin: '0', padding: '0' }}
                                    >
                                      <ListItemButton
                                        sx={{ margin: '0', padding: '0' }}
                                      >
                                        <ListItemText
                                          primary={lvl3?.title}
                                          sx={{ cursor: 'pointer' }}
                                          onClick={() =>
                                            handlePush(element, lvl2, lvl3)
                                          }
                                        />
                                      </ListItemButton>
                                    </ListItem>
                                  ))}
                                </List>
                              </Grid>
                            )
                          })}
                      </Grid>
                    </Paper>
                  )}
                </>
              )
            }
          })}
      </Container>
    </List>
  )
}

export default CategoryNavBar
