import { ref } from 'vue'
import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import { CalendarTypes, type CalendarType } from '@/components/calendars/calendarTypes'

export const useStore = defineStore('mainStore', () => {
  const backgroundColor = ref('#F0EAD6')
  const birthday = ref<DateTime | undefined>(undefined)
  const averageAge = ref<number>(80)
  const displayMode = ref<CalendarType>(CalendarTypes.WEEK_SQUARE)

  const compareBirthday = ref<DateTime | undefined>(undefined)

  const now = useNow()
  const dateNow = computed(() => DateTime.fromJSDate(now.value))

  const dateOfDeath = computed(() => {
    if (!birthday.value) return undefined
    return birthday.value.plus({ years: averageAge.value })
  })

  const timeToLiveInMs = computed(() => {
    if (!dateOfDeath.value) return undefined
    return dateOfDeath.value
      .diff(dateNow.value, undefined, { conversionAccuracy: 'longterm' })
      .rescale()
      .as('milliseconds')
  })

  const sharedTimeIsMs = computed(() => {
    if (!birthday.value) return undefined
    if (!compareBirthday.value) return undefined
    if (!timeToLiveInMs.value) return undefined
    return (
      timeToLiveInMs.value -
      birthday.value
        .diff(compareBirthday.value, undefined, { conversionAccuracy: 'longterm' })
        .rescale()
        .as('milliseconds')
    )
  })

  return {
    backgroundColor,
    birthday,
    averageAge,
    dateOfDeath,
    timeToLiveInMs,
    dateNow,
    displayMode,

    // For comparison mode
    compareBirthday,
    sharedTimeIsMs
  }
})
