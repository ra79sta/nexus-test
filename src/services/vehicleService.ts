import apiInstance from "@/plugins/apiWrapper"

export interface Year {
  year: string | number
}

export interface Make {
  make: string
}

export interface VehicleModel {
  vehicle_id: string
  type: string
  vehicle_type: string
  body_type: string
  year: number
  make: string
  model: string
  original_model: string
}

export default {
  async getYears(): Promise<Year[]> {
    const response = await apiInstance.get(`v2/vehicles/years/`)
    return response.data
  },

  async getMakes(year: string): Promise<Make[]> {
    const response = await apiInstance.get(`v2/vehicles/makes/?year=${year}`)
    return response.data
  },

  async getModels(year: string, make: string): Promise<VehicleModel[]> {
    const response = await apiInstance.get(`v2/vehicles/models/?year=${year}&make=${make}`)
    return response.data
  },
}
