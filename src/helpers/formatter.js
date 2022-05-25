export const formatForcast = (data) => {
  const { list } = data
  const formattedForcast = {}
  list.forEach((item) => {
    const dateStr = new Date(item.dt * 1000).toDateString()
    formattedForcast[dateStr] = [
      ...(formattedForcast[dateStr] || []),
      {
        timestamp: item.dt,
        temp: item.main.temp,
      },
    ]
  })
  return {
    city: data.city.name,
    weather: formattedForcast,
  }
}
