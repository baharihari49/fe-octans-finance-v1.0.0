

interface formatCurrency {
    value: number
}

export const formatCurrency = ({value}: formatCurrency) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(value);
}