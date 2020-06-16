import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Section, Container } from '../style'
import Budget from '../scenes/budget'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />

      <Section>
        <Container>
          <h2>co2 Budget</h2>
          <Link to="/activities">Activities</Link>
          <Budget />
        </Container>
      </Section>
    </Layout>
  )
}

export default IndexPage
