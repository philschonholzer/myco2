import React from 'react'
import Section from '../../style/Section'
import Container from '../../style/Container'

const dailyBudget = co2e => ((co2e / 365) * 1e3).toFixed(2)

const DailyBudget = ({ co2e }) => {
  return (
    <Section>
      <Container>
        <h2>Your daily co2e budget this year</h2>
        <p>
          Based on your yearly budget you have a daily budget of{' '}
          {dailyBudget(co2e)}
          kg co2e.
        </p>
        <svg viewBox="30 30 100 60">
          <path d="M48,80L52,80L52,84L48,84Z" stroke="#6af" fill="#6af3" />
          <text y="50" style={{ fontSize: 7 }}>
            <tspan x="35" dy="1.2em">
              Daily budget
            </tspan>
            <tspan x="40" dy="1.2em">
              {dailyBudget(co2e)}kg
            </tspan>
            <tspan x="45" dy="1.3em" style={{ fontSize: 4.5 }}>
              co2e
            </tspan>
          </text>
        </svg>
        <p>
          <small>
            {co2e}t / 365 = {dailyBudget(co2e)}kg
          </small>
        </p>
      </Container>
    </Section>
  )
}

export default DailyBudget
