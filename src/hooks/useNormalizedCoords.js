import React, { useEffect, useState } from 'react'

export default function useNormalizedCoords(rect, mousePosition) {
  const [coords, setCoords] = useState([0, 0])
  const normalize = (minSize, maxSize, currentSize) => (currentSize - minSize) / (maxSize - minSize)

  setCoords(
    normalize(0, rect.width, mousePosition.x).toFixed(2),
    normalize(0, rect.height, mousePosition.y).toFixed(2)
  )

  return coords
}
