import React, { FC, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { base64ToFile } from '../../../helpers/base64ToFile'
import { AdminProductService } from '../../../services/admin/AdminProducts.service'
import { MediaObjectService } from '../../../services/admin/AdminMediaObject.service'
import Utils from '../../../utils'
import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import CollectionsIcon from '@mui/icons-material/Collections'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { themeColors } from '../../../styles/mui'
import Modals from '../../Modals'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import DeleteIcon from '@mui/icons-material/Delete'
import hooks from '../../../hooks'

interface ProductsEditItemProps {
  element: IProduct
  index: number
}

const Card: FC<ProductsEditItemProps> = ({ element, index }) => {
  const [checked, setCheked] = useState(element.isPublished)
  const [checkedIsNew, setCheckedIsNew] = useState(element?.isNew)
  const [checkedIsSpecial, setCheckedIsSpecial] = useState(element?.isSpecial)

  const [active, setActive] = useState(false)
  const { handleUpdate, handleDelete } = hooks.admin.useDataProductsEdit()

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: any
  ): React.CSSProperties => ({
    userSelect: 'none',
    background: isDragging ? '#f9f9f9' : '#fff',
    ...draggableStyle,
  })

  const uploadImg = async (img: string, fileName: string) => {
    const convertFile = base64ToFile(img, fileName)
    const res = await MediaObjectService.uploadImage(convertFile, 'product')
    const res2 = await AdminProductService.createNewImage({
      product: element['@id'],
      mediaObject: res['@id'],
    })
    await MediaObjectService.ftpUploader(
      res2.mediaObject.filePath,
      'src/img/products',
      'product'
    )
  }

  const unpublishHandle = async () => {
    setCheked(!checked)
    handleUpdate({
      id: element.id.toString(),
      isPublished: !checked,
    })
  }

  const handleisNew = async () => {
    setCheckedIsNew(!checkedIsNew)
    handleUpdate({
      id: element.id.toString(),
      isNew: !checkedIsNew,
    })
  }

  const handleIsSpecial = async () => {
    setCheckedIsSpecial(!checkedIsSpecial)
    handleUpdate({
      id: element.id.toString(),
      isSpecial: !checkedIsSpecial,
    })
  }

  const handleChoose = async (media: string) => {
    await handleUpdate({ id: element?.id, defaultImagePath: media })
  }

  const handleDeleteFunc = async (imageId: number) => {
    handleDelete(imageId)
  }

  return (
    <>
      <Draggable key={element.id} draggableId={element.id + ''} index={index}>
        {(provided, snapshot) => (
          <TableRow
            className="item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <TableCell sx={{ width: '10%' }}>
              <Utils.MyCropper
                aspectRatio={16 / 16}
                uploadImg={uploadImg}
                itemImage={
                  element?.defaultImagePath
                    ? `${process.env.REACT_APP_MEDIA}/product/${element?.defaultImagePath}`
                    : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
                }
              />
            </TableCell>
            <TableCell sx={{ width: '10%' }}>
              <IconButton onClick={() => setActive(true)}>
                <CollectionsIcon sx={{ fontSize: '35px' }} />
              </IconButton>
            </TableCell>
            <TableCell sx={{ width: '10%' }}>
              <Typography variant="body1">{element?.sku}</Typography>
            </TableCell>
            <TableCell sx={{ width: '40%' }}>
              <Typography variant="body1">{element?.title}</Typography>
            </TableCell>
            <TableCell sx={{ width: '10%' }}>
              <Checkbox
                checked={checkedIsNew}
                onChange={() => handleisNew()}
                sx={{ color: themeColors.primary, cursor: 'pointer' }}
              />
            </TableCell>
            <TableCell sx={{ width: '10%' }}>
              <Checkbox
                checked={checkedIsSpecial}
                onChange={() => handleIsSpecial()}
                sx={{ color: themeColors.primary, cursor: 'pointer' }}
              />
            </TableCell>
            <TableCell sx={{ width: '20%' }}>
              <Box sx={{ display: 'flex' }}>
                <Checkbox
                  checked={checked}
                  onChange={() => unpublishHandle()}
                  sx={{ color: themeColors.primary, cursor: 'pointer' }}
                />
                <IconButton>
                  <DragIndicatorIcon sx={{ fontSize: '35px' }} />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </Draggable>

      <Modals.ModalWrapper
        active={active}
        setActive={setActive}
        height={'80%'}
        width={60}
        component={
          <Box>
            <Typography variant="h6">גלריה - {element?.title}</Typography>
            <Typography variant="caption">מק"ט: {element?.sku}</Typography>
          </Box>
        }
      >
        <ImageList cols={4}>
          {element?.imagePath?.map((item, key) => (
            <ImageListItem key={key}>
              <img
                srcSet={
                  `${process.env.REACT_APP_MEDIA}/product/` +
                  item?.mediaObject?.filePath
                }
                src={
                  `${process.env.REACT_APP_MEDIA}/product/` +
                  item?.mediaObject?.filePath
                }
                alt={
                  `${process.env.REACT_APP_MEDIA}/product/` +
                  item?.mediaObject?.filePath
                }
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={'תמונה ראשית'}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: 'white' }}
                    onClick={() => handleChoose(item.mediaObject.filePath)}
                  >
                    {element?.defaultImagePath === item.mediaObject.filePath ? (
                      <TaskAltIcon />
                    ) : (
                      <PanoramaFishEyeIcon />
                    )}
                  </IconButton>
                }
                actionPosition="left"
              />
              <ImageListItemBar
                actionIcon={
                  <IconButton onClick={() => handleDeleteFunc(item.id)}>
                    <DeleteIcon style={{ color: 'white' }} />
                  </IconButton>
                }
                actionPosition="right"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Modals.ModalWrapper>
    </>
  )
}

export default Card
