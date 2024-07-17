import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import useHomeMeida from '../../../hooks/admin/useAdminHomeMedia'

interface MediaCardProps {
  item: IHomeMedia
  element: IHomeEdit
  key: number
}
const MediaCard: FC<MediaCardProps> = ({ item, key, element }) => {
  const mediaSrc = `${process.env.REACT_APP_MEDIA}/homemedia/${item?.media?.filePath}`
  const isVideo = item?.media?.filePath.endsWith('.mp4')
  const { updateHandler } = useHomeMeida()

  const checkIsExistMedia = () => {
    return element?.homeMedia.some((el) => el.id === item.id)
  }

  const [active, setActive] = useState(false)

  const handleImage = (item: IHomeMedia) => {
    if (checkIsExistMedia()) {
      updateHandler({
        id: item.id,
        home: null,
      })
      setActive(false)
    } else {
      updateHandler({
        id: item.id,
        home: element?.['@id'],
      })
      setActive(true)
    }
  }

  useEffect(() => {
    setActive(checkIsExistMedia())
  }, [])

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
        actionPosition="right"
        actionIcon={
          <IconButton sx={{ color: 'white' }} onClick={() => handleImage(item)}>
            {active ? <TaskAltIcon /> : <PanoramaFishEyeIcon />}
          </IconButton>
        }
      />
    </ImageListItem>
  )
}

export default MediaCard
