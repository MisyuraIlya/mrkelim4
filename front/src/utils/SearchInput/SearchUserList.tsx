import React, { FC, useState } from 'react'
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import SearchInput from '.'
import useSWR from 'swr'
import { userService } from '../../services/user.service'
import { useDebounce } from 'use-debounce'

interface SearchUserListProps {
  onClick: (user: IUser) => void
}

const SearchUserList: FC<SearchUserListProps> = ({ onClick }) => {
  const [search, setSearch] = useState('')
  const [valueDebounced] = useDebounce(search, 1000)
  const [clickedUser, setClikedUser] = useState<IUser | null>(null)

  const fetchData = async (searchValue: string): Promise<UsersResponse> => {
    return await userService.getUsers(searchValue)
  }

  const { data, error, isValidating } = useSWR<UsersResponse>(
    valueDebounced ? `/api/users?search=${valueDebounced}` : null,
    () => fetchData(valueDebounced),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const handlSearch = (e: string) => {
    setSearch(e)
    setClikedUser(null)
  }

  const handleClick = (user: IUser) => {
    onClick(user)
    setSearch('')
    setClikedUser(user)
  }

  return (
    <SearchInput
      value={clickedUser ? clickedUser.name : search}
      setValue={handlSearch}
      placeholder="חפש לקוח"
      ListComponent={
        <>
          {search && (
            <Paper
              elevation={2}
              sx={{
                height: '300px',
                overflow: 'auto',
                position: 'absolute',
                width: '100%',
                zIndex: 10,
              }}
            >
              <Box sx={{ height: '100%', overflow: 'auto' }}>
                {isValidating ? (
                  <Box
                    sx={{ display: 'flex', height: '300px' }}
                    className="centered"
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <List>
                    {data?.['hydra:member'].map((element, index) => {
                      return (
                        <ListItem
                          key={index}
                          sx={{ background: 'white' }}
                          onClick={() => handleClick(element)}
                        >
                          <ListItemButton sx={{ display: 'flex', gap: '20px' }}>
                            <ListItemText
                              primary={element.extId}
                              secondary={
                                <>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {element.name}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      )
                    })}
                  </List>
                )}
              </Box>
            </Paper>
          )}
        </>
      }
    />
  )
}

export default SearchUserList
