import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { addDays, format } from 'date-fns/fp'
import { useScrollPercentage } from 'react-scroll-percentage'
import earth from '../images/earth.svg'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Container from '../style/Container'
import DefaultSection from '../style/Section'
import Range from '../style/Range'

const Section = styled(DefaultSection)``

const yearsToZero = co2e => (52.5 / co2e) * 2
const dailyBudget = co2e => ((co2e / 365) * 1e3).toFixed(2)

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

const minmax = (min, max, value) => Math.min(Math.max(value, min), max)

const query = graphql`
  {
    allCo2PerCountryJson {
      edges {
        node {
          co2
          code
          country
          flag
        }
      }
    }
  }
`

const IndexPage = () => {
  const { allCo2PerCountryJson } = useStaticQuery(query)
  const [country, setCoutry] = React.useState()
  const [co2e, setCo2e] = React.useState(6)
  const [ref, percentage] = useScrollPercentage({
    /* Optional options */
    threshold: 0.5,
  })
  React.useEffect(() => {
    fetch('https://ipapi.co/json')
      .then(response => response.json())
      .then(({ country: cntry }) => setCoutry(cntry))
      .catch(err => err)
  }, [])
  return (
    <Layout>
      <SEO title="Home" />
      <Section>
        <Container
          css={css`
            min-height: inherit;
          `}
        >
          <div
            css={css`
              display: grid;
              grid: auto auto 1fr / 1fr;
              min-height: inherit;
              align-items: center;
            `}
          >
            <h1>My co2</h1>
            <p>Know your co2 emissions.</p>
            <p>Scroll to start</p>
          </div>
        </Container>
      </Section>
      <hr />
      <Section>
        <Container>
          {/* TODO: How to write co2? */}
          <h2>420Gt co2e left</h2>
          <p>
            We still have 420Gt of co2 (blue wedge) left to emmit, if we want to
            keep global temperatur rise below 1,5 C°.
          </p>
          {/* TODO: Earth from rotation for depending on the continent */}
          {/* TODO: Blue wedge over earth */}
          <svg viewBox="0 0 100 100" ref={ref} id="left">
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
      <hr />
      <Section>
        <Container>
          <h2>Your personal life-time co2e budget</h2>
          <p>
            If we still have 420Gt of co2e left to emmit, then each person has a
            personal lifetime budget of 52,5t co2e.
          </p>
          <svg viewBox="0 0 100 100">
            {/* <use href="#left" x="10" y="-30" width="20" /> */}
            <path d="M30,10L70,10L70,90L30,90Z" stroke="#6af" fill="#6af3" />
            <text y="40" style={{ fontSize: 7 }}>
              <tspan x="42" dy="1.2em">
                52,5t
              </tspan>
              <tspan x="44" dy="1.3em" style={{ fontSize: 4.5 }}>
                co2e
              </tspan>
            </text>
          </svg>
          <p>
            <small>420Gt / 8B people = 52,5t</small>
          </p>
        </Container>
      </Section>
      <hr />
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
              <path d="M0,-500 L0,65 M-5,60 L500,60" stroke="#555" />
              <path
                d={`M0,${60 - co2e * 5} L${yearsToZero(co2e) * 5},60 L0,60 Z`}
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
              <path d="M5,30 L90,30" stroke="#aaa" />
              <rect x="40" y="22" width="15" height="15" fill="white" />
              {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
              <text x="40" y="36">
                🇨🇭
              </text>
            </svg>
          </div>
          <label htmlFor="yearOneCo2">
            Amount of co2e this year
            <p>
              <b>{co2e}t</b> co2e
            </p>
            <Range
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
          <p>
            You need to reach 0 co2e at{' '}
            {format('dd.MM.yyyy', addDays(yearsToZero(co2e) * 365, new Date()))}{' '}
            in {yearsToZero(co2e).toFixed(2)} years
          </p>
        </Container>
      </Section>
      <hr />
      <Section>
        <Container>
          <h2>Your personal co2e budget this year</h2>
          <p>
            You have a {co2e}t co2e budget this year to spend. Each year you
            need to reduce your co2e by {(co2e / yearsToZero(co2e)).toFixed(2)}
            t.
          </p>
          <svg
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
        </Container>
      </Section>
      <hr />
      <Section>
        <Container>
          <h2>Your daily co2e budget this year</h2>
          <p>
            Based on your yearly budget you have a daily budget of{' '}
            {dailyBudget(co2e)}
            kg co2e.
          </p>
          <svg viewBox="30 30 100 60">
            <path d="M48,80L52,80L52,84L48,84Z" stroke="#6af" fill="#6af3" />
            <text y="50" style={{ fontSize: 7 }}>
              <tspan x="35" dy="1.2em">
                Daily budget
              </tspan>
              <tspan x="40" dy="1.2em">
                {dailyBudget(co2e)}kg
              </tspan>
              <tspan x="45" dy="1.3em" style={{ fontSize: 4.5 }}>
                co2e
              </tspan>
            </text>
          </svg>
          <p>
            <small>
              {co2e}t / 365 = {dailyBudget(co2e)}kg
            </small>
          </p>
        </Container>
      </Section>
    </Layout>
  )
}

export default IndexPage
