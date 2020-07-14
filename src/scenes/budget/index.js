import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { Section as DefaultSection, Container } from '../../style'
import Co2Left from './Co2Left'
import PersonalBudget from './PersonalBudget'
import Plan from './Plan'
import FirstBudget from './FirstBudget'
import DailyBudget from './DailyBudget'
import BarGraph from './BarGraph'

const Section = styled(DefaultSection)``

// https://ourworldindata.org/grapher/consumption-co2-per-capita?year=latest
const query = graphql`
  {
    allCo2ConsumptionCsv {
      nodes {
        Code
        Entity
        tCO2
        Flags
      }
    }
  }
`

const Budget = () => {
  const {
    allCo2ConsumptionCsv: { nodes: allCountryData },
  } = useStaticQuery(query)
  const [country, setCoutry] = React.useState()
  const [co2e, setCo2e] = React.useState(6)

  React.useEffect(() => {
    fetch('https://ipapi.co/json')
      .then(response => response.json())
      .then(({ country_code_iso3: cntry }) => setCoutry(cntry))
      .catch(err => err)
  }, [])

  const currentCountry = allCountryData.find(({ Code }) => Code === country)

  const world = allCountryData.find(({ Code }) => Code === 'OWID_WRL')

  return (
    <>
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
      <BarGraph />
      <hr />
      <Co2Left />
      <hr />
      <PersonalBudget />
      <hr />
      {currentCountry && (
        <Plan
          co2e={co2e}
          setCo2e={setCo2e}
          countryData={currentCountry}
          worldData={world}
        />
      )}
      <hr />
      {currentCountry && (
        <FirstBudget
          co2e={co2e}
          setCo2e={setCo2e}
          countryData={currentCountry}
          worldData={world}
        />
      )}
      <hr />
      <DailyBudget co2e={co2e} />
    </>
  )
}

export default Budget
