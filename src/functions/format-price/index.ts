export const formatPrice = (price: number, lenguage: 'pt-BR' |'en-US') => {
  const currency = {
    'pt-BR': 'BRL',
    'en-US': 'USD'
  }

  const formatter = new Intl.NumberFormat(lenguage, {
    style: 'currency',
    currency: currency[lenguage]
  })
  
  return formatter.format(price)
}