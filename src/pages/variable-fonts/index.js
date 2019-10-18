import React, { useLayoutEffect, useEffect, useState } from 'react'
import useMousePosition from '@react-hook/mouse-position'
import Layout from '../../components/layout'
import { normalize, map } from '../../utils/calcUtils'

const VariableFonts = () => {
  const [mousePositionRef, mousePosition] = useMousePosition(0, 0, 30)
  const [rect, setRect] = useState(null)
  const [normalizedCoords, setNormalizedCoords] = useState({ x: 0, y: 0 })
  const wght200900 = map(normalizedCoords.x, 0, 1, 200, 900)

  // these are all mapped within the bounds
  const settingsRecursive = {
    MONO: map(normalizedCoords.x, 0, 1, 0, 1),
    XPRN: map(normalizedCoords.x, 0, 1, 0, 1),
    WGHT: map(normalizedCoords.x, 0, 1, 300, 900),
    SLNT: map(normalizedCoords.x, 0, 1, -15, 0),
    ITAL: map(normalizedCoords.x, 0, 1, 0, 1),
  }

  useLayoutEffect(() => {
    function getRect() {
      const rect = mousePositionRef.current ? mousePositionRef.current.getBoundingClientRect() : 0
      setRect(rect)
    }

    if (typeof window === `undefined`) return null
    window.addEventListener('resize', getRect)

    getRect()

    return () => window.removeEventListener('resize', getRect)
  }, [])

  useEffect(() => {
    if (!rect) return

    setNormalizedCoords({
      x: normalize(0, rect.width, mousePosition.x).toFixed(2),
      y: normalize(0, rect.height, mousePosition.y).toFixed(2),
    })

    return () => setNormalizedCoords([0, 0])
  }, [mousePosition])

  return (
    <Layout cssClass="variable-fonts">
      <div
        className="variable-fonts__container"
        ref={mousePositionRef}
        style={{
          '--mouseX': `${normalizedCoords.x}`,
          '--mouseY': `${normalizedCoords.y}`,
          '--wght': `${wght200900}`,
        }}
      >
        <h1>Variable Fonts</h1>

        {/* <p>
          {`x: ${mousePosition.x}px`}
          <br />
          {`y: ${mousePosition.y}px`}
          <br />
          {`normalize X: ${rect ? normalizedCoords.x : null}`}
          <br />
          {`normalize y: ${rect ? normalizedCoords.y : null}`}
          <br />
          {`map: ${wght200900}`}
        </p> */}

        <h3>Font: Source sans</h3>
        <div className="font--source">
          <h2 style={{ fontVariationSettings: `"wght" ${wght200900}` }}>
            Source sans with weight bound to the x-coordinate
          </h2>

          <h2 className="fvs--wght">This is controlled by a CSS variable</h2>
        </div>

        <h3>Font: Recursive</h3>
        <div className="font--recursive">
          <h2
            className="slanted"
            style={{
              fontVariationSettings: `"MONO" ${settingsRecursive.MONO}`,
            }}
          >
            Recursive with MONO axes bound to the x-coordinate
          </h2>

          <h2
            className="slanted"
            style={{
              fontVariationSettings: `"XPRN" ${settingsRecursive.XPRN}`,
            }}
          >
            Recursive with XPRN axes bound to the x-coordinate
          </h2>

          <h2
            className="slanted"
            style={{
              fontVariationSettings: `"wght" ${settingsRecursive.WGHT}`,
            }}
          >
            Recursive with WGHT axes bound to the x-coordinate
          </h2>

          <h2
            className="slanted"
            style={{
              fontVariationSettings: `"slnt" ${settingsRecursive.SLNT}`,
            }}
          >
            Recursive with SLNT axes bound to the x-coordinate.
            <br />
            <small>(Not sure about the difference of slant and italic)</small>
          </h2>

          <h2
            className="slanted"
            style={{
              fontVariationSettings: `"ital" ${settingsRecursive.ITAL}`,
            }}
          >
            Recursive with ITAL axes bound to the x-coordinate.
            <br />
            <small>(Strangely it's called the italic axes, but it's not that)</small>
          </h2>
        </div>
      </div>
    </Layout>
  )
}

export default VariableFonts
