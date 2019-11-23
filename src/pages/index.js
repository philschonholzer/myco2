import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import { css } from '@emotion/core'
import earth from '../images/earth.svg'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Container from '../style/Container'
import DefaultSection from '../style/Section'

const Section = styled(DefaultSection)`
  min-height: 100vh;
`

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
          <picture>co2e spending curve</picture>
          <label htmlFor="yearOneCo2">
            Amount of co2e this year
            <input type="number" name="yearOneAmount" id="yearOneCo2" />
          </label>
          <i>t co2e</i>
          <em>You need to reach 0 co2e in {17.5} years</em>
        </Container>
      </Section>
      <hr />
      <Section>
        <Container>
          <h2>Your personal co2e budget this year</h2>
          <p>
            You have a {6}t co2e budget this year to spend. Each year you need
            to reduce your co2e by {0.36}t.
          </p>
          <picture>co2e budget this year with curve to 0.</picture>
        </Container>
      </Section>
      <hr />
      <Section>
        <Container>
          <h2>Your daily co2e budget this year</h2>
          <p>
            Based on your yearly budget you have a daily budget of {16.4}kg
            co2e.
          </p>
          <picture>
            {16.4}kg co2e
            <p>Show a little block of budget</p>
          </picture>
          <p>
            <small>
              {6}t / 356 = {16.4}kg
            </small>
          </p>
        </Container>
      </Section>
    </Layout>
  )
}

export default IndexPage
