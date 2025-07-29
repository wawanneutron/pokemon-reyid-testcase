export function formatNumberWithDot(value: number): string {
  return value.toLocaleString('id-ID')
}

export function formatHeight(heightDeci: number) {
  const meters = heightDeci / 10
  const totalInches = meters * 39.3701
  let feet = Math.floor(totalInches / 12)
  let inches = Math.round(totalInches % 12)

  if (inches === 12) {
    feet += 1
    inches = 0
  }

  return `${meters.toFixed(1)} m (${feet}′${inches
    .toString()
    .padStart(2, '0')}″)`
}

export function formatWeight(weightHecto: number) {
  const kg = weightHecto / 10
  const lbs = kg * 2.20462

  return `${kg.toFixed(1)} kg (${lbs.toFixed(1)} lbs)`
}
