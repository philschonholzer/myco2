import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Section, Container } from '../style'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />

      <Section>
        <Container>
          <h2>Track your co2</h2>
          <Link to="activities">Start</Link>
        </Container>
      </Section>
    </Layout>
  )
}

export default IndexPage
