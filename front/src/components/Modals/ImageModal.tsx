import React, { FC } from 'react'

interface ImageModalProps {
  active: boolean
  setActive: (value: boolean) => void
  src: string
}

const ImageModal: FC<ImageModalProps> = ({ active, setActive, src }) => {
  return (
    <>
      {active && (
        <div className="modai-image animated">
          <div onClick={() => setActive(false)} className="close">
            <span className="material-symbols-outlined">close</span>
          </div>
          <div className="img-wrapper">
            <img src={src} />
          </div>
        </div>
      )}
    </>
  )
}

export default ImageModal
