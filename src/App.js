import React, { useEffect, useState } from "react"
import "./App.css"
import { fetchForecastForCity } from "./services/forecastService"
import { Alert, Button, Divider, Input, Spin, Typography, Form } from "antd"
import { formatForecast } from "./helpers/formatter"
import Forecast from "./components/Forecast"
import SearchHistory from "./components/SearchHistory"
import "antd/dist/antd.min.css"

const { Title } = Typography
const getHistoryFromStorage = () => {
  try {
    const history = localStorage.getItem("history")
    if (!history) return []
    return JSON.parse(localStorage.getItem("history"))
  } catch (e) {
    return []
  }
}
function App() {
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [forecast, setForecast] = useState({})
  const [error, setError] = useState("")
  const [searchHistory, setSearchHistory] = useState(getHistoryFromStorage)

  useEffect(() => {
    if (!forecast.city) return
    setSearchHistory((prev) => [
      forecast,
      ...prev.filter((f) => f.city !== forecast.city),
    ])
  }, [forecast])

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(searchHistory))
  }, [searchHistory])

  const handleSearch = async () => {
    setLoading(true)
    try {
      const result = await fetchForecastForCity(city)
      setForecast(formatForecast(result))
      setError("")
    } catch (e) {
      setError("City not found")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <Title>Weather App</Title>
      <Form onFinish={handleSearch}>
        <Input.Group>
          <Input
            style={{
              width: "calc(100% - 200px)",
            }}
            value={city}
            placeholder="Search city for forecast..."
            onChange={(e) => {
              setCity(e.target.value)
            }}
          />

          <Button
            type="primary"
            htmlType="submit"
            disabled={loading || !city.length}
          >
            Submit
          </Button>
        </Input.Group>
      </Form>

      <Divider />

      {error && <Alert message={error} type="error" />}

      {loading && <Spin />}

      {forecast.city && !loading && <Forecast forecast={forecast} />}

      <Divider />

      <SearchHistory history={searchHistory} />
    </div>
  )
}

export default App
