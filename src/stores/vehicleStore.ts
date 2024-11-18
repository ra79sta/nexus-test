import { defineStore } from "pinia"
import vehicleService from "@/services/vehicleService"

export const useVehicleStore = defineStore("vehicleStore", {
  state: () => ({
    years: [] as string[],
    makes: [] as { id: number; name: string }[],
    models: [] as { model: string }[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getYears: (state) => state.years,
    getMakes: (state) => state.makes,
    getModels: (state) => state.models,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },

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

    resetMakes() {
      this.makes = []
    },

    resetModels() {
      this.models = []
    },
  },
})
