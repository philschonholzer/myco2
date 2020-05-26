import React from 'react'
import { Router } from '@reach/router'

const ActivitiesScene = ({ children }) => {
  return (
    <>
      <h1>Activites</h1>
      <Router basepath="activities">{children}</Router>
    </>
  )
}

export default ActivitiesScene
