import { useState, useEffect } from 'react'

export default function useMatchMedia(query) {
  let [matches, setMatches] = useState(null)

  useEffect(() => {
    if (typeof window === `undefined`) return

    let mediaQueryList = window.matchMedia(query)

    if (mediaQueryList.matches !== matches) setMatches(mediaQueryList.matches)

    let listener = () => setMatches(mediaQueryList.matches)
    mediaQueryList.addListener(listener)

    return () => mediaQueryList.removeListener(listener)
  }, [query, matches])

  return matches
}
