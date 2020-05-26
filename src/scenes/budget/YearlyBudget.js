import React from 'react'
import parse from 'date-fns/fp/parse'
import { AxisLeft, AxisBottom } from '@vx/axis'
import { withParentSize } from '@vx/responsive'
import { AreaClosed } from '@vx/shape'
import { scaleLinear, scaleTime } from '@vx/scale'
import { cityTemperature as data } from '@vx/mock-data'
import { LinearGradient } from '@vx/gradient'
import { Group } from '@vx/group'

const parseDate = parse(new Date(), 'yyyyMMdd')
const margin = { top: 20, bottom: 40, left: 60, right: 20 }
const x = d => parseDate(d.date)
const y = d => d['New York']
const xData = data.map(x)
const yData = data.map(y)

// Compose together the scale and accessor functions to get point functions
const compose = (scale, accessor) => data => scale(accessor(data))

// Finally we'll embed it all in an SVG
function YearlyBudget(props) {
  // Define the graph dimensions and margins
  const { parentWidth: width, parentHeight: height } = props

  // Then we'll create some bounds
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const xScale = scaleTime({
    rangeRound: [0, xMax],
    domain: [Math.min(...xData), Math.max(...xData)],
    nice: true,
  })

  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [Math.min(...yData), Math.max(...yData)],
    nice: true,
  })

  const xPoint = compose(xScale, x)
  const yPoint = compose(yScale, y)

  return (
    <svg width={width} height={height}>
      <LinearGradient from="#fbc2eb" to="#a6c1ee" id="gradient" />
      <Group top={margin.top} left={margin.left}>
        <AreaClosed
          data={data}
          x={xPoint}
          y={yPoint}
          yScale={yScale}
          fill="url(#gradient)"
          stroke="#999"
          strokeWidth={1}
        />
        <AxisLeft
          scale={yScale}
          top={0}
          left={0}
          label="Temperature (°F)"
          stroke="#1b1a1e"
          tickTextFill="#1b1a1e"
        />
        <AxisBottom
          scale={xScale}
          top={yMax}
          label="Date"
          numTicks={8}
          stroke="#1b1a1e"
          tickTextFill="#1b1a1e"
        />
      </Group>
    </svg>
  )
}

export default withParentSize(YearlyBudget)
