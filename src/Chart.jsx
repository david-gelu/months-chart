import React from 'react'
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'


const Chart = ({ sortedMonthData, colorFill }) => {
  const width = 800
  const height = 500
  const margin = { top: 20, bottom: 20, left: 20, right: 20 }

  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const x = d => d.month
  const y = d => +d.value * 100

  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: sortedMonthData.map(x),
    padding: 0.4,
  })
  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...sortedMonthData.map(y))],
  })

  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => data => scale(accessor(data))
  const xPoint = compose(xScale, x)
  const yPoint = compose(yScale, y)
  return (
    <svg width={`${width / 10}vw`} height={`${height / 10}vh`}>
      {sortedMonthData.map((d, i) => {
        const barHeight = yMax - yPoint(d)
        return (
          <Group key={`bar-${i}`}
            x={xPoint(d)}
            y={yMax - barHeight}
            height={barHeight}
            width={xScale.bandwidth()}>
            <Bar
              x={`${xPoint(d) / 11}vw`}
              y={yMax - barHeight}
              height={barHeight}
              width={`${xScale.bandwidth() / 10}vw`}
              fill={colorFill[i]}
            />
          </Group>
        )
      })}
    </svg>
  )
}

export default Chart
