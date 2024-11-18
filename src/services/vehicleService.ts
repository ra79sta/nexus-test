import apiInstance from "@/plugins/apiWrapper"

export type Year = string

export type Make = { id: number; name: string }

export type VehicleModel = { model: string }

const VEHICLE_API_PATH = "api/vehicles/"

export default {
  async getYears(): Promise<Year[]> {
    const response = await apiInstance.get(`${VEHICLE_API_PATH}years`)
    return response.data.data
  },

  async getMakes(year: string): Promise<Make[]> {
    const response = await apiInstance.get(`${VEHICLE_API_PATH}makes?year=${year}`)
    return response.data.data
  },

  async getModels(year: string, make: string): Promise<VehicleModel[]> {
    const response = await apiInstance.get(`${VEHICLE_API_PATH}models?year=${year}&make=${make}`)
    return response.data.data
  },
}
