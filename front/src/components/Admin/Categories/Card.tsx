import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminCatalogService } from '../../../services/admin/AdminCatalog.service'
import { useDebounce } from 'use-debounce'
import { base64ToFile } from '../../../helpers/base64ToFile'
import { MediaObjectService } from '../../../services/admin/AdminMediaObject.service'
import MyCropper from '../../../utils/MyCropper'
import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  TableCell,
  TextField,
  Typography,
} from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { themeColors } from '../../../styles/mui'
import hooks from '../../../hooks'

interface CategoryEditItemProps {
  element: ICategory
}

const Card: FC<CategoryEditItemProps> = ({ element }) => {
  const [activeEdit, setActiveEdit] = useState<boolean>(false)
  const { mutate, handleUpdate } = hooks.admin.useDataCategoryEdit()
  const [checked, setCheked] = useState(element.isPublished)
  const [title, setTitle] = useState(element.title)
  const [valueDebounced] = useDebounce(title, 1000)
  const { lvl1, lvl2 } = useParams()
  const navigate = useNavigate()

  const uploadImg = async (img: string, fileName: string) => {
    const convertFile = base64ToFile(img, fileName)
    const res = await MediaObjectService.uploadImage(convertFile, 'category')
    const res2 = await AdminCatalogService.updateCategory({
      id: element.id,
      MediaObject: res['@id'],
    })
    // await MediaObjectService.ftpUploader(
    //   res2.MediaObject.filePath,
    //   'src/img3/category',
    //   'category'
    // )
    mutate()
  }

  const unpublishHandle = async () => {
    setCheked(!checked)
    handleUpdate({
      id: element.id,
      isPublished: !checked,
    })
  }

  const handleLink = () => {
    if (lvl1 != '0' && lvl2 == '0') {
      return `/admin/category-edit/${lvl1}/${element.id}`
    } else if (lvl1 != '0' && lvl2 != '0') {
      return `/admin/products-edit/${lvl1}/${lvl2}/${element?.id}`
    } else {
      return `/admin/category-edit/${element.id}/0`
    }
  }

  useEffect(() => {
    if (valueDebounced && activeEdit) {
      AdminCatalogService.updateCategory({
        id: element.id,
        title: valueDebounced,
      })
    }
  }, [valueDebounced])

  return (
    <>
      <TableCell sx={{ width: '10%' }}>
        <Button onClick={() => navigate(handleLink())} variant="outlined">
          כניסה
        </Button>
      </TableCell>
      <TableCell sx={{ width: '20%' }}>
        <MyCropper
          aspectRatio={16 / 16}
          uploadImg={uploadImg}
          itemImage={
            element?.MediaObject?.filePath
              ? `${process.env.REACT_APP_MEDIA}/category/${element?.MediaObject?.filePath}`
              : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
          }
        />
      </TableCell>
      <TableCell sx={{ width: '15%' }}>
        <Typography variant="body1">{element.id}</Typography>
      </TableCell>
      <TableCell sx={{ width: '40%' }}>
        <Grid
          container
          item
          onClick={() => setActiveEdit(true)}
          onBlur={() => setActiveEdit(false)}
        >
          <TextField
            type="text"
            placeholder="שם הקטגוריה"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
      </TableCell>
      <TableCell sx={{ width: '15%' }}>
        <Checkbox
          checked={checked}
          onChange={() => unpublishHandle()}
          sx={{ color: themeColors.primary, cursor: 'pointer' }}
        />
        <IconButton>
          <DragIndicatorIcon sx={{ fontSize: '35px' }} />
        </IconButton>
      </TableCell>
    </>
  )
}

export default Card
