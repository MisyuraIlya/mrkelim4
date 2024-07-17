import React, { FC, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import { themeColors, themeSettings } from '../../styles/mui'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import hooks from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../enums/urls'

interface CategoriesProps {
  toShow: number
  toShowMobile: number
}

const Categories: FC<CategoriesProps> = ({ toShow, toShowMobile }) => {
  const { data } = hooks.useDataCategories()
  const swiperRef = useRef(null)
  const navigate = useNavigate()
  const settings = {
    slidesPerView: 4,
    loop: true,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1400: {
        slidesPerView: toShow,
        slidesPerColumn: 1,
      },
      1000: {
        slidesPerView: toShow,
        slidesPerColumn: 1,
      },
      600: {
        slidesPerView: toShowMobile,
        slidesPerColumn: 1,
      },
      0: {
        slidesPerView: toShowMobile,
        slidesPerColumn: 1,
      },
    },
  }

  const goToNextSlide = () => {
    //@ts-ignore
    if (swiperRef.current && swiperRef.current.swiper) {
      //@ts-ignore
      swiperRef.current.swiper.slideNext()
    }
  }

  const goToPrevSlide = () => {
    //@ts-ignore
    if (swiperRef.current && swiperRef.current.swiper) {
      //@ts-ignore
      swiperRef.current.swiper.slidePrev()
    }
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <IconButton
          sx={{
            bgcolor: '#F6F6F6',
            borderRadius: themeSettings.borderRadius,
            color: 'black',
          }}
          onClick={() => goToPrevSlide()}
        >
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{
            bgcolor: '#F6F6F6',
            borderRadius: themeSettings.borderRadius,
            color: 'black',
          }}
          onClick={() => goToNextSlide()}
        >
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>
        <Typography variant="h4">{'קטגוריות'}</Typography>
        <IconButton onClick={() => navigate(URLS.CATALOG_VIEW.LINK)}>
          <ArrowBackOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />
        </IconButton>
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <Swiper {...settings} ref={swiperRef}>
          {data?.['hydra:member']?.map((element, index) => {
            return (
              <SwiperSlide key={index}>
                <Card
                  onClick={() =>
                    navigate(`/client/catalog/${element?.id}/0/0?page=1`)
                  }
                >
                  <CardActionArea>
                    <Box>
                      <CardMedia
                        sx={{ objectFit: 'cover', height: '190px' }}
                        component="img"
                        image={
                          element?.MediaObject?.filePath
                            ? `${process.env.REACT_APP_MEDIA}/category/${element?.MediaObject?.filePath}`
                            : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
                        }
                        alt={`${index}`}
                      />
                    </Box>
                    <CardContent
                      sx={{
                        backgroundColor: themeColors.primary,
                        color: 'white',
                        padding: '6px 12px',
                      }}
                    >
                      <Typography gutterBottom variant="h6">
                        {element?.title}
                      </Typography>
                      <Button
                        endIcon={<ArrowBackOutlinedIcon />}
                        sx={{ color: 'white' }}
                      >
                        לקטלוג
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
    </Box>
  )
}

export default Categories
