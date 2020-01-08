import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Container from '../../style/Container'
import DefaultSection from '../../style/Section'
import Co2Left from './Co2Left'
import PersonalBudget from './PersonalBudget'
import Plan from './Plan'
import FirstBudget from './FirstBudget'
import DailyBudget from './DailyBudget'

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

const Budget = () => {
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
      <Co2Left />
      <hr />
      <PersonalBudget />
      <hr />
      <Plan co2e={co2e} setCo2e={setCo2e} />
      <hr />
      <FirstBudget co2e={co2e} />
      <hr />
      <DailyBudget co2e={co2e} />
    </>
  )
}

export default Budget
