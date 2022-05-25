import React, { useEffect, useState } from "react"
import "./App.css"
import { fetchForcastForCity } from "./services/forcastService"
import { Alert, Button, Divider, Input, Spin, Typography } from "antd"
import { formatForcast } from "./helpers/formatter"
import Forcast from "./components/Forcast"
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
  const [forcast, setForcast] = useState({})
  const [error, setError] = useState("")
  const [searchHistory, setSearchHistory] = useState(getHistoryFromStorage)

  useEffect(() => {
    if (!forcast.city) return
    setSearchHistory((prev) => [
      forcast,
      ...prev.filter((f) => f.city !== forcast.city),
    ])
  }, [forcast])

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(searchHistory))
  }, [searchHistory])

  const handleSearch = async () => {
    setLoading(true)
    try {
      const result = await fetchForcastForCity(city)
      setForcast(formatForcast(result))
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

      <Input.Group>
        <Input
          style={{
            width: "calc(100% - 200px)",
          }}
          value={city}
          placeholder="Searc city for forecast..."
          onChange={(e) => {
            setCity(e.target.value)
          }}
        />
        <Button
          type="primary"
          onClick={handleSearch}
          disabled={loading || !city.length}
        >
          Submit
        </Button>
      </Input.Group>

      <Divider />

      {error && <Alert message={error} type="error" />}

      {loading && <Spin />}

      {forcast.city && !loading && <Forcast forcast={forcast} />}

      <Divider />

      <SearchHistory history={searchHistory} />
    </div>
  )
}

export default App
