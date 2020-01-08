import React from 'react'

import Budget from '../scenes/budget'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const BudgetPage = () => {
  return (
    <Layout>
      <SEO title="Home" />

      <Budget />
    </Layout>
  )
}

export default BudgetPage
