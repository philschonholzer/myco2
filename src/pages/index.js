import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import { css } from '@emotion/core'
import earth from '../images/earth.svg'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Container from '../style/Container'
import DefaultSection from '../style/Section'

const Section = styled(DefaultSection)``

const yearsToZero = co2e => (52.5 / co2e) * 2
const dailyBudget = co2e => ((co2e / 365) * 1e3).toFixed(2)

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
          {/* IDEA: Have red wedge fill according to scrollposition (ala apple.com) starting from 1850? showing the year number till today */}
          <img src={earth} alt="co2 budget left" />
        </Container>
      </Section>
      <hr />
      <Section>
        <Container>
          <h2>Your personal life-time co2e budget</h2>
          <p>
            If w still have 420Gt of co2e left to emmit, then each person has a
            personal lifetime budget of 52,5t co2e.
          </p>
          <div>
            <b>52,5t</b> <i>co2e</i>
          </div>
          <p>
            <small>420Gt / 8B people = 52,5t</small>
          </p>
        </Container>
      </Section>
      <hr />
      <Section>
        <Container>
          <h2>Your co2e spending plan</h2>
          <p>How much of your co2e budget do you want to spend this year?</p>
          <svg viewBox="-10 -5 120 80">
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
            <path d="M0,0 L0,65 M-5,60 L100,60" stroke="#555" />
            <path
              d={`M0,${60 - co2e * 5} L${yearsToZero(co2e) * 5},60 L0,60 Z`}
              stroke="red"
              fill="#ee000022"
            />
            <path d="M5,30 L90,30" stroke="#aaa" />
            <rect x="40" y="22" width="15" height="15" fill="white" />
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <text x="40" y="36">
              🇨🇭
            </text>
          </svg>
          <label htmlFor="yearOneCo2">
            Amount of co2e this year
            <input
              css={css`
                font-size: 4em;
                width: 2em;
              `}
              type="number"
              name="yearOneAmount"
              id="yearOneCo2"
              value={co2e}
              onChange={e => setCo2e(e.target.value)}
            />
          </label>
          <i>t co2e</i>
          <p>
            You need to reach 0 co2e in {yearsToZero(co2e).toFixed(2)} years
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
          <picture>co2e budget this year with curve to 0.</picture>
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
          <picture>
            {dailyBudget(co2e)}kg co2e
            <p>Show a little block of budget</p>
          </picture>
          <p>
            <small>
              {co2e}t / 356 = {dailyBudget(co2e)}kg
            </small>
          </p>
        </Container>
      </Section>
    </Layout>
  )
}

export default IndexPage
