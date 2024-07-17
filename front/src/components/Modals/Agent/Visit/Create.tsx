import React, { useState } from 'react'
import { useAuth } from '../../../../store/auth.store'
import ModalWrapper from '../../../../components/Modals/ModalWrapper'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import {
  HEBREW_DAYS,
  ReactSelectOptionsOfFullHour,
} from '../../../../helpers/arrayOfMonths'
import moment from 'moment'
import SearchUserList from '../../../../utils/SearchInput/SearchUserList'
import { onAsk, onSuccessAlert } from '../../../../utils/MySweetAlert'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import hooks from '../../../../hooks'

type EditAndCreateVisitForm = {
  week1: boolean
  week2: boolean
  week3: boolean
  week4: boolean
  day: string
  hourFrom: string
  hourTo: string
}

const Create = ({
  item,
  open,
  setOpen,
}: {
  item?: IAgentObjective
  open: boolean
  setOpen: (bool: boolean) => void
}) => {
  const { user } = useAuth()
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const { createVisit, updateVisit, deleteVisit } =
    hooks.agent.useDataAgentObjectives('visit')
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditAndCreateVisitForm>({
    defaultValues: {
      week1: item?.week1 || false,
      week2: item?.week2 || false,
      week3: item?.week3 || false,
      week4: item?.week4 || false,
      day: item?.choosedDay || '',
      hourFrom: item?.hourFrom || '',
      hourTo: item?.hourTo || '',
    },
  })

  const handleClick = (data: EditAndCreateVisitForm) => {
    if (item?.client?.name) {
      item.week1 = data.week1 ?? item.week1
      item.week2 = data.week2 ?? item.week2
      item.week3 = data.week3 ?? item.week3
      item.week4 = data.week4 ?? item.week4
      item.choosedDay = data?.day ?? item.choosedDay
      item.hourFrom = data?.hourFrom ?? item.hourFrom
      item.hourTo = data?.hourTo ?? item.hourTo
      updateVisit(item)
      onSuccessAlert('ביקור עודכן בהצלחה', '')
    } else {
      if (selectedUser && user) {
        let obj: IAgentObjective = {
          agent: user,
          client: selectedUser,
          isCompleted: false,
          completedAt: null,
          title: '',
          description: '',
          week1: data.week1,
          week2: data.week2,
          week3: data.week3,
          week4: data.week4,
          hourFrom: data.hourFrom,
          hourTo: data.hourTo,
          choosedDay: data.day,
          date: moment().format('YYYY-MM-DD'),
          objectiveType: 'visit',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
          subTusk: [],
        }
        onSuccessAlert('ביקור הוקם בהצלחה', '')
        createVisit(obj)
      }
    }
    setOpen(false)
  }

  const handleDelete = async () => {
    const ask = await onAsk('בטוח תרצה למחוק?', '')
    if (ask && item?.id) {
      deleteVisit(item?.id)
      setOpen(false)
      onSuccessAlert('ביקור נמחק בהצלחה', '')
    }
  }

  const onClickHandle = (user: IUser) => {
    setSelectedUser(user)
  }

  const isMobile = useMediaQuery('(max-width:800px)')

  return (
    <ModalWrapper
      active={open}
      setActive={setOpen}
      width={isMobile ? 80 : 20}
      height={isMobile ? 70 : 55}
    >
      <form className="centered" onSubmit={handleSubmit(handleClick)}>
        <Box>
          <Typography variant="h5" sx={{ padding: '20px 0' }}>
            {item?.id ? 'עדכון ביקור' : 'יצירת ביקור'}
          </Typography>
          {item?.id ? (
            <Box
              sx={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                margin: '10px 0',
              }}
            >
              <PersonOutlineIcon />
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: '18px' }}
              >
                #{item?.client?.extId} - {item?.client?.name}
              </Typography>
            </Box>
          ) : (
            <SearchUserList onClick={onClickHandle} />
          )}
          <Typography variant="h5" textAlign={'center'}>
            שבוע
          </Typography>
          <Box className="centered" sx={{ gap: '20px' }}>
            <Box>
              <Typography textAlign={'center'}>1</Typography>
              <Switch
                defaultChecked={item?.week1 || false}
                {...register('week1')}
              />
            </Box>
            <Box>
              <Typography textAlign={'center'}>2</Typography>
              <Switch
                defaultChecked={item?.week2 || false}
                {...register('week2')}
              />
            </Box>
            <Box>
              <Typography textAlign={'center'}>3</Typography>
              <Switch
                defaultChecked={item?.week3 || false}
                {...register('week3')}
              />
            </Box>
            <Box>
              <Typography textAlign={'center'}>4</Typography>
              <Switch
                defaultChecked={item?.week4 || false}
                {...register('week4')}
              />
            </Box>
          </Box>
          <Typography
            variant="h5"
            textAlign={'center'}
            sx={{ marginTop: '40px' }}
          >
            יום בשבוע
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {'בחר יום בשבוע'}
            </InputLabel>
            <Controller
              name="day"
              control={control}
              rules={{
                required: 'בחר יום בשבוע',
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="בחר יום בשבוע"
                  placeholder="בחר יום בשבוע"
                >
                  {HEBREW_DAYS?.map((item, index) => (
                    <MenuItem value={item.value} key={index}>
                      {item.value}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <Box sx={{ gap: '20px', marginTop: '20px' }} className="centered">
            <FormControl fullWidth>
              <InputLabel id="from-select-label">משעה</InputLabel>
              <Controller
                name="hourFrom"
                control={control}
                rules={{
                  required: 'בחר משעה',
                }}
                render={({ field }) => (
                  <Select {...field} label="משעה" placeholder="משעה">
                    {ReactSelectOptionsOfFullHour?.map((item, index) => (
                      <MenuItem value={item.value} key={index}>
                        {item.value}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="to-select-label">עד שעה</InputLabel>
              <Controller
                name="hourTo"
                control={control}
                rules={{
                  required: 'בחר עד שעה',
                }}
                render={({ field }) => (
                  <Select {...field} label="עד שעה" placeholder="עד שעה">
                    {ReactSelectOptionsOfFullHour?.map((item, index) => (
                      <MenuItem value={item.value} key={index}>
                        {item.value}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: '18px',
              position: 'absolute',
              bottom: '30px',
              right: '60px',
              borderRadius: '8px',
            }}
          >
            צור ביקור
          </Button>
          {item?.id && (
            <Button
              onClick={() => handleDelete()}
              variant="outlined"
              color="error"
              type="button"
              sx={{
                fontSize: '18px',
                position: 'absolute',
                bottom: '30px',
                left: '60px',
                borderRadius: '8px',
              }}
            >
              מחיקה
            </Button>
          )}
        </Box>
      </form>
    </ModalWrapper>
  )
}

export default Create
