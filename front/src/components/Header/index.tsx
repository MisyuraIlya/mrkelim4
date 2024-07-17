import React, { useState } from 'react'
import { AppBar, Grid, IconButton, Toolbar } from '@mui/material'
import Center from './Center'
import CategoryNavBar from './CategoryNavBar'
import Right from './Right'
import Left from './Left'
import { useAuth } from '../../store/auth.store'
import { useMobile } from '../../provider/MobileProvider'
import SearchIcon from '@mui/icons-material/Search'
import CategoryNavBarMobile from './CategoryNavBarMobile'
import { useAuthProvider } from '../../provider/AuthProvider'

const AppBarComponent = () => {
  const { isAdmin, isAgent, user } = useAuth()
  const { isMobile } = useMobile()
  const [openSearch, setOpenSearch] = useState(false)
  const { isAuthrized } = useAuthProvider()

  return (
    <AppBar position="sticky" style={{ zIndex: 990 }}>
      <Toolbar
        sx={{
          height: '80px',
          alignContent: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={2} maxWidth={'xl'}>
          <Grid
            item
            xs={3}
            sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}
          >
            {isAdmin && <Right.AdminDrawver />}
            <Right.Logo />
            {isAgent && !isMobile && <Right.AgentMenu />}
          </Grid>
          <Grid item xs={6}>
            {!isMobile && isAuthrized && <Center />}
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              gap: isMobile ? '5px' : '20px',
              alignItems: 'center',
              justifyContent: 'end',
            }}
          >
            {!isMobile && (
              <>
                <Left.ProfileButton />
                {(isAgent || isAdmin) && <Left.ClientsButton />}
                {user && <Left.CartButton />}
              </>
            )}
            {isMobile && (
              <IconButton onClick={() => setOpenSearch(!openSearch)}>
                <SearchIcon sx={{ fontSize: '30px' }} />
              </IconButton>
            )}
            {user && <Left.NotificationButton />}
          </Grid>
        </Grid>
      </Toolbar>
      {isMobile ? (
        <>{!openSearch && <CategoryNavBarMobile />}</>
      ) : (
        <CategoryNavBar />
      )}
      {openSearch && <Center />}
    </AppBar>
  )
}

export default AppBarComponent
