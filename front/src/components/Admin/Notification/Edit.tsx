import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { base64ToFile } from '../../../helpers/base64ToFile'
import { MediaObjectService } from '../../../services/admin/AdminMediaObject.service'
import {
  TextField,
  TextareaAutosize,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Utils from '../../../utils'
import { useAdminStore } from '../../../store/admin.store'
import hooks from '../../../hooks'
interface LeftSideForm {
  title: string
  description: string
  link: string
}

const Edit = () => {
  const { choosedItemNotification, setChoosedItemNotification } =
    useAdminStore()
  const { updateMutation, createMutation } = hooks.admin.useDataNotification()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LeftSideForm>()

  const handleForm = async (data: LeftSideForm) => {
    if (choosedItemNotification) {
      choosedItemNotification.title = data.title
      choosedItemNotification.description = data.description
      choosedItemNotification.link = data.link
      updateMutation(choosedItemNotification)
      setChoosedItemNotification(null)
    }
  }

  const uploadImg = async (img: string, fileName: string) => {
    const convertFile = base64ToFile(img, fileName)
    const res = await MediaObjectService.uploadImage(
      convertFile,
      'notifications'
    )
    if (choosedItemNotification) {
      //@ts-ignore
      choosedItemNotification.image = res['@id']
      await updateMutation(choosedItemNotification)
    }
  }

  useEffect(() => {
    if (choosedItemNotification) {
      setValue('title', choosedItemNotification.title || '')
      setValue('description', choosedItemNotification.description || '')
      setValue('link', choosedItemNotification.link || '')
    }
  }, [choosedItemNotification])

  return (
    <>
      {choosedItemNotification?.id ? (
        <Paper elevation={4} sx={{ minHeight: '500px', borderRadius: '10px' }}>
          <form onSubmit={handleSubmit(handleForm)}>
            <Box sx={{ padding: '10px' }}>
              <TextField
                fullWidth
                sx={{ background: '#f3f5f9' }}
                placeholder="כותרת ההודעה"
                {...register('title')}
              />
              <TextareaAutosize
                minRows={6}
                style={{
                  background: '#f3f5f9',
                  width: '94%',
                  resize: 'none',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '10px',
                  margin: '10px 0px',
                }}
                placeholder="מלל הודעה"
                {...register('description')}
              />
              <TextField
                fullWidth
                sx={{ background: '#f3f5f9' }}
                placeholder="קישור"
                {...register('link')}
              />
              <Box className="centered" sx={{ marginTop: '50px' }}>
                <Utils.MyCropper
                  aspectRatio={16 / 16}
                  uploadImg={uploadImg}
                  itemImage={
                    choosedItemNotification?.image?.filePath
                      ? `${process.env.REACT_APP_MEDIA}/notifications/${choosedItemNotification?.image?.filePath}`
                      : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
                  }
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: '20px',
                  justifyContent: 'center',
                  marginTop: '50px',
                }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  sx={{ width: '100px' }}
                  onClick={() => setChoosedItemNotification(null)}
                >
                  בטל
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: '100px' }}
                >
                  שמור
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      ) : (
        <Paper
          elevation={4}
          className="centered"
          sx={{ minHeight: '500px', borderRadius: '10px' }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={() => createMutation(null)}
            startIcon={<AddIcon />}
          >
            <Typography variant="h6">חדש</Typography>
          </Button>
        </Paper>
      )}
    </>
  )
}

export default Edit
