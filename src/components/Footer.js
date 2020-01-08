import React from 'react'
import styled from '@emotion/styled'
import { Container } from '../style'

const Wrapper = styled.footer`
  grid-area: Footer;
  padding-bottom: 10em;
`

const Footer = () => (
  <Wrapper>
    <Container>
      <p>© 2019 - {new Date().getFullYear()} My co2</p>
    </Container>
  </Wrapper>
)

export default Footer
