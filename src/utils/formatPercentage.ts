export function formatPercentage(value: string | undefined) {
  return value && parseFloat(value).toFixed(2)
}
