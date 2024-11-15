<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useVehicleStore } from "@/stores/vehicleStore"
import SelectDropdown from "@/elements/SelectDropdown.vue"

type Option = { value: string | number; label: string | number }

const options = ref<Option[]>([])

const options2 = ref([
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
  { value: 3, label: "Option 3" },
])

const options3 = ref([
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
  { value: 3, label: "Option 3" },
])

const selectedOption = ref("")
const selectedOption2 = ref("")
const selectedOption3 = ref("")

const vehicleStore = useVehicleStore()

onMounted(async () => {
  await vehicleStore.fetchYears()
  options.value = vehicleStore.years.map((year: { year: string | number }) => ({
    value: year.year,
    label: year.year,
  }))
})
</script>

<template>
  <div class="wrapper">
    <div class="option-choose-wrapper">
      <h1>Choose an Option</h1>
      <select-dropdown name="mySelect" :options="options" v-model="selectedOption" placeholder="Select Year" />
      <p>Selected Option: {{ selectedOption }}</p>
    </div>
    <div class="option-choose-wrapper">
      <h1>Choose an Option</h1>
      <select-dropdown name="mySelect" :options="options2" v-model="selectedOption2" placeholder="Select Make" />
      <p>Selected Option: {{ selectedOption2 }}</p>
    </div>
    <div class="option-choose-wrapper">
      <h1>Choose an Option</h1>
      <select-dropdown name="mySelect" :options="options3" v-model="selectedOption3" placeholder="Select Model" />
      <p>Selected Option: {{ selectedOption3 }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 2rem;
  justify-content: space-evenly;
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
