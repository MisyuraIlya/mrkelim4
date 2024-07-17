import React, { FC } from 'react'
import Modal from '@mui/material/Modal'
import { Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useMobile } from '../../provider/MobileProvider'

type ModalWrapperProps = {
  active: boolean
  setActive: (bool: boolean) => void
  children: any
  height: number | string
  width: number | string
  component?: React.ReactNode
  zIndex?: number
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  active,
  setActive,
  children,
  height,
  width,
  component,
  zIndex,
}) => {
  const { isMobile } = useMobile()

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: isMobile ? 2 : 4,
    width: isMobile ? `90%` : `${width}%`,
    height: height,
    zIndex: zIndex,
    overflow: 'auto',
  }

  return (
    <>
      <Modal open={active} onClose={() => setActive(false)} disableAutoFocus>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <Box>{component}</Box>
            <Box sx={{ height: '100%' }}>
              <IconButton onClick={() => setActive(false)}>
                <CloseIcon sx={{ fontSize: '35px', cursor: 'pointer' }} />
              </IconButton>
            </Box>
          </Box>
          {children}
        </Box>
      </Modal>
    </>
  )
}

export default ModalWrapper
