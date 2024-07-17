import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import CollectionsIcon from '@mui/icons-material/Collections'
import AddIcon from '@mui/icons-material/Add'
import Modals from '../../Modals'
import useHomeMeida from '../../../hooks/admin/useAdminHomeMedia'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  onAsk,
  onErrorAlert,
  onSuccessAlert,
} from '../../../utils/MySweetAlert'
import Utils from '../../../utils'
import { base64ToFile } from '../../../helpers/base64ToFile'
import { MediaObjectService } from '../../../services/admin/AdminMediaObject.service'
import { AdminHomeMediaService } from '../../../services/admin/AdminHomeMedia.service'
import Loader from '../../../utils/Loader'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import useHomeEdit from '../../../hooks/admin/useAdminHomeEdit'

const Options = () => {
  const [active, setActive] = useState(false)
  const [loadingUpload, setLodingUpload] = useState(false)
  const { data, deleteHandler } = useHomeMeida()
  const { handleCreate } = useHomeEdit()
  const handleDelete = async (id: number) => {
    const ask = await onAsk('בטוח שתרצה למחוק?', '')
    if (ask) {
      deleteHandler(id)
    }
  }

  const uploadImg = async (
    img: string,
    fileName: string,
    isVideo = false,
    file?: File
  ) => {
    setLodingUpload(true)
    if (!isVideo) {
      const convertFile = base64ToFile(img, fileName)
      const res = await MediaObjectService.uploadImage(convertFile, 'homemedia')
      const res2 = await AdminHomeMediaService.createHomeMedia({
        media: res['@id'],
      })
      if (res2) {
        onSuccessAlert('תמונה עלתה בהצלחה', '')
      }
    } else {
      if (file) {
        const maxFileSizeMB = 10
        const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024
        if (file.size > maxFileSizeBytes) {
          onErrorAlert('ערך מקסימלי לסרטון 10MB', '')
          setLodingUpload(false)
          return
        }

        const res = await MediaObjectService.uploadImage(file, 'homemedia')
        const res2 = await AdminHomeMediaService.createHomeMedia({
          media: res['@id'],
        })
        if (res2) {
          onSuccessAlert('סרטון עלה בהצלחה', '')
        }
      } else {
        console.error('No video file provided.')
      }
    }
    setLodingUpload(false)
  }

  const addLine = async () => {
    const obj = {
      type: '',
      orden: 99,
      isVideo: false,
      isBanner: false,
      isActive: false,
      count: 1,
      countMobile: 1,
      isPopUp: false,
      isDeletable: true,
    } as IHomeEdit
    handleCreate(obj)
  }

  return (
    <>
      {loadingUpload && <Loader />}
      <Box sx={{ display: 'flex', gap: '55px' }}>
        <Utils.MyCropper
          aspectRatio={16 / 4}
          uploadImg={uploadImg}
          itemImage={''}
          customClick={
            <Button variant="contained" endIcon={<AddIcon />}>
              הוספת מדייה
            </Button>
          }
        />
        <Button
          onClick={() => setActive(true)}
          variant="contained"
          endIcon={<CollectionsIcon />}
        >
          צפייה בכל המדייה
        </Button>
        <Button
          onClick={() => addLine()}
          variant="contained"
          endIcon={<AddCircleIcon />}
        >
          הוספת שורה
        </Button>
      </Box>

      <Modals.ModalWrapper
        active={active}
        setActive={setActive}
        height={'80%'}
        width={60}
        component={
          <Box>
            <Typography variant="h6">מדיה</Typography>
          </Box>
        }
      >
        <ImageList cols={4}>
          {(data?.['hydra:member'] ?? []).map((item, key) => {
            const mediaSrc = `${process.env.REACT_APP_MEDIA}/homemedia/${item?.media?.filePath}`
            const isVideo = item?.media?.filePath.endsWith('.mp4')

            return (
              <ImageListItem key={key}>
                {isVideo ? (
                  <video
                    src={mediaSrc}
                    controls
                    style={{ width: '100%', height: '300px' }}
                  />
                ) : (
                  <img
                    srcSet={mediaSrc}
                    src={mediaSrc}
                    alt={mediaSrc}
                    loading="lazy"
                    style={{ width: '100%', height: '300px' }}
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        `${process.env.REACT_APP_MEDIA}/placeholder.jpg`)
                    }
                  />
                )}
                <ImageListItemBar
                  actionIcon={
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon style={{ color: 'white' }} />
                    </IconButton>
                  }
                  actionPosition="right"
                />
              </ImageListItem>
            )
          })}
        </ImageList>
      </Modals.ModalWrapper>
    </>
  )
}

export default Options
