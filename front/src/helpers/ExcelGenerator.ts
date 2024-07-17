import ExcelJS from 'exceljs'
import moment from 'moment'

export const ExcelGeneratorIDocuments = (items: IDocumentItems) => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')
    worksheet.addRow(['מק״ט', 'שם פריט', 'כמות', 'מכיר ליחידה', 'הנחה', 'סה״כ'])
    items?.products?.['hydra:member']?.map((item) => {
      worksheet.addRow([
        item?.sku,
        item?.product?.title,
        item?.quantity,
        item?.priceByOne,
        item?.discount,
        item?.total,
      ])
    })
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'document.xlsx'
      a.click()
      window.URL.revokeObjectURL(url)
    })
  } catch (e) {
    console.log('[ERROR]', e)
  }
}

export const ExcelGeneratorICartesset = (items: CartessetResponse) => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')
    worksheet.addRow([
      'ת. למאזן',
      'תנועה',
      'ת.אסמכתא',
      'ת.ערך',
      'אסמכתא',
      'פרטים',
      'חובה/זכות',
      'יתרה',
    ])
    items?.lines?.['hydra:member']?.map((item) => {
      worksheet.addRow([
        moment(item?.createdAt).format('DD-MM-YYYY'),
        item?.tnua,
        item?.asmahta1,
        moment(item?.dateEreh).format('DD-MM-YYYY'),
        item?.description,
        item?.hova,
        item?.zhut,
        item?.yetra,
      ])
    })
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'document.xlsx'
      a.click()
      window.URL.revokeObjectURL(url)
    })
  } catch (e) {
    console.log('[ERROR]', e)
  }
}

export const ExcelGeneratorIHistoryPurchse = (
  items: GetPurchaseHistoryItem
) => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    worksheet.addRow([
      'מסמך',
      'תאריך',
      'כמות',
      'מחיר',
      'מחיר אחרי מע"מ',
      'הנחה',
      'סה"כ בתנועה',
      'סה"כ בתנועה אחרי מע"מ',
    ])

    items?.['hydra:member']?.map((element) => {
      worksheet.addRow([
        element?.documentNumber,
        moment(element?.date).format('DD-MM-YYYY'),
        element?.quantity,
        element?.price,
        element?.vatPrice,
        element?.discount,
        element?.totalPrice,
        element?.vatTotal,
      ])
    })
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'document.xlsx'
      a.click()
      window.URL.revokeObjectURL(url)
    })
  } catch (e) {
    console.log('[ERROR]', e)
  }
}

export const ExcelGeneratorIHovot = (items: HovotResponse) => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')
    worksheet.addRow([
      'שורה',
      'תאריך חשבונית',
      'חשבונית',
      'סכום חשבונית',
      'חוב מצטבר',
      'תאריך תשלום',
      'ימי פיגור',
    ])
    items?.lines?.['hydra:member']?.map((element, index) => {
      const fncDate = moment(element?.payDate, 'YYYY-MM-DD')
      const daysDiff = fncDate.isValid()
        ? moment().diff(fncDate, 'days')
        : 'Invalid Date'

      worksheet.addRow([
        index + 1,
        moment(element?.createdAt).format('DD-MM-YYYY'),
        element?.documentNumber,
        element?.debit,
        element?.lineSum,
        moment(element?.payDate).format('DD-MM-YYYY'),
        daysDiff,
      ])
    })
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'document.xlsx'
      a.click()
      window.URL.revokeObjectURL(url)
    })
  } catch (e) {
    console.log('[ERROR]', e)
  }
}
