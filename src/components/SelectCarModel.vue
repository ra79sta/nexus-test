<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue"
import { useVehicleStore } from "@/stores/vehicleStore"
import SelectDropdown from "@/elements/SelectDropdown.vue"

type YearOption = { value: string | number; label: string | number }
type MakeOption = { value: string; label: string }
type ModelOption = { value: string; label: string }

const yearsOptions = ref<YearOption[]>([])

const makeOptions = ref<MakeOption[]>([])

const modelOptions = ref<ModelOption[]>([])

const selectedOptionYear = ref("")
const selectedOptionMake = ref("")
const selectedOptionModel = ref("")

const isYearDropdownDisabled = computed(() => yearsOptions.value.length === 0)
const isMakeDropdownDisabled = computed(() => makeOptions.value.length === 0)
const isModelDropdownDisabled = computed(() => modelOptions.value.length === 0)

const vehicleStore = useVehicleStore()

onMounted(async () => {
  await vehicleStore.fetchYears()
  yearsOptions.value = vehicleStore.years.map((year: { year: string | number }) => ({
    value: year.year,
    label: year.year,
  }))
})
watch(selectedOptionYear, async (year) => {
  if (year) {
    await vehicleStore.fetchMakes(year)
    makeOptions.value = vehicleStore.makes.map((make: { make: string }) => ({
      value: make.make,
      label: make.make,
    }))
    selectedOptionMake.value = ""
    selectedOptionModel.value = ""
    modelOptions.value = []
  }
})
watch(selectedOptionMake, async (make) => {
  if (make) {
    await vehicleStore.fetchModels(selectedOptionYear.value, make)
    modelOptions.value = vehicleStore.models.map((model: { model: string }) => ({
      value: model.model,
      label: model.model,
    }))
    selectedOptionModel.value = ""
  }
})
</script>

<template>
  <div class="wrapper">
    <h1 class="head-text">Select Vehicle Model</h1>
    <div class="select-wrapper">
      <div class="option-choose-wrapper">
        <h1>Select Year</h1>
        <select-dropdown
          name="mySelect"
          :options="yearsOptions"
          v-model="selectedOptionYear"
          placeholder="Select Year"
          :disabled="isYearDropdownDisabled"
        />
        <p>
          Selected Year: <span class="selected-value">{{ selectedOptionYear }}</span>
        </p>
      </div>
      <div class="option-choose-wrapper">
        <h1>Select Make</h1>
        <select-dropdown
          name="mySelect"
          :options="makeOptions"
          v-model="selectedOptionMake"
          placeholder="Select Make"
          :disabled="isMakeDropdownDisabled"
        />
        <p>
          Selected Make: <span class="selected-value">{{ selectedOptionMake }}</span>
        </p>
      </div>
      <div class="option-choose-wrapper">
        <h1>Select Model</h1>
        <select-dropdown
          name="mySelect"
          :options="modelOptions"
          v-model="selectedOptionModel"
          placeholder="Select Model"
          :disabled="isModelDropdownDisabled"
        />
        <p>
          Selected Model: <span class="selected-value">{{ selectedOptionModel }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  gap: 2rem;
  .head-text {
    font-size: 2rem;
    color: rgb(241, 241, 129);
  }
  .select-wrapper {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
    h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: rgb(241, 241, 129);
    }
    .option-choose-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
      align-items: start;
      .selected-value {
        color: rgb(241, 241, 129);
      }
      p {
        color: rgb(216, 216, 194);
      }
    }
  }
}
</style>
