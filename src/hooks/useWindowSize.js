import React, { useLayoutEffect, useEffect, useState } from 'react'

export default function useWindowSize() {
  const [size, setSize] = useState([0, 0])

  if (typeof window === `undefined`) return null

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)

    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}
