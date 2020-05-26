import React, { useState } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Section, Container } from '../../style'

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

const Activity = ({ name, filtered }) => {
  return (
    <Label htmlFor={name} key={name}>
      <Link to={`/activities/details/${name}`}>{name}</Link>
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

const ListAllActivities = () => {
  const [filtered, setFiltered] = useState(false)
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
            {activites &&
              activites.map(({ name }) => (
                <Activity name={name} filtered={filtered} />
              ))}
          </div>

          <Link to="/activities/details">Next</Link>
        </Container>
      </Section>
    </>
  )
}

export default ListAllActivities
