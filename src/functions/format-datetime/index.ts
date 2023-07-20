export const FormatDateTime = (date: string, lenguage: 'pt-BR' | 'en-US') => {
  const formatter = new Intl.DateTimeFormat(lenguage, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return formatter.format(new Date(date))
}

export function convertUTCtoLocalDatetime(utcDatetime: Date) {
  const date = new Date(utcDatetime);
  const localDatetime = date.getFullYear() + '-' +
    ('0' + (date.getMonth()+1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2) + 'T' +
    ('0' + date.getHours()).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2);

  return localDatetime;
}
