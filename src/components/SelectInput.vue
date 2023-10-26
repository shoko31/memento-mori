<template>
  <div class="select-container">
    <div class="custom-select" @click="toggleDropdown">
      <div class="selected-option" :class="{ placeholder: !value }">
        {{ value ? getValueLabel(value) : 'Select one' }}
      </div>
      <div class="dropdown-arrow">{{ dropdownOpen ? '▲' : '▼' }}</div>
    </div>
    <div class="options" v-if="dropdownOpen">
      <div
        v-for="option in options"
        :key="getValueIdentifier(option)"
        class="custom-option"
        @click="selectOption(option)"
      >
        {{ getValueLabel(option) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export type SelectInputOption = { label: string; value: string } | string

export interface SelectInputEvents {
  (e: 'update:modelValue', val: SelectInputOption): void
}

export interface SelectInputProps {
  options: SelectInputOption[]
  modelValue: SelectInputOption | undefined
}

const emit = defineEmits<SelectInputEvents>()
const props = defineProps<SelectInputProps>()
const value = useVModel(props, 'modelValue', emit)

// Data
const dropdownOpen = ref(false)

// Methods
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option: SelectInputOption) => {
  value.value = option
  dropdownOpen.value = false
}

function getValueIdentifier(val: SelectInputOption) {
  if (typeof val === 'string') return val
  return val.value
}

function getValueLabel(val: SelectInputOption) {
  if (typeof val === 'string') return val
  return val.label
}
</script>

<style scoped lang="scss">
.select-container {
  position: relative;
  width: 100%;
  box-sizing: unset;
  font-family: var(--input-font-family);
  user-select: none;

  .custom-select {
    user-select: none;
    display: flex;
    text-align: start;
    cursor: pointer;

    background-color: var(--input-background-color);
    color: var(--input-text-color);
    border-radius: var(--input-border-radius);
    font-family: var(--input-font-family);
    border: 1px solid var(--input-border-color);
    outline: none;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    font-size: var(--input-font-size);
    line-height: calc(var(--input-font-size) * 1.5);
    padding: var(--input-input-padding);
    box-sizing: border-box;

    .selected-option {
      flex-grow: 1;

      &.placeholder {
        color: #a0a0a0;
      }
    }

    .dropdown-arrow {
      position: absolute;
      right: 0;
      top: 50%;
      translate: 0 -50%;
      padding: 0 10px;
    }
  }

  .options {
    position: absolute;
    z-index: 100;
    top: -3px;
    left: 0;
    right: 0;
    translate: 0 -100%;
    flex-direction: column;
    user-select: none;
    background-color: var(--input-background-color);
    color: var(--input-text-color);
    border-radius: var(--input-border-radius);

    .custom-option {
      padding: 5px;
      border-top: 1px solid var(--input-border-color);
      cursor: pointer;
      transition: all 0.1s ease-in;

      &:hover {
        background: var(--input-hover-color);
        color: var(--input-hover-text-color);
      }
    }
  }
}
</style>
