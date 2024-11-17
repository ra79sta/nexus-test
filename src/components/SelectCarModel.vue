<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue"
import { useVehicleData } from "@/composables/useVehicleData"
import SelectDropdown from "@/elements/SelectDropdown.vue"

const { years, makes, models, error, fetchYears, fetchMakes, fetchModels, resetModels } = useVehicleData()

const selectedOptionYear = ref<string | number>("")
const selectedOptionMake = ref<string>("")
const selectedOptionModel = ref<string>("")

const isYearDropdownDisabled = computed(() => years.value.length === 0)
const isMakeDropdownDisabled = computed(() => makes.value.length === 0)
const isModelDropdownDisabled = computed(() => models.value.length === 0)

onMounted(async () => {
  await fetchYears()
})

watch(selectedOptionYear, async (year) => {
  if (year) {
    await fetchMakes(year.toString())
    selectedOptionMake.value = ""
    selectedOptionModel.value = ""
    resetModels()
  }
})

watch(selectedOptionMake, async (make) => {
  if (make) {
    await fetchModels(selectedOptionYear.value.toString(), make)
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
          name="yearSelect"
          :options="years"
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
          name="makeSelect"
          :options="makes"
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
          name="modelSelect"
          :options="models"
          v-model="selectedOptionModel"
          placeholder="Select Model"
          :disabled="isModelDropdownDisabled"
        />
        <p>
          Selected Model: <span class="selected-value">{{ selectedOptionModel }}</span>
        </p>
      </div>
    </div>
    <p class="error" v-if="!error">{{ error }}</p>
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
    color: #f1f181;
  }
  .select-wrapper {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
    h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #f1f181;
    }
    .option-choose-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
      align-items: start;
      .selected-value {
        color: #f1f181;
      }
      p {
        color: #d8d8c2;
      }
    }
  }
  .error {
    color: #ea0808;
  }
}
</style>
