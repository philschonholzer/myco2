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
import { curveBasis } from '@vx/curve'
import { AreaClosed } from '@vx/shape'
import { scaleLinear, scaleTime } from '@vx/scale'
import { LinearGradient } from '@vx/gradient'
import { Group } from '@vx/group'
import { Marker } from '@vx/marker'

import { Section, Container, Range } from '../../style'
import { yearsToZero } from './lib'

const margin = { top: 20, bottom: 40, left: 60, right: 20 }
const x = d => d.date
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
  // Then we'll create some bounds
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const { Entity: name, Code: code, tCO2, Flags: flag } = countryData
  const { tCO2: tCO2World, Flags: flagWorld } = worldData

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
    { co2e: tCO2, date: Date.now() },
    {
      co2e: co2e / 2,
      date: addDays(300, Date.now()),
    },
    { co2e: 0, date: endDate },
  ]

  const dataFirstYear = [
    { co2e, date: Date.now() },
    { co2e: co2e - changePerYear, date: addYears(1, Date.now()) },
    { co2e: 0, date: addYears(1, Date.now()) },
  ]

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
          curve={curveBasis}
        />
        {data.map((d, j) => (
          <circle
            key={j}
            r={3}
            cx={xPoint(d)}
            cy={yPoint(d)}
            stroke="rgba(33,33,33,0.5)"
            fill="transparent"
          />
        ))}
        {/* <AreaClosed
          data={dataFirstYear}
          x={xPoint}
          y={yPoint}
          yScale={yScale}
          fill="url(#gradient)"
          stroke="#333"
          strokeWidth={2}
        /> */}
        {/* <Annotation
          x={xPoint(dataFirstYear[0])}
          y={yPoint({ co2e: dataFirstYear[0].co2e / 2 })}
          dx={200}
          dy={-110}
          width={xPoint({ date: addDays(20, dataFirstYear[0].date) })}
          height={18}
          color="#333"
          title={`${co2e - changePerYear / 2}`}
          label="Your co2e budget for the first year"
          events={{
            onClick: (props, state, event) => {
              console.log(props, state, event)
            },
          }}
        >
          <ConnectorElbow>
            <ConnectorEndDot />
          </ConnectorElbow>
          <Note align="middle" lineType="horizontal" padding={10} />
        </Annotation> */}
        <Annotation
          x={xPoint({
            date: addDays(
              differenceInDays(Date.now(), endDate) / 3,
              Date.now()
            ),
          })}
          y={yPoint({ co2e: dataFirstYear[0].co2e / 3 })}
          dx={100}
          dy={-60}
          width={xPoint({ date: addDays(20, dataFirstYear[0].date) })}
          height={18}
          color="#333"
          title="52.2"
          label="Your life-time co2e budget"
          events={{
            onClick: (props, state, event) => {
              console.log(props, state, event)
            },
          }}
        >
          {/* <SubjectRect /> */}
          <ConnectorElbow>
            <ConnectorEndDot />
          </ConnectorElbow>
          <Note align="middle" lineType="horizontal" padding={10} />
        </Annotation>
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

const Plan = ({ co2e, setCo2e, countryData, worldData }) => {
  const [refPlan, planVisible] = useScrollPercentage()
  const endDate = addDays(yearsToZero(co2e) * 365, new Date())
  const changePerYear = co2e / yearsToZero(co2e)
  const co2eFirstYear = co2e - changePerYear / 2
  const formattedEndDate = format('dd.MM.yyyy', endDate)

  return (
    <>
      <Section>
        <Container>
          <h2>Your co2e spending plan</h2>
          <p>How do you want to spend your co2e budget?</p>
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

export default Plan
