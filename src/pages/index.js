import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Container from '../style/Container'
import DefaultSection from '../style/Section'
import Co2Left from '../scenes/Budget/Co2Left'
import PersonalBudget from '../scenes/Budget/PersonalBudget'
import Plan from '../scenes/Budget/Plan'
import FirstBudget from '../scenes/Budget/FirstBudget'
import DailyBudget from '../scenes/Budget/DailyBudget'

const Section = styled(DefaultSection)``

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
      <Co2Left />
      <hr />
      <PersonalBudget />
      <hr />
      <Plan co2e={co2e} setCo2e={setCo2e} />
      <hr />
      <FirstBudget co2e={co2e} />
      <hr />
      <DailyBudget co2e={co2e} />
    </Layout>
  )
}

export default IndexPage
