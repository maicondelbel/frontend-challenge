export function formatCurrency(value: string) {
  return `US${parseFloat(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`
}
