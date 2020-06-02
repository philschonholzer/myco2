import React from 'react'
import { css } from '@emotion/core'

import { addDays, format } from 'date-fns/fp'
import { useScrollPercentage } from 'react-scroll-percentage'

import { AxisLeft, AxisBottom } from '@vx/axis'
import { withParentSize } from '@vx/responsive'
import { AreaClosed } from '@vx/shape'
import { scaleLinear, scaleTime } from '@vx/scale'
import { LinearGradient } from '@vx/gradient'
import { Group } from '@vx/group'
import { Text } from '@vx/text'

import { Section, Container, Range } from '../../style'
import { minmax, yearsToZero, positionY } from './lib'

const margin = { top: 20, bottom: 40, left: 60, right: 20 }
const x = d => d.date
const y = d => d.co2e

// Compose together the scale and accessor functions to get point functions
const compose = (scale, accessor) => data => scale(accessor(data))

const height = 500
const width = 500

// Then we'll create some bounds
const xMax = width - margin.left - margin.right
const yMax = height - margin.top - margin.bottom

const xScale = scaleTime({
  rangeRound: [0, xMax],
  domain: [Date.now(), new Date('2050-01-01')],
  nice: true,
})

const yScale = scaleLinear({
  rangeRound: [yMax, 0],
  domain: [0, 20],
  nice: true,
})

const xPoint = compose(xScale, x)
const yPoint = compose(yScale, y)

const Graph = ({ co2e, endDate, countryData, worldData }) => {
  const data = [
    { co2e, date: Date.now() },
    { co2e: 0, date: endDate },
  ]
  const { Entity: name, Code: code, tCO2, Flags: flag } = countryData
  const { tCO2: tCO2World, Flags: flagWorld } = worldData

  return (
    <svg width={width} height={height}>
      <LinearGradient from="#fbc2eb" to="#a6c1ee" id="gradient" />
      <Group top={margin.top} left={margin.left}>
        <AreaClosed
          data={data}
          x={xPoint}
          y={yPoint}
          yScale={yScale}
          fill="url(#gradient)"
          stroke="#999"
          strokeWidth={1}
        />
        <AxisLeft
          scale={yScale}
          top={0}
          left={0}
          label="Greenhouse gas (tCO2e)"
          stroke="#1b1a1e"
          tickTextFill="#1b1a1e"
        />
        <AxisBottom
          scale={xScale}
          top={yMax}
          label="Year"
          numTicks={8}
          stroke="#1b1a1e"
          tickTextFill="#1b1a1e"
        />
      </Group>
      <path
        d={`M60,${yPoint({ co2e: tCO2 })} L${xMax},${yPoint({ co2e: tCO2 })}`}
        stroke="#aaa"
      />
      <Text
        x={(xMax - margin.left) / 2}
        y={yPoint({ co2e: tCO2 }) + 12}
        fontSize="30"
        textAnchor="middle"
      >
        {flag}
      </Text>
      <path
        d={`M60,${yPoint({ co2e: tCO2World })} L${xMax},${yPoint({
          co2e: tCO2World,
        })}`}
        stroke="#aaa"
      />
      <Text
        x={(xMax - margin.left) / 2}
        y={yPoint({ co2e: tCO2World }) + 12}
        fontSize="30"
        textAnchor="middle"
      >
        {flagWorld}
      </Text>
    </svg>
  )
}

const Plan = ({ co2e, setCo2e, countryData, worldData }) => {
  // const [refPlan, planVisible] = useScrollPercentage()
  const endDate = addDays(yearsToZero(co2e) * 365, new Date())
  const formattedEndDate = format('dd.MM.yyyy', endDate)

  return (
    <>
      <Section>
        <Container>
          <h2>Your co2e spending plan</h2>
          <p>How do you want to spend your co2e budget?</p>
          <div
            css={css`
              height: 500px;
            `}
          >
            <Graph
              co2e={co2e}
              endDate={endDate}
              countryData={countryData}
              worldData={worldData}
            />
          </div>
          <p>
            {formattedEndDate} You need to reach 0 co2e at in{' '}
            {yearsToZero(co2e).toFixed(2)} years
          </p>
        </Container>
      </Section>
      <Section
        css={css`
          /* ${planVisible < 0.3 ?? 'display: none;'} */
          position: fixed;
          bottom: 0;
          width: 100%;
          padding: 0 0 2em;
          background: #eee;
          /* opacity: ${planVisible > 0.4 ? 1 : 0}; */
          transition: opacity 200ms;

          z-index: 99;
        `}
      >
        <Container>
          <label
            htmlFor="yearOneCo2"
            css={css`
              display: grid;
              grid: 'lable amount' 'range range' / 1fr auto;
            `}
          >
            <p>Amount of co2e this year</p>
            <p>
              <b>{co2e}t</b>
            </p>
            <Range
              css={css`
                grid-area: range;
              `}
              type="range"
              min="1"
              max="30"
              step="0.2"
              name="yearOneAmount"
              id="yearOneCo2"
              value={co2e}
              onChange={e => setCo2e(e.target.value)}
            />
          </label>
        </Container>
      </Section>
    </>
  )
}

export default Plan
