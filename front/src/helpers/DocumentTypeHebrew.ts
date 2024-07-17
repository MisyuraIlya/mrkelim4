export const DocumentTypeHebrew = (type: IDocumentTypes) => {
  if (type === 'draft') {
    return 'טיוטה'
  } else if (type === 'order') {
    return 'הזמנה'
  } else if (type === 'priceOffer') {
    return 'הצעת מחיר'
  } else if (type === 'deliveryOrder') {
    return 'תעודת משלוח'
  } else if (type === 'aiInvoice') {
    return 'חשבנוית מס'
  } else if (type === 'ciInvoice') {
    return 'חשבונית מס מרכזת'
  } else if (type === 'returnOrder') {
    return 'תעודת החזר'
  } else {
    return '-'
  }
}
