import React, { FC, useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { useAuth } from '../../store/auth.store'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../store/cart.store'
import { onErrorAlert, onSuccessAlert } from '../../utils/MySweetAlert'
import Loader from '../../utils/Loader'
import PriceCalculator from '../../helpers/PriceClass'
import { PaymentService } from '../../services/payment.service'

type PayPopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const PayPopUp: FC<PayPopUpProps> = ({ active, setActive }) => {
  const { user, agent } = useAuth()
  const { loading, setLoading, cart, sendOrder, setCart, setComment } =
    useCart()
  const priceCalculator = new PriceCalculator(17, user, cart)

  const recievingMessages = async (e: any) => {
    if (e?.data?.res === 'SuccessPayment') {
      onSuccessAlert('הזמנה שודרה בהצלחה', e?.data?.data?.message)
      setCart([])
      setComment('')
      setActive(false)
    }
    if (e?.data?.res === 'ErrorPayment') {
      onErrorAlert('שגיאה בשידור הזמנה', e?.data?.data?.message)
      setActive(false)
    }
  }

  const generateYadUrl = async (): Promise<string> => {
    if (user) {
      try {
        setLoading(true)

        const createHistory = await sendOrder(
          user,
          agent,
          user.discount ?? 0,
          false
        )
        const response = await PaymentService.generateYadUrl(
          createHistory.data.historyId,
          user!.id!,
          priceCalculator.getFinalPrice()
        )
        return response
      } catch (e) {
        console.log('[ERROR] generate URL')
      } finally {
        setLoading(false)
      }
    }
    return ''
  }

  useEffect(() => {
    const fetchYadUrl = async () => {
      const url = await generateYadUrl()
      const payIframe = document.getElementById(
        'pay_iframe'
      ) as HTMLIFrameElement
      if (payIframe && url) {
        payIframe.src = url
      }
    }
    fetchYadUrl()
  }, [])

  useEffect(() => {
    window.addEventListener('message', recievingMessages, true)
    return () => {
      window.removeEventListener('message', recievingMessages, true)
    }
  }, [])

  return (
    <ModalWrapper
      width={60}
      height={'80%'}
      active={active}
      setActive={setActive}
    >
      {loading && <Loader />}
      <iframe
        id="pay_iframe"
        style={{ width: '100%', height: '100%' }}
        src="about:blank"
      ></iframe>
      {/* <iframe id='pay_iframe' style={{ width: '100%', height: '100%' }} src={`http://localhost:8080/payment/success`}></iframe> */}
    </ModalWrapper>
  )
}

export default PayPopUp
