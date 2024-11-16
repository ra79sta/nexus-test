<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue"
import { useVehicleStore } from "@/stores/vehicleStore"
import SelectDropdown from "@/elements/SelectDropdown.vue"

type YearOption = { value: string | number; label: string | number }
type MakeOption = { value: string; label: string }
type ModelOption = { value: string; label: string }

const options = ref<YearOption[]>([])

const options2 = ref<MakeOption[]>([])

const options3 = ref<ModelOption[]>([])

const selectedOptionYear = ref("")
const selectedOptionMake = ref("")
const selectedOptionModel = ref("")

const isYearDropdownDisabled = computed(() => options.value.length === 0)
const isMakeDropdownDisabled = computed(() => options2.value.length === 0)
const isModelDropdownDisabled = computed(() => options3.value.length === 0)

const vehicleStore = useVehicleStore()

onMounted(async () => {
  await vehicleStore.fetchYears()
  options.value = vehicleStore.years.map((year: { year: string | number }) => ({
    value: year.year,
    label: year.year,
  }))
})
watch(selectedOptionYear, async (year) => {
  if (year) {
    await vehicleStore.fetchMakes(year)
    options2.value = vehicleStore.makes.map((make: { make: string }) => ({
      value: make.make,
      label: make.make,
    }))
  }
})
watch(selectedOptionMake, async (make) => {
  if (make) {
    await vehicleStore.fetchModels(selectedOptionYear.value, make)
    options3.value = vehicleStore.models.map((model: { model: string }) => ({
      value: model.model,
      label: model.model,
    }))
  }
})
</script>

<template>
  <div class="wrapper">
    <div class="option-choose-wrapper">
      <h1>Choose an Option</h1>
      <select-dropdown
        name="mySelect"
        :options="options"
        v-model="selectedOptionYear"
        placeholder="Select Year"
        :disabled="isYearDropdownDisabled"
      />
      <p>Selected Option: {{ selectedOptionYear }}</p>
    </div>
    <div class="option-choose-wrapper">
      <h1>Choose an Option</h1>
      <select-dropdown
        name="mySelect"
        :options="options2"
        v-model="selectedOptionMake"
        placeholder="Select Make"
        :disabled="isMakeDropdownDisabled"
      />
      <p>Selected Option: {{ selectedOptionMake }}</p>
    </div>
    <div class="option-choose-wrapper">
      <h1>Choose an Option</h1>
      <select-dropdown
        name="mySelect"
        :options="options3"
        v-model="selectedOptionModel"
        placeholder="Select Model"
        :disabled="isModelDropdownDisabled"
      />
      <p>Selected Option: {{ selectedOptionModel }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .option-choose-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    align-items: center;
  }
}
</style>
