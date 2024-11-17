<template>
  <div class="dropdown-wrapper" ref="dropDown">
    <div class="dropdown-selected-option" :class="{ disabled: props.disabled }" @click="toggleDropdown">
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
import { ref, onMounted, onUnmounted, watch } from "vue"

interface Option {
  value: string | number
  label: string | number
}

const props = defineProps<{
  options: Option[]
  label?: string
  name: string
  placeholder?: string
  modelValue: string | number
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void
}>()

const dropDown = ref<HTMLElement | null>(null)
const selectedOption = ref(props.modelValue)
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  if (props.disabled) return
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
watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = newValue
  },
)
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
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  margin: 0 auto;
  .dropdown-selected-option {
    padding: 0.8rem;
    border: 1px solid #cccccc;
    cursor: pointer;
    border-radius: 0.6rem;
    box-sizing: border-box;
    margin-bottom: 3px;
  }
  .dropdown-selected-option.disabled {
    cursor: not-allowed;
    color: #827c7c;
  }
  .options-wrapper {
    position: absolute;
    width: 100%;
    border: 1px solid #cccccc;
    background: #000000;
    border-bottom-left-radius: 0.6rem;
    border-bottom-right-radius: 0.6rem;
    max-height: 375px;
    overflow-y: auto;
    .option:hover {
      background-color: #3b3636;
    }
    .option {
      padding: 10px;
      border-bottom: 1px solid #cccccc;
      box-sizing: border-box;
      cursor: pointer;
    }
    .option:last-of-type {
      border-bottom: none;
    }
  }
}
.slide-fade-enter-active {
  transition: opacity 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
