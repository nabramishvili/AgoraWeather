import React, { useState } from "react"
import { Badge, Card, Divider, Space, Typography } from "antd"
import { format, fromUnixTime } from "date-fns"
const { Text } = Typography

const parseHour = (timestamp) => format(fromUnixTime(timestamp), "haaa")

function DayWeather({ day, weather, isHottest }) {
  const maxWeather = weather.reduce((prev, current) =>
    prev.temp > current.temp ? prev : current
  )
  const minWeather = weather.reduce((prev, current) =>
    prev.temp < current.temp ? prev : current
  )

  const WeatherCard = (
    <Card title={format(new Date(day), "dd LLL")}>
      <Space direction="vertical">
        <Text>
          Max: {maxWeather.temp}°C at {parseHour(maxWeather.timestamp)}
        </Text>
        <Divider />
        <Text>
          Min: {minWeather.temp}°C at {parseHour(minWeather.timestamp)}
        </Text>
      </Space>
    </Card>
  )

  return isHottest ? (
    <Badge.Ribbon text={"hot"} color="red">
      {WeatherCard}
    </Badge.Ribbon>
  ) : (
    <>{WeatherCard}</>
  )
}

export default DayWeather
