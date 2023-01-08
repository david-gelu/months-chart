import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import moment from "moment"
import Chart from "./Chart"

import './App.css'

const MY_QUERY = gql`
  query {
    allPosts(count: 5000) {
      id
      createdAt
    }
  }
`


export default function App() {
  const { data, loading, error } = useQuery(MY_QUERY)
  if (loading) return <div className="load">Loading...</div>
  if (error) return <div className="error"> Error! ${error.message}</div>

  const monthArr = data.allPosts.map((d) => moment(Number(d.createdAt)).format("MMMM"))

  let count = {}
  for (let i = 0; i < monthArr.length; i++) {
    let month = monthArr[i]
    if (count[month]) count[month]++
    else count[month] = 1
  }

  const sortedMonths = Object.keys(count).sort((a, b) => {
    return moment(a, "MMMM").diff(moment(b, "MMMM"))
  })

  const sortedMonthData = sortedMonths.map((month) => {
    return { month: month, value: count[month] }
  })

  const colorFill = ['#913390', '#4118a0', '#622466', '#dd10fe', '#a8121a', '#5d3135', '#2dbad4', '#46a954', '#482f86', '#4e4247', '#fa3440', '#8a4df8']

  return (
    <div className="app">
      <ul>
        {sortedMonthData.map((d, i) => (
          <li key={d.id} style={{ fontSize: '2vw', color: colorFill[i], textDecoration: `underline ${colorFill[i]}` }}>
            {d.month} : {d.value}
          </li>
        ))}
      </ul>
      <Chart sortedMonthData={sortedMonthData} colorFill={colorFill} />
    </div>
  )
}
