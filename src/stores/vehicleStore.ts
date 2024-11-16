import { defineStore } from "pinia"
import vehicleService from "@/services/vehicleService"

export const useVehicleStore = defineStore("vehicleStore", {
  state: () => ({
    years: [] as { year: string | number }[],
    makes: [] as { make: string }[],
    models: [] as {
      vehicle_id: string
      type: string
      vehicle_type: string
      body_type: string
      year: number
      make: string
      model: string
      original_model: string
    }[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchYears() {
      this.loading = true
      this.error = null
      try {
        this.years = await vehicleService.getYears()
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message || "Failed to fetch years."
        } else {
          this.error = "An unknown error occurred."
        }
      } finally {
        this.loading = false
      }
    },

    async fetchMakes(year: string) {
      this.loading = true
      this.error = null
      try {
        this.makes = await vehicleService.getMakes(year)
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message || "Failed to fetch makes."
        } else {
          this.error = "An unknown error occurred."
        }
      } finally {
        this.loading = false
      }
    },

    async fetchModels(year: string, make: string) {
      this.loading = true
      this.error = null
      try {
        this.models = await vehicleService.getModels(year, make)
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message || "Failed to fetch models."
        } else {
          this.error = "An unknown error occurred."
        }
      } finally {
        this.loading = false
      }
    },
  },
})
