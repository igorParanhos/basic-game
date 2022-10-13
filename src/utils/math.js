export const degreesToRadians = (degrees) => {
  return (degrees / 360) * 2 * Math.PI
}
export const radiansToDegrees = (radians) => {
  return radians / 2 / Math.PI * 360
}
export const clamp = (v, min, max) => {
  return Math.min(Math.max(v, min), max)
}
