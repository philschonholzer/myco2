import React from 'react'
import { css } from '@emotion/core'
import { addDays, format } from 'date-fns/fp'
import { useScrollPercentage } from 'react-scroll-percentage'

import { Section, Container, Range } from '../../style'

import { minmax, yearsToZero, positionY } from './lib'

const Plan = ({ co2e, setCo2e, countryData, worldData }) => {
  const [refPlan, planVisible] = useScrollPercentage()

  const { Entity: name, Code: code, tCO2, Flags: flag } = countryData
  const { tCO2: tCO2World, Flags: flagWorld } = worldData
  const y = positionY(45, 5)

  return (
    <>
      <Section>
        <Container>
          <h2>Your co2e spending plan</h2>
          <p>How do you want to spend your co2e budget?</p>
          <div
            css={css`
              position: relative;
              height: 50vw;
            `}
          >
            <svg
              ref={refPlan}
              css={css`
                position: absolute;
                bottom: 0;
              `}
              viewBox={`-10 ${minmax(-500, 10, 50 - co2e * 5)} ${minmax(
                120,
                500,
                yearsToZero(co2e) * 5 + 20
              )} ${minmax(60, 200, co2e * 5 + 20)}`}
              id="curve"
            >
              <g id="grafic">
                <text
                  x="-30"
                  y="-3"
                  transform="rotate(-90)"
                  style={{ fontSize: 7 }}
                >
                  co2e
                </text>
                <text x="50" y={y(-3)} style={{ fontSize: 7 }}>
                  years
                </text>
                <path d="M0,-500 L0,65 M-5,60 L500,60" stroke="#555" />
                <path
                  d={`M0,${y(co2e)} L${yearsToZero(co2e) * 5},60 L0,60 Z`}
                  stroke="#6af"
                  fill="#6af3"
                />
                <text y="40" style={{ fontSize: 7, fill: '#6af' }}>
                  <tspan x="5" dy="1.2em">
                    52,5t
                  </tspan>
                  <tspan x="5" dy="1.3em" style={{ fontSize: 4.5 }}>
                    co2e
                  </tspan>
                </text>
                <path
                  d={`M5,${60 - tCO2 * 5} L90,${60 - tCO2 * 5}`}
                  stroke="#aaa"
                />
                <rect
                  x="39"
                  y={50 - tCO2 * 5}
                  width="15"
                  height="15"
                  fill="white"
                />
                <text x="40" y={66 - tCO2 * 5}>
                  {flag}
                </text>
                <path
                  d={`M5,${60 - tCO2World * 5} L90,${60 - tCO2World * 5}`}
                  stroke="#aaa"
                />
                <rect
                  x="39"
                  y={50 - tCO2World * 5}
                  width="18"
                  height="18"
                  fill="white"
                />
                <text x="40" y={66 - tCO2World * 5}>
                  {flagWorld}
                </text>
              </g>
            </svg>
          </div>
          <p>
            You need to reach 0 co2e at{' '}
            {format('dd.MM.yyyy', addDays(yearsToZero(co2e) * 365, new Date()))}{' '}
            in {yearsToZero(co2e).toFixed(2)} years
          </p>
        </Container>
      </Section>
      <Section
        css={css`
          ${planVisible < 0.3 ?? 'display: none;'}
          position: fixed;
          bottom: 0;
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
