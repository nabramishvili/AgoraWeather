import Api from "./api"

const forecastApi = Api("/forecast")

export const fetchForecastForCity = async (city) => {
  const { data } = await forecastApi.get("", {
    params: {
      q: city,
    },
  })
  return data
}
