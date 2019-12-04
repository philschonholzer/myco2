import React from 'react'
import { css } from '@emotion/core'

import Section from '../../style/Section'
import Container from '../../style/Container'
import { yearsToZero, minmax } from './lib'

const FirstBudget = ({ co2e }) => {
  return (
    <Section>
      <Container>
        <h2>Your personal co2e budget this year</h2>
        <p>
          You have a {co2e}t co2e budget this year to spend. Each year you need
          to reduce your co2e by {(co2e / yearsToZero(co2e)).toFixed(2)}
          t.
        </p>
        <div
          css={css`
            position: relative;
            height: 50vw;
          `}
        >
          <svg
            css={css`
              position: absolute;
              bottom: 0;
            `}
            viewBox={`-10 ${minmax(-500, 10, 50 - co2e * 5)} 120 ${minmax(
              60,
              200,
              co2e * 5 + 20
            )}`}
          >
            <text
              x="-30"
              y="-3"
              transform="rotate(-90)"
              style={{ fontSize: 7 }}
            >
              co2e
            </text>
            <text x="50" y="67" style={{ fontSize: 7 }}>
              years
            </text>
            <path d="M0,-500 L0,65 M-5,60 L120,60" stroke="#555" />
            <path
              d={`M0,${60 - co2e * 5} L5,${60 - co2e * 5} L5,60 L0,60 Z`}
              stroke="#6af"
              fill="#6af3"
            />
            <text y="40" style={{ fontSize: 7, fill: '#6af' }}>
              <tspan x="10" dy="1.2em">
                {co2e}t
              </tspan>
              <tspan x="10" dy="1.3em" style={{ fontSize: 4.5 }}>
                co2e
              </tspan>
            </text>
          </svg>
        </div>
      </Container>
    </Section>
  )
}

export default FirstBudget
