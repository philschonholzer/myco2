import React from 'react'
import { Router } from '@reach/router'

import { Link } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Activities from '../scenes/activities'
import { Container } from '../style'

const Details = ({ activity }) => (
  <Container>
    <h2>Detail</h2>
    <p>More detail... for {activity}</p>
    <Link to="profile">Profile</Link>
  </Container>
)
const Profile = () => (
  <Container>
    <h2>Profile</h2>
    <Link to="details">Details</Link>
  </Container>
)

const ActivitiesPage = () => {
  return (
    <Layout>
      <SEO title="Activities" />
      <Router basepath="/activities">
        <Activities default />
        <Profile path="/profile" />
        <Details path="/details" />
        <Details path="/details/:activity" />
      </Router>
    </Layout>
  )
}

export default ActivitiesPage
