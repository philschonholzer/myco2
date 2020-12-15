import React from 'react'
import { css } from '@emotion/core'

import { addDays, format, differenceInDays, addYears } from 'date-fns/fp'
import { useScrollPercentage } from 'react-scroll-percentage'

import {
  Annotation,
  ConnectorElbow,
  ConnectorEndDot,
  Note,
} from 'react-annotation'

import { AxisLeft, AxisBottom } from '@vx/axis'
import ParentSize from '@vx/responsive/lib/components/ParentSize'

import { AreaClosed } from '@vx/shape'
import { scaleLinear, scaleTime } from '@vx/scale'
import { LinearGradient } from '@vx/gradient'
import { Group } from '@vx/group'
import { Marker } from '@vx/marker'

import { Section, Container } from '../../style'
import { yearsToZero } from './lib'

const margin = { top: 20, bottom: 40, left: 60, right: 20 }
const x = d => d.date
const y = d => d.co2e

// Compose together the scale and accessor functions to get point functions
const compose = (scale, accessor) => data => scale(accessor(data))

const Graph = ({ co2e, endDate, countryData, worldData, width, height }) => {
  console.log('worldData', worldData)
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

  const data = [
    { co2e, date: Date.now() },
    { co2e, date: endDate },
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
        <Marker
          from={{ x: 0, y: yPoint({ co2e: tCO2 }) }}
          to={{ x: xMax, y: yPoint({ co2e: tCO2 }) }}
          stroke="#aaa"
          strokeWidth={1}
          label={flag}
          labelStroke="red"
          labelDx={xMax / 2}
          labelDy={15}
          labelFontSize="40"
        />
        <Marker
          from={{ x: 0, y: yPoint({ co2e: tCO2World }) }}
          to={{ x: xMax, y: yPoint({ co2e: tCO2World }) }}
          stroke="#aaa"
          strokeWidth={1}
          label={flagWorld}
          labelStroke="red"
          labelDx={xMax / 2}
          labelDy={15}
          labelFontSize="40"
        />
      </Group>
    </svg>
  )
}

const YearsLeft = ({ countryData, worldData }) => {
  const { tCO2 } = countryData

  const endDate = addDays((yearsToZero(tCO2) / 2) * 365, new Date())

  const formattedEndDate = format('dd.MM.yyyy', endDate)

  return (
    <>
      <Section>
        <Container>
          <h2>
            Available years with an average {countryData.Flags} lifestyle of{' '}
            {tCO2} tCO2 per year.
          </h2>
          <div
            css={css`
              height: 500px;
            `}
          >
            <ParentSize>
              {({ width, height }) => (
                <Graph
                  co2e={tCO2}
                  endDate={endDate}
                  countryData={countryData}
                  worldData={worldData}
                  width={width}
                  height={height}
                />
              )}
            </ParentSize>
            ,
          </div>
          <p>
            {formattedEndDate} You need to reach 0 co2e at in{' '}
            {(yearsToZero(tCO2) / 2).toFixed(2)} years
          </p>
          <p>
            Data:
            https://ourworldindata.org/grapher/consumption-co2-per-capita?year=latest
          </p>
        </Container>
      </Section>
    </>
  )
}

export default YearsLeft
