import Swal from 'sweetalert2'
import { themeColors } from '../styles/mui'

export const onSuccessAlert = (title: string, message: string) => {
  Swal.fire({
    title: title,
    text: message,
    // timer: 3000,
    showConfirmButton: false,
    icon: 'success',
  })
}

export const onErrorAlert = (title: string, message: string) => {
  Swal.fire({
    title: title,
    text: message,
    timer: 3000,
    showConfirmButton: false,
    icon: 'error',
  })
}

export const onInfoAlert = (title: string, message: string) => {
  Swal.fire({
    title: title,
    text: message,
    timer: 3000,
    showConfirmButton: false,
    icon: 'info',
  })
}

export const onAsk = async (title: string, message: string) => {
  return Swal.fire({
    title: title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: themeColors.primary,
    cancelButtonColor: themeColors.error,
    confirmButtonText: 'אישור',
    cancelButtonText: 'ביטול',
  }).then(function (res) {
    if (res.value) {
      return true
    } else {
      return false
    }
  })
}
