import React from 'react'

import { Section, Container } from '../../style'

const PersonalBudget = () => {
  return (
    <Section>
      <Container>
        <h2>Your personal life-time co2e budget</h2>
        <p>
          If we still have 420Gt of co2e left to emmit, then each person has a
          personal lifetime budget of 52,5t co2e.
        </p>
        <svg viewBox="0 0 100 100">
          {/* <use href="#left" x="10" y="-30" width="20" /> */}
          <path d="M30,10L70,10L70,90L30,90Z" stroke="#6af" fill="#6af3" />
          <text y="40" style={{ fontSize: 7 }}>
            <tspan x="42" dy="1.2em">
              52,5t
            </tspan>
            <tspan x="44" dy="1.3em" style={{ fontSize: 4.5 }}>
              co2e
            </tspan>
          </text>
        </svg>
        <p>
          <small>420Gt / 8B people = 52,5t</small>
        </p>
      </Container>
    </Section>
  )
}

export default PersonalBudget
