import React from 'react'
import emotionNormalize from 'emotion-normalize'
import { Global, css } from '@emotion/core'

const GlobalStyle = () => (
  <Global
    styles={css`
      ${emotionNormalize},
      html {
        box-sizing: border-box;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      #gatsby-focus-wrapper {
        display: grid;
        grid:
          'Header' auto
          'Main' 1fr
          'Footer' auto
          / 1fr;
        min-height: 100vh;
      }
    `}
  />
)

export default GlobalStyle
