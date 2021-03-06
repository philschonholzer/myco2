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

import { AreaClosed, LinePath, Line } from '@vx/shape'
import { scaleLinear, scaleTime } from '@vx/scale'
import { LinearGradient } from '@vx/gradient'
import { Group } from '@vx/group'
import { Text } from '@vx/text'

import { Section, Container, Range } from '../../style'
import { yearsToZero } from './lib'

const margin = { top: 20, bottom: 40, left: 60, right: 20 }
const x = d => d.col
const y = d => d.co2e

// Compose together the scale and accessor functions to get point functions
const compose = (scale, accessor) => data => scale(accessor(data))

const Graph = ({
  co2e,
  changePerYear,
  endDate,
  countryData,
  worldData,
  width,
  height,
}) => {
  console.log('width', width)
  // Then we'll create some bounds
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const xScale = scaleTime({
    rangeRound: [0, xMax],
    domain: [1, 6],
    nice: true,
  })

  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, 20],
    nice: true,
  })

  const xPoint = compose(xScale, x)
  const yPoint = compose(yScale, y)

  const dataFirstYearAvg = [
    { co2e: co2e - changePerYear / 2, col: 2 },
    { co2e: co2e - changePerYear / 2, col: 3 },
    { co2e: 0, col: 3 },
  ]

  const dataSecondYearAvg = [
    { co2e: co2e - changePerYear * 1.5, col: 3 },
    { co2e: co2e - changePerYear * 1.5, col: 4 },
    { co2e: 0, col: 4 },
  ]

  const dataThirdYearAvg = [
    { co2e: co2e - changePerYear * 2.5, col: 4 },
    { co2e: co2e - changePerYear * 2.5, col: 5 },
    { co2e: 0, col: 5 },
  ]
  const { Entity: name, Code: code, tCO2, Flags: flag } = countryData
  const { tCO2: tCO2World, Flags: flagWorld } = worldData

  return (
    <svg width={width} height={height}>
      <LinearGradient from="#fbc2eb" to="#a6c1ee" id="gradient" />
      <Group top={margin.top} left={margin.left}>
        <AreaClosed
          data={dataFirstYearAvg}
          x={xPoint}
          y={yPoint}
          yScale={yScale}
          fill="url(#gradient)"
          stroke="#333"
          strokeWidth={2}
        />
        <AreaClosed
          data={dataSecondYearAvg}
          x={xPoint}
          y={yPoint}
          yScale={yScale}
          fill="url(#gradient)"
          stroke="#333"
          strokeWidth={2}
          opacity="0.3"
        />
        <AreaClosed
          data={dataThirdYearAvg}
          x={xPoint}
          y={yPoint}
          yScale={yScale}
          fill="url(#gradient)"
          stroke="#333"
          strokeWidth={2}
          opacity="0.1"
        />
        <Text
          x={xPoint({ col: 2.5 })}
          y={yPoint({ co2e: co2e - changePerYear / 2 + 0.5 })}
          fontSize="16"
          textAnchor="middle"
          scaleToFit={width < 400}
          width={(width || 1000) / 9}
        >
          {co2e - changePerYear / 2} tco2e
        </Text>
        <Text
          x={xPoint({ col: 2.5 })}
          y={yPoint({ co2e: 0.5 })}
          fontSize="16"
          textAnchor="middle"
          scaleToFit={width < 400}
          width={(width || 1000) / 9}
        >
          First Year
        </Text>
        <Text
          x={xPoint({ col: 3.5 })}
          y={yPoint({ co2e: co2e - changePerYear * 1.5 + 0.5 })}
          fontSize="16"
          textAnchor="middle"
          scaleToFit={width < 400}
          width={(width || 1000) / 9}
        >
          {co2e - changePerYear * 1.5} tco2e
        </Text>
        <Text
          x={xPoint({ col: 3.5 })}
          y={yPoint({ co2e: 0.5 })}
          fontSize="16"
          textAnchor="middle"
          scaleToFit={width < 400}
          width={(width || 1000) / 9}
        >
          Second Year
        </Text>
        <Text
          x={xPoint({ col: 4.5 })}
          y={yPoint({ co2e: co2e - changePerYear * 2.5 + 0.5 })}
          fontSize="16"
          textAnchor="middle"
          scaleToFit={width < 400}
          width={(width || 1000) / 9}
        >
          {co2e - changePerYear * 2.5} tco2e
        </Text>
        <Text
          x={xPoint({ col: 4.5 })}
          y={yPoint({ co2e: 0.5 })}
          fontSize="16"
          textAnchor="middle"
          scaleToFit={width < 400}
          width={(width || 1000) / 9}
        >
          Thrid Year
        </Text>

        <AxisLeft
          scale={yScale}
          top={0}
          left={0}
          label="Greenhouse gas (tCO2e)"
          stroke="#1b1a1e"
          tickTextFill="#1b1a1e"
        />
        <Line
          from={{ x: 0, y: yMax }}
          to={{ x: xMax, y: yMax }}
          stroke="black"
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

const FirstBudget = ({ co2e, setCo2e, countryData, worldData }) => {
  const [refPlan, planVisible] = useScrollPercentage()
  const endDate = addDays(yearsToZero(co2e) * 365, new Date())
  const changePerYear = co2e / yearsToZero(co2e)
  const co2eFirstYear = co2e - changePerYear / 2
  const formattedEndDate = format('dd.MM.yyyy', endDate)

  return (
    <>
      <Section>
        <Container>
          <h2>Your personal co2e budget this year</h2>
          <p>
            You have a {co2e}t co2e budget this year to spend. Each year you
            need to reduce your co2e by {(co2e / yearsToZero(co2e)).toFixed(2)}
            t.
          </p>
          <div
            ref={refPlan}
            css={css`
              height: 500px;
            `}
          >
            <ParentSize>
              {({ width, height }) => (
                <Graph
                  co2e={co2e}
                  changePerYear={changePerYear}
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
            {yearsToZero(co2e).toFixed(2)} years
          </p>
          <p>
            Data:
            https://ourworldindata.org/grapher/consumption-co2-per-capita?year=latest
          </p>
        </Container>
      </Section>
      <Section
        css={css`
          ${planVisible < 0.3 ?? 'display: none;'}
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          padding: 0 0 2em;
          background: #eee;
          opacity: ${planVisible > 0.4 ? 1 : 0};
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
              <b>{co2eFirstYear}t</b>
            </p>
            <Range
              css={css`
                grid-area: range;
              `}
              type="range"
              min="2"
              max="20"
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

export default FirstBudget
