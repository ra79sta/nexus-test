import apiInstance from "@/plugins/apiWrapper"

export default {
  async getYears() {
    const response = await apiInstance.get(`v2/vehicles/years/?token=${import.meta.env.VITE_API_URL_TOKEN as string}`)
    return response.data
  },

  async getMakes(year: string) {
    const response = await apiInstance.get(
      `v2/vehicles/makes/?year=${year}&token=${import.meta.env.VITE_API_URL_TOKEN as string}`,
    )
    return response.data
  },

  async getModels(year: string, make: string) {
    const response = await apiInstance.get(
      `v2/vehicles/models/?year=${year}&make=${make}&token=${import.meta.env.VITE_API_URL_TOKEN as string}`,
    )
    return response.data
  },
}
