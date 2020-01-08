import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Section from '../../style/Section'
import Container from '../../style/Container'

const mapEdgesToNodes = ({ edges }) => edges.map(({ node }) => node)

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.7em 0.5em;
  margin: 0;
  border-top: 1px solid lightgray;

  input {
    margin-right: 0.5em;
    transform: scale(2, 2);
  }
`

const Activity = ({ name }) => {
  return (
    <Label htmlFor={name}>
      {name}
      <input type="checkbox" id={name} name={name} />
    </Label>
  )
}

const query = graphql`
  {
    allActivitiesJson {
      edges {
        node {
          name
        }
      }
    }
  }
`

const Activities = () => {
  const { allActivitiesJson } = useStaticQuery(query)
  const activites = mapEdgesToNodes(allActivitiesJson)

  return (
    <>
      <Section>
        <Container>
          <h2>What are your activities?</h2>
          <div
            css={css`
              margin: 0 -0.5em 2em;
            `}
          >
            {activites && activites.map(Activity)}
          </div>

          <Link to="budget">Next</Link>
        </Container>
      </Section>
    </>
  )
}

export default Activities
