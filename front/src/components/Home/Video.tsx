import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, Paper, Box } from '@mui/material'
import { themeColors } from '../../styles/mui'
import { useAuthProvider } from '../../provider/AuthProvider'

interface VideoProps {
  isVideo: boolean
  src: string
}

const Video: FC<VideoProps> = ({ isVideo, src }) => {
  const styles = {
    videoContainer: {
      position: 'relative',
      width: '100%',
      height: '600px',
      overflow: 'hidden',
      background: '#fff',
    } as React.CSSProperties,

    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: '0',
      left: '0',
      filter: 'brightness(50%)',
    } as React.CSSProperties,
    showcase: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: '#fff',
    } as React.CSSProperties,
    title: {
      marginBottom: '120px',
    } as React.CSSProperties,
  }

  const { isAuthrized } = useAuthProvider()

  return (
    <Box style={styles.videoContainer}>
      <Paper elevation={0}>
        {isVideo ? (
          <video
            style={styles.video}
            preload="preload"
            loop
            muted
            autoPlay
            playsInline
            webkit-playsInline
            x-webkit-airplay="allow"
          >
            <source
              src={`${process.env.REACT_APP_MEDIA}/homemedia/${src}`}
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src={`${process.env.REACT_APP_MEDIA}/homemedia/${src}`}
            style={styles.video}
          />
        )}
      </Paper>
      <Box style={styles.showcase}>
        <Box className="centered">
          <Typography
            variant="h3"
            style={styles.title}
            sx={{
              width: { xs: '100%', md: '100%' },
              fontSize: { xs: '25px', md: '42px' },
            }}
          >
            {settings?.description}
          </Typography>
        </Box>
        {isAuthrized && (
          <Link to="/client/catalog/0/0/0?page=1">
            <Button
              variant="contained"
              sx={{ padding: '12px 20px' }}
              color="secondary"
            >
              לקטלוג המלא
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  )
}

export default Video
