import React, { FC, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { themeColors } from '../../../styles/mui'
import SettingsIcon from '@mui/icons-material/Settings'
import { UserStatus } from '../../../enums/status'
import moment from 'moment'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled'
import {
  onAsk,
  onErrorAlert,
  onSuccessAlert,
} from '../../../utils/MySweetAlert'

import { useForm, Controller } from 'react-hook-form'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { AdminClinetsService } from '../../../services/admin/AdminClients.service'
import { useParams } from 'react-router-dom'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import Modals from '../../Modals'
interface ClientItemProps {
  element: IUser
  index: number
}

type RegistrationForm = {
  email: string
  password: string
  confirmPassword: string
}

type RouteParams = {
  userRole: ROLE_TYPES
}
const Card: FC<ClientItemProps> = ({ element, index }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const { userRole } = useParams<RouteParams>()
  const isUser = userRole === 'ROLE_USER'
  const isAgent = userRole === 'ROLE_AGENT'
  const [openInfo, setOpenInfo] = useState(false)
  const [isMaster, setIsMaster] = useState(element.role === 'ROLE_SUPER_AGENT')
  const [openSettings, setOpenSettings] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RegistrationForm>()

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleBlock = async (value: boolean) => {
    if (value) {
      const ask = await onAsk(
        'בטוח תרצה לחסום',
        `המשתמש "${element.name}" לא יוכל להכנס למערכת ולבצע הזמנות`
      )
      if (ask) {
        element.isBlocked = value
        const response = await AdminClinetsService.updateClient(element)
        if (response.status == 'success') {
          onSuccessAlert('המשתמש נחסם בהצלחה', '')
        } else {
          onErrorAlert('לא עודכן', response.message)
        }
      }
    } else {
      element.isBlocked = value
      const response = await AdminClinetsService.updateClient(element)
      if (response.status == 'success') {
        onSuccessAlert('המשתמש נפתח בהצלחה', '')
      } else {
        onErrorAlert('לא עודכן', response.message)
      }
    }
    setAnchorEl(null)
  }

  const handleReset = async () => {
    const ask = await onAsk(
      'בטוח תרצה לאפס את המשתמש?',
      `המשתמש "${element.name}" אצטרך לבצע הרשמה מחדש`
    )
    if (ask) {
      element.isRegistered = false
      element.passwordUnencrypted = null
      element.email = null
      const response = await AdminClinetsService.updateClient(element)
      if (response.status == 'success') {
        onSuccessAlert('לקוח אופס בהצלחה', '')
      } else {
        onErrorAlert('לא עודכן', response.message)
      }
    }
    setAnchorEl(null)
  }

  const handleUpdate = async (data: RegistrationForm) => {
    element.email = data.email
    element.passwordUnencrypted = data.password
    element.isRegistered = true
    element.role = 'ROLE_USER'
    const response = await AdminClinetsService.updateClient(element)
    if (response.status == 'success') {
      onSuccessAlert('לקוח הוקם בהצלחה', '')
    } else {
      onErrorAlert('לא עודכן', response.message)
    }
    setOpenSettings(false)
    setAnchorEl(null)
  }

  const handleMaster = () => {
    setIsMaster(!isMaster)
    if (!isMaster) {
      element.role = 'ROLE_SUPER_AGENT'
    } else {
      element.role = 'ROLE_AGENT'
    }
    AdminClinetsService.updateClient(element)
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setOpenInfo(true)}>
            <InfoIcon color="info" />
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">{element?.extId}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{element?.name}</Typography>
        </TableCell>
        <TableCell>{UserStatus(element)}</TableCell>

        <TableCell>
          <IconButton onClick={handleOpenMenu}>
            <SettingsIcon />
          </IconButton>
        </TableCell>
        {isAgent && (
          <TableCell>
            <Switch
              checked={isMaster}
              onChange={() => handleMaster()}
              color="success"
            />
          </TableCell>
        )}
      </TableRow>

      {/* INFO MODAL */}
      <Modals.ModalWrapper
        active={openInfo}
        setActive={setOpenInfo}
        height={'40%'}
        width={40}
        component={
          <Typography variant="h6" sx={{ margin: '10px 0' }}>
            {isUser ? ' מידע לקוח' : ' מידע סוכן'}
          </Typography>
        }
      >
        <Divider sx={{ mb: '20px' }} />
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="body1" fontWeight={800}>
              {isUser ? 'שם הלקוח' : 'שם הסוכן'}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">{element?.name ?? '-'}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" fontWeight={800}>
              טלפון
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">{element?.phone ?? '-'}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" fontWeight={800}>
              {isUser ? "מס' לקוח" : "מס' סוכן"}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">{element?.extId ?? '-'}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" fontWeight={800}>
              שם משתמש
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">{element?.email ?? '-'}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" fontWeight={800}>
              סיסמא
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">
              {element?.passwordUnencrypted ?? '-'}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" fontWeight={800}>
              עודכן לאחרונה
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">
              {moment(element?.updatedAt).format('DD-MM-YYYY HH:mm:ss') ?? '-'}
            </Typography>
          </Grid>
        </Grid>
      </Modals.ModalWrapper>

      {/* MENU */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => setOpenSettings(true)}>
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">
            {isUser ? 'הקמת לקוח' : 'הקמת סוכן'}
          </Typography>
        </MenuItem>
        {element?.isBlocked ? (
          <MenuItem onClick={() => handleBlock(false)}>
            <ListItemIcon>
              <PersonAddAltIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">
              {isUser ? 'הפעלת לקוח' : 'הפעלת סוכן'}
            </Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleBlock(true)}>
            <ListItemIcon>
              <PersonOffIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">
              {isUser ? 'חסימת לקוח' : 'חסימת סוכן'}
            </Typography>
          </MenuItem>
        )}

        <MenuItem onClick={() => handleReset()}>
          <ListItemIcon>
            <PersonAddDisabledIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">
            {isUser ? 'איפוס לקוח' : 'איפוס סוכן'}
          </Typography>
        </MenuItem>
      </Menu>

      {/* SETTINGS MODAL */}
      <Modals.ModalWrapper
        active={openSettings}
        setActive={setOpenSettings}
        height={'55%'}
        width={40}
        component={
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <PersonAddIcon sx={{ fontSize: '40px' }} />
            <Typography
              variant="h4"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              פרטי כניסה
            </Typography>
          </Box>
        }
      >
        <Box>
          <Divider />
          <Grid container spacing={0}>
            <Grid item xs={2}>
              <Typography
                variant="body1"
                sx={{ margin: '10px 0', color: themeColors.asphalt }}
              >
                {isUser ? 'מספר לקוח: ' : 'מספר סוכן: '}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="body1"
                sx={{ margin: '10px 0', color: themeColors.asphalt }}
              >
                {element?.extId ?? '-'}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="body1"
                sx={{ margin: '10px 0', color: themeColors.asphalt }}
              >
                {isUser ? ' לקוח: ' : 'סוכן: '}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="body1"
                sx={{ margin: '10px 0', color: themeColors.asphalt }}
              >
                {element?.name ?? '-'}
              </Typography>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'מייל שדה חובה',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'מייל אינו תקין',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="מייל"
                    type="mail"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: 'סיסמא שדה חובה',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="סיסמא"
                    type={showPassword ? 'text' : 'password'}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon color="primary" />
                          ) : (
                            <RemoveRedEyeOutlinedIcon color="primary" />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: 'סיסמא שדה חובה',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="אימות סיסמא"
                    type={showPassword2 ? 'text' : 'password'}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword2(!showPassword2)}
                          edge="end"
                        >
                          {showPassword2 ? (
                            <VisibilityOffOutlinedIcon color="primary" />
                          ) : (
                            <RemoveRedEyeOutlinedIcon color="primary" />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
            </FormControl>
            <Button
              sx={{ padding: '11px 0', mt: '20px' }}
              fullWidth={true}
              type="submit"
              variant="contained"
              color="primary"
            >
              הרשמה
            </Button>
          </form>
        </Box>
      </Modals.ModalWrapper>
    </>
  )
}

export default Card
