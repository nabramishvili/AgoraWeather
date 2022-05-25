import axios from "axios"

const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY =
  process.env.REACT_APP_API_KEY || "fd8b4a6c18bed1537d4065dd659d982d"
function Api(baseRoute = "/") {
  const instance = axios.create({
    baseURL: `${BASE_URL}${baseRoute}`,
    params: {
      appid: API_KEY,
      units: "metric",
    },
  })

  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => Promise.reject(error)
  )

  return instance
}

export default Api
