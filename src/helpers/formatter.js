export const formatForecast = (data) => {
  const { list } = data
  const formattedForecast = {}
  list.forEach((item) => {
    const dateStr = new Date(item.dt * 1000).toDateString()
    formattedForecast[dateStr] = [
      ...(formattedForecast[dateStr] || []),
      {
        timestamp: item.dt,
        temp: item.main.temp,
      },
    ]
  })
  return {
    city: data.city.name,
    weather: formattedForecast,
  }
}
