export const randomPins = (availablePins: number) => {
  return Math.floor(Math.random() * availablePins + 1)
}