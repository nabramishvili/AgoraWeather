import React from "react"
import { Row, Col, Typography } from "antd"
import DayWeather from "./DayWeather"

const { Title } = Typography

function Forcast({ forcast }) {
  const { weather, city } = forcast

  const days = Object.keys(weather).sort(
    (d1, d2) => Date.parse(d1) - Date.parse(d2)
  )

  const hottestDay = days.reduce((prev, current) =>
    Math.max(...weather[current].map((o) => o.temp)) >
    Math.max(...weather[prev].map((o) => o.temp))
      ? current
      : prev
  )
  return (
    <>
      <Title level={3}> Forcast for {city} </Title>
      <Row justify="space-between">
        {days.map((day) => (
          <Col span={3}>
            <DayWeather
              isHottest={hottestDay === day}
              key={day}
              day={day}
              weather={forcast.weather[day]}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Forcast
