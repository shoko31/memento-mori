export function stringifyDate(date: Date): string {
  function toTwoDigit(n: number): string {
    const t = `${n}`
    if (t.length === 1) return `0${t}`
    return t
  }

  return `${date.getUTCFullYear()}-${toTwoDigit(date.getUTCMonth() + 1)}-${toTwoDigit(
    date.getUTCDate()
  )}`
}
