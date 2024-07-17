// Global
import React, {
  FC,
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react'
import { useSelectedProduct } from '../store/selecterdProduct.store'
import Modals from '../components/Modals'
import PayPopUp from '../components/Modals/PayPopUp'
// Defines
interface ModalContextType {
  selectProduct: (product: IProduct) => void
  openPopUpPay: boolean
  setOpenPopUpPay: (bool: boolean) => void
  setPdfViwer: (bool: boolean) => void
  handleImageModal: (value: string) => void
  srcImageModal: string
  openAuthModal: boolean
  setOpenAuthModal: (bool: boolean) => void
  selectedProduct: boolean
  setSelectedProduct: (bool: boolean) => void
  setActivePurchase: (bool: boolean) => void
  handlePdfViwer: (value: string) => void
  pdfLinkOrBase64: string
  setNotifyAddTocart: (bool: boolean) => void
  setNotifyStock: (bool: boolean) => void
}
const ModalContext = createContext<ModalContextType | null>(null)

// React hook
const useModals = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Can not run without "ModalContext Provider"')
  }
  return context
}

interface ModalsProviderProps {
  children: ReactNode
}
const ModalsProvider: FC<ModalsProviderProps> = ({ children }) => {
  const { setSelectedProd } = useSelectedProduct()
  const [openPopUpPay, setOpenPopUpPay] = useState(false)
  const [pdfLinkOrBase64, setPdfLinkOrBase64] = useState('')
  const [pdfViwer, setPdfViwer] = useState(false)
  const [srcImageModal, setImageSrcModal] = useState('')
  const [imageModal, setImageModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(false)
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [activePurchase, setActivePurchase] = useState(false)

  const [notifyAddToCart, setNotifyAddTocart] = useState<boolean>(false)
  const [notifyStock, setNotifyStock] = useState<boolean>(false)

  const selectProduct = (product: IProduct) => {
    setSelectedProd(product)
    setSelectedProduct(true)
  }

  const onCloseSelectedProduct = (bool: boolean) => {
    setSelectedProduct(bool)
    if (!bool) {
      // clearSubProducts()
    }
  }

  const handlePdfViwer = (value: string) => {
    setPdfLinkOrBase64(value)
    setPdfViwer(true)
  }

  const handleImageModal = (src: string) => {
    setImageModal(true)
    setImageSrcModal(src)
  }

  const value = {
    selectProduct,
    openPopUpPay,
    setOpenPopUpPay,
    openAuthModal,
    setOpenAuthModal,
    handleImageModal,
    srcImageModal,
    setActivePurchase,
    activePurchase,
    selectedProduct,
    setSelectedProduct,
    setPdfViwer,
    handlePdfViwer,
    pdfLinkOrBase64,
    setNotifyAddTocart,
    setNotifyStock,
  }

  return (
    <ModalContext.Provider value={value}>
      <Modals.Product
        active={selectedProduct}
        setActive={onCloseSelectedProduct}
      />
      {openAuthModal && (
        <Modals.Auth active={openAuthModal} setActive={setOpenAuthModal} />
      )}
      <Modals.HistoryPurchse
        active={activePurchase}
        setActive={setActivePurchase}
      />
      {openPopUpPay && (
        <PayPopUp active={openPopUpPay} setActive={setOpenPopUpPay} />
      )}

      <Modals.PdfViwer
        active={pdfViwer}
        setActive={setPdfViwer}
        pdfLinkOrBase64={pdfLinkOrBase64}
      />
      <Modals.Snackbar.AddToCart
        notifyAddToCart={notifyAddToCart}
        setNotifyAddTocart={setNotifyAddTocart}
      />
      <Modals.Snackbar.Stock
        notifyStock={notifyStock}
        setNotifyStock={setNotifyStock}
      />
      {/* <ImageModal active={imageModal} setActive={setImageModal} /> */}
      {children}
    </ModalContext.Provider>
  )
}

export { useModals, ModalsProvider }
