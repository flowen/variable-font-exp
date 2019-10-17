/*
 * Vector math functions
 */

const dot = (a, b) => a.x * b.x + a.y * b.y
const magnitude = (a) => Math.sqrt(a.x * a.x + a.y * a.y)
const normalize = (a) => {
  const magnitude = magnitude(a)

  if (magnitude === 0) {
    return {
      x: 0,
      y: 0,
    }
  } else {
    return {
      x: a.x / magnitude,
      y: a.y / magnitude,
    }
  }
}

const add = (a, b) => {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  }
}

const sub = (a, b) => {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  }
}

const mult = (a, b) => {
  return {
    x: a.x * b.x,
    y: a.y * b.y,
  }
}

const distance = (a, b) => {
  const x = a.x - b.x
  const y = a.y - b.y

  return { x, y }
}

const angle = (a, b) => {
  const ax = a.x - b.x
  const ay = a.y - b.y

  return Math.atan2(ay, ax)
}

const angleBetween = (a, b) => {
  return Math.acos(dot(a, b) / (magnitude(a) * magnitude(b)))
}

const rotate = (a, angle) => {
  const ca = Math.cos(angle)
  const sa = Math.sin(angle)
  const rx = a.x * ca - a.y * sa
  const ry = a.x * sa + a.y * ca

  return {
    x: rx * -1,
    y: ry * -1,
  }
}

const invert = (a) => {
  return {
    x: a.x * -1,
    y: a.y * -1,
  }
}

/*
 * const cross product function has been simplified by
 * setting x and y to zero because vectors a and b
 * lie in the canvas plane
 */
const cross = (a, b) => {
  return {
    x: 0,
    y: 0,
    z: a.x * b.y - b.x * a.y,
  }
}

export {
  dot,
  magnitude,
  normalize,
  sub,
  mult,
  distance,
  angle,
  angleBetween,
  rotate,
  invert,
  cross,
}
