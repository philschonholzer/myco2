import React from 'react'
import { useScrollPercentage } from 'react-scroll-percentage'

import earth from '../../images/earth.svg'
import { Section, Container } from '../../style'
import { minmax } from './lib'

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1'

  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    arcSweep,
    0,
    end.x,
    end.y,
    'L',
    x,
    y,
    'L',
    start.x,
    start.y,
  ].join(' ')

  return d
}

const Co2Left = () => {
  const [refPercentage, percentage] = useScrollPercentage({
    /* Optional options */
    threshold: 0.5,
  })
  return (
    <Section>
      <Container>
        <h2>420Gt co2e left</h2>
        <p>
          We still have 420Gt of co2 (blue wedge) left to emmit, if we want to
          keep global temperatur rise below 1,5 C°.
        </p>
        {/* TODO: Earth from rotation for depending on the continent */}
        <svg viewBox="0 0 100 100" ref={refPercentage} id="left">
          <circle cx="50" cy="50" r="40" fill="#6af3" stroke="#6af" />
          <path
            d={describeArc(50, 50, 40.5, 0, minmax(1, 277, percentage * 560))}
            fill="#f33"
          />
          <circle cx="50" cy="50" r="30" fill="#fff" />
          <image x="20" y="20" width="60" height="60" xlinkHref={earth} />
        </svg>
      </Container>
    </Section>
  )
}

export default Co2Left
