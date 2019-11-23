import { Link } from 'gatsby'
import React from 'react'
import styled from '@emotion/styled'
import Container from '../style/Container'

const Wrapper = styled.header`
  grid-area: Header;
`

const Header = ({ siteTitle = `` }) => (
  <Wrapper>
    <Container>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
    </Container>
  </Wrapper>
)

export default Header
