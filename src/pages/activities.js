import React from 'react'

import { Link } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ListAllActivities from '../scenes/activities/ListAllActivites'
import { Container } from '../style'
import ActivitiesScene from '../scenes/activities'

const Details = ({ activity }) => (
  <Container>
    <h2>Detail</h2>
    <p>More detail... for {activity}</p>
    <Link to="/activities/profile">Profile</Link>
  </Container>
)
const Profile = () => (
  <Container>
    <h2>Profile</h2>
    <Link to="/activities/details">Details</Link>
  </Container>
)

const ActivitiesPage = () => {
  return (
    <Layout>
      <SEO title="Activities" />
      <ActivitiesScene>
        <ListAllActivities path="/" />
        <Profile path="profile" />
        <Details path="details" />
        <Details path="details/:activity" />
      </ActivitiesScene>
    </Layout>
  )
}

export default ActivitiesPage
