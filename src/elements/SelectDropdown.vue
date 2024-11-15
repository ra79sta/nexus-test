<template>
  <div class="dropdown-wrapper" ref="dropDown">
    <div class="dropdown-selected-option" @click="toggleDropdown">
      {{ selectedOption || placeholder }}
    </div>
    <transition name="slide-fade">
      <div class="options-wrapper" v-if="isDropdownOpen">
        <div class="option" v-for="(option, index) in options" :key="index" @click="selectOption(option)">
          {{ option.value }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

interface Option {
  value: string | number
  label: string
}

const props = defineProps<{
  options: Option[]
  label?: string
  name: string
  placeholder?: string
  modelValue: string | number
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void
}>()

const dropDown = ref<HTMLElement | null>(null)
const selectedOption = ref(props.modelValue)
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectOption = (option: Option) => {
  selectedOption.value = option.value
  emit("update:modelValue", option.value)
  isDropdownOpen.value = false
}

const closeDropdown = (event: MouseEvent) => {
  if (dropDown.value && !dropDown.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener("click", closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener("click", closeDropdown)
})
</script>

<style scoped lang="scss">
.dropdown-wrapper {
  position: relative;
  padding-top: 12px;
  padding-bottom: 12px;
  width: 100%;
  margin: 0 auto;
  .dropdown-selected-option {
    padding: 12px;
    border: 1px solid #ccc;
    cursor: pointer;
    border-radius: 8px;
    box-sizing: border-box;
    margin-bottom: 3px;
  }
  .option:hover {
    background-color: #3b3636;
  }
  .option {
    padding: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    cursor: pointer;
  }
  .option:last-of-type {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
.slide-fade-enter-active {
  transition: opacity 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
