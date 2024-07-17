import { Swiper, SwiperSlide } from 'swiper/react'
import React, { useRef } from 'react'
import { useSelectedProduct } from '../../../store/selecterdProduct.store'
import { Box, ImageList, ImageListItem } from '@mui/material'

const AdditionalImages = () => {
  const { selectedProd, changeDefaultImage } = useSelectedProduct()
  const swiperRef = useRef<null>(null)
  const params = {
    spaceBetween: 20,
    slidesPerColumnFill: 'row',
    breakpoints: {
      1400: {
        slidesPerView: 6,
        slidesPerColumn: 1,
      },
      1000: {
        slidesPerView: 4,
        slidesPerColumn: 1,
      },
      600: {
        slidesPerView: 4,
        slidesPerColumn: 1,
      },
      0: {
        slidesPerView: 4,
        slidesPerColumn: 1,
      },
    },
  }

  return (
    <Box>
      <Swiper {...params} ref={swiperRef}>
        {selectedProd?.imagePath?.map((element, index) => {
          return (
            <SwiperSlide key={index}>
              <ImageListItem
                onClick={() =>
                  changeDefaultImage(element?.mediaObject?.filePath)
                }
              >
                <img
                  style={{
                    border: '1px solid #e8e8e8',
                    padding: '8px 4px',
                    cursor: 'pointer',
                  }}
                  srcSet={
                    process.env.REACT_APP_MEDIA +
                    '/product/' +
                    element?.mediaObject?.filePath
                  }
                  src={
                    process.env.REACT_APP_MEDIA +
                    '/product/' +
                    element?.mediaObject?.filePath
                  }
                  alt={'img'}
                  loading="lazy"
                />
              </ImageListItem>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}

export default AdditionalImages

{
  /* <Box
onClick={() =>
  changeDefaultImage(element?.mediaObject?.filePath)
}
>
  {element?.mediaObject?.filePath ? (
    <img
    style={{height:'250px'}}
      className="img"
      src={
        process.env.REACT_APP_MEDIA +
        '/product/' +
        element?.mediaObject?.filePath
      }
    />
  ) : (
    <img
      className="img"
      src={process.env.REACT_APP_MEDIA + 'placeholder.jpg'}
    />
  )}
</Box> */
}
