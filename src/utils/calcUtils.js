export const map = (value, start1, stop1, start2, stop2) =>
  start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))

export const normalize = (minSize, maxSize, currentSize) =>
  (currentSize - minSize) / (maxSize - minSize)

export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const randomFloat = (min, max) => Math.random() * (max - min) + min

// randomly return -1 and 1
export const randomNegOrPos = () => {
  if (Math.random() > 0.5) {
    return -1
  } else {
    return 1
  }
}

export const lerp = (a, b, n) => (1 - n) * a + n * b
