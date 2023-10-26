<template>
  <VueDatePicker
    class="dp-theme"
    v-model="date"
    :enable-time-picker="false"
    :flow="['year', 'month', 'calendar']"
    placeholder="Enter birthday"
    utc
    text-input
    model-type="timestamp"
    clearable
    no-today
    autocomplete="birthday"
    :max-date="new Date()"
    prevent-min-max-navigation
    :start-date="new Date(1990, 0)"
    auto-apply
  ></VueDatePicker>
</template>

<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { DateTime } from 'luxon'

export interface BirthdayPickerEvents {
  (e: 'update:modelValue', value: DateTime | undefined): void
}

export interface BirthdayPickerProps {
  modelValue: DateTime | undefined
}

const emit = defineEmits<BirthdayPickerEvents>()
const props = defineProps<BirthdayPickerProps>()
const value = useVModel(props, 'modelValue', emit)

const date = computed({
  get(): Date | undefined {
    return value.value?.toJSDate()
  },
  set(val: Date | string | undefined) {
    if (val === null || val === undefined || val === '') return
    if (typeof val === 'string') {
      value.value = DateTime.fromJSDate(new Date(val))
    } else {
      value.value = val === undefined ? undefined : DateTime.fromJSDate(val)
    }
  }
})
</script>

<style lang="scss" scoped></style>
