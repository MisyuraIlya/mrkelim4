import React, { useState, useRef, FC, ChangeEvent, ReactNode } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Box, Button, Grid, IconButton } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { themeColors } from '../styles/mui'
import styled from 'styled-components'
import Modals from '../components/Modals'

interface MyCropperProps {
  aspectRatio: number
  uploadImg: (
    base64: string,
    fileName: string,
    isVideo: boolean,
    file?: File
  ) => void
  itemImage: string | null
  customClick?: ReactNode
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const MyCropper: FC<MyCropperProps> = ({
  aspectRatio,
  uploadImg,
  itemImage,
  customClick,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const [isCropped, setIsCropped] = useState(true)

  const [choosedFile, setChoosedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [cropData, setCropData] = useState('')
  const [fileName, setFileName] = useState('')
  const cropperRef = useRef<ReactCropperElement>(null)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL())
      setIsCropped(false)
    }
  }

  const handleSave = () => {
    uploadImg(cropData, fileName, false)
    setOpenModal(false)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const selectedFile = files[0]
      if (selectedFile?.type == 'video/mp4') {
        uploadImg('', fileName, true, selectedFile)
      } else {
        setOpenModal(true)
        setFileName(files[0].name)
        setChoosedFile(selectedFile)
        const fileUrl = URL.createObjectURL(selectedFile)
        setPreviewUrl(fileUrl)
      }
    }
  }

  const cancle = () => {
    setOpenModal(false)
    setChoosedFile(null)
  }

  const handleCustomClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
        }}
      >
        <img src={itemImage!} style={{ objectFit: 'cover', width: '80px' }} />
        <IconButton
          component="label"
          role={undefined}
          tabIndex={-1}
          sx={{ position: 'absolute', zIndex: 10, left: '10px' }}
          onClick={handleCustomClick}
        >
          {customClick ? (
            customClick
          ) : (
            <ControlPointIcon
              sx={{
                fontSize: '40px',
                color: themeColors.primary,
                opacity: '0.5',
              }}
            />
          )}

          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={inputFileRef}
          />
        </IconButton>
      </Box>
      <Modals.ModalWrapper
        active={openModal}
        setActive={setOpenModal}
        width={40}
        height={'55%'}
      >
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box sx={{ height: '80%' }}>
              <img
                src={cropData ? cropData! : previewUrl!}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
            <Box
              sx={{ display: 'flex', gap: '10px', height: '20%' }}
              className="centered"
            >
              <Button
                variant="outlined"
                color="error"
                sx={{ width: '100px' }}
                onClick={() => cancle()}
              >
                בטל
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: '100px' }}
                onClick={() => getCropData()}
              >
                גזור
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: '100px' }}
                onClick={() => handleSave()}
                disabled={isCropped}
              >
                שמור
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Cropper
              src={previewUrl!}
              aspectRatio={aspectRatio}
              guides={false}
              checkCrossOrigin={false}
              ref={cropperRef}
            />
          </Grid>
        </Grid>
      </Modals.ModalWrapper>
    </>
  )
}

export default MyCropper
