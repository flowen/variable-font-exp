import React, { useLayoutEffect, useEffect, useState } from 'react'
import useMousePosition from '@react-hook/mouse-position'
import Layout from '../../components/layout'
import { normalize, map } from '../../utils/calcUtils'

const VariableFonts = () => {
  const [mousePositionRef, mousePosition] = useMousePosition(0, 0, 30)
  const [rect, setRect] = useState(null)
  const [normalizedCoords, setNormalizedCoords] = useState({ x: 0, y: 0 })
  const wght200900 = map(normalizedCoords.x, 0, 1, 200, 900)

  const XOPQ = map(normalizedCoords.x, 0, 1, 40, 200),
    XTRA = map(normalizedCoords.x, 0, 1, 100, 800),
    OPSZ = map(normalizedCoords.x, 0, 1, 8, 16),
    GRAD = map(normalizedCoords.x, 0, 1, 0, 20),
    YTRA = map(normalizedCoords.x, 0, 1, 750, 850),
    CNTR = map(normalizedCoords.x, 0, 1, 0, 100),
    YOPQ = map(normalizedCoords.x, 0, 1, 100, 800),
    SERF = map(normalizedCoords.x, 0, 1, 0, 50),
    YTAS = map(normalizedCoords.x, 0, 1, 0, 30),
    YTLC = map(normalizedCoords.x, 0, 1, 650, 750),
    YTDE = map(normalizedCoords.x, 0, 1, 0, 50),
    SELE = map(normalizedCoords.x, 0, 1, -20, 0)

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

        <p>
          {`x: ${mousePosition.x}px`}
          <br />
          {`y: ${mousePosition.y}px`}
          <br />
          {`normalize X: ${rect ? normalizedCoords.x : null}`}
          <br />
          {`normalize y: ${rect ? normalizedCoords.y : null}`}
          <br />
          {`map: ${wght200900}`}
        </p>

        <h3>Font: Graduate</h3>
        <div className="font--graduate">
          <h2
            style={{
              fontVariationSettings: `"XOPQ" ${XOPQ}, "XTRA" ${XTRA}, "OPSZ" ${OPSZ}, "GRAD" ${GRAD}, "YTRA" ${YTRA}, "CNTR" ${CNTR}, "YOPQ" ${YOPQ}, "SERF" ${SERF}, "YTAS" ${YTAS}, "YTLC" ${YTLC}, "YTDE" ${YTDE}, "SELE" ${SELE}`,
            }}
          >
            Graduate
          </h2>

          <h2 className="fvs--wght">Bold text heading and more blabla</h2>
        </div>

        <h3>Font: Source sans</h3>
        <div className="font--source">
          <h2 style={{ fontVariationSettings: `"wght" ${wght200900}` }}>
            Bold text heading and more blabla
          </h2>

          <h2 className="fvs--wght">Bold text heading and more blabla</h2>
        </div>

        <h3>Font: Recursive: not working??</h3>
        <div className="font--recursive">
          <h2
            style={{ fontVariationSettings: `"wght" ${map(normalizedCoords.x, 0, 1, 300, 900)}` }}
          >
            Bold text heading and more blabla
          </h2>
          <h2
            className="slanted"
            style={{
              fontVariationSettings: `"MONO" 0.19, "XPRN" 0.96, "wght" 900, "slnt" 0, "ital" 0.5`,
            }}
          >
            Slanted text heading and more blabla
          </h2>
          <h2 className="fvs--wght">Monospace text heading and more blabla</h2>
        </div>
      </div>
    </Layout>
  )
}

export default VariableFonts
