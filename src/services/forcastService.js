import Api from "./api"

const forcastApi = Api("/forecast")

export const fetchForcastForCity = async (city) => {
  const { data } = await forcastApi.get("", {
    params: {
      q: city,
    },
  })
  return data
}
