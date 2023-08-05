export function subtractMinutesFromDateTime(date: Date, minutes: number) {
  return date.setMinutes(date.getMinutes() - minutes)
}
