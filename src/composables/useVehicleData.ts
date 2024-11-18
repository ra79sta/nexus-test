import { computed } from "vue"
import { useVehicleStore } from "@/stores/vehicleStore"

export type YearOption = { value: string | number; label: string | number }
export type MakeOption = { value: string; label: string }
export type ModelOption = { value: string; label: string }

export const useVehicleData = () => {
  const vehicleStore = useVehicleStore()

  const years = computed<YearOption[]>(() =>
    vehicleStore.getYears.map((year) => ({
      value: year,
      label: year,
    })),
  )

  const makes = computed<MakeOption[]>(() =>
    vehicleStore.getMakes.map((make) => ({
      value: make.name,
      label: make.name,
    })),
  )

  const models = computed<ModelOption[]>(() =>
    vehicleStore.getModels.map((model) => ({
      value: model.model,
      label: model.model,
    })),
  )

  const isLoading = computed(() => vehicleStore.isLoading)
  const error = computed(() => vehicleStore.getError)

  const fetchYears = async () => {
    await vehicleStore.fetchYears()
  }

  const fetchMakes = async (year: string) => {
    await vehicleStore.fetchMakes(year)
  }

  const fetchModels = async (year: string, make: string) => {
    await vehicleStore.fetchModels(year, make)
  }

  const resetMakes = () => {
    vehicleStore.resetMakes()
  }

  const resetModels = () => {
    vehicleStore.resetModels()
  }

  return {
    years,
    makes,
    models,
    isLoading,
    error,
    fetchYears,
    fetchMakes,
    fetchModels,
    resetMakes,
    resetModels,
  }
}
