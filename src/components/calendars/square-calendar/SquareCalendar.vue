<template>
  <div class="square-calendar" :class="{ [`square-calendar--${mode.toLowerCase()}`]: true }">
    <div class="square-calendar-row" v-for="j of rowCount" :key="j">
      <div
        class="square-calendar-square"
        :class="{
          used: (j - 1) * squaresPerRow + (i - 1) < filledSquaresCount,
          shared:
            (j - 1) * squaresPerRow + (i - 1) >= filledSquaresCount &&
            (j - 1) * squaresPerRow + (i - 1) < sharedSquaresCount
        }"
        v-for="i of squaresPerRow"
        :key="i"
      />
      <label v-if="j % 5 === 0">{{ j }}</label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/stores'
import { type DurationLikeObject } from 'luxon'

export interface SquareCalendarProps {
  mode?: 'WEEKS' | 'MONTHS'
}

const props = withDefaults(defineProps<SquareCalendarProps>(), { mode: 'WEEKS' })
const mode = useVModel(props, 'mode')

const store = useStore()

const WEEKS_PER_YEAR = 52
const MONTHS_PER_YEAR = 12

const squaresPerYear = computed(() => (mode.value === 'MONTHS' ? MONTHS_PER_YEAR : WEEKS_PER_YEAR))

const filledSquaresCount = computed(() => {
  if (!store.birthday || !store.dateNow) return 0
  return (
    Math.floor(
      store.dateNow.diff(store.birthday, undefined, { conversionAccuracy: 'longterm' }).as('years')
    ) *
      squaresPerYear.value +
    Math.floor(
      store.dateNow
        .diff(store.birthday.set({ year: store.dateNow.year }))
        .as(mode.value.toLowerCase() as keyof DurationLikeObject)
    )
  )
})

const sharedSquaresCount = computed(() => {
  if (!store.compareBirthday || !store.birthday || !filledSquaresCount.value) return 0

  const unsharedSquared = Math.round(
    store.birthday
      .diff(store.compareBirthday, undefined, { conversionAccuracy: 'longterm' })
      .rescale()
      .as(mode.value.toLowerCase() as keyof DurationLikeObject)
  )
  if (unsharedSquared <= 0) return squareCount.value
  return squareCount.value - unsharedSquared
})

const squareCount = computed(() => {
  if (!store.birthday || !store.dateOfDeath) return 0
  return Math.floor(store.dateOfDeath.diff(store.birthday).as('years') * squaresPerYear.value)
})
const rowCount = computed(() => {
  return Math.round(squareCount.value / squaresPerYear.value) * (mode.value === 'MONTHS' ? 1 : 1)
})
const squaresPerRow = computed(
  () => Math.floor(squaresPerYear.value) * (mode.value === 'MONTHS' ? 1 : 1)
)
</script>

<style lang="scss" scoped>
.square-calendar {
  box-sizing: border-box;
  margin: 10px;
}

.square-calendar-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 2px;
  margin-bottom: 2px;
  position: relative;

  &:nth-child(10n) {
    margin-bottom: 8px;
  }

  label {
    font-size: 10px;
    margin: 0 0 0 4px;
    padding: 0;
    position: absolute;
    left: 100%;
    top: 50%;
    translate: 0 -50%;
    text-align: left;

    @media screen and (max-width: 850px) {
      font-size: 8px;
    }

    @media screen and (max-width: 550px) {
      font-size: 7px;
    }

    @media screen and (max-width: 450px) {
      font-size: 6px;
    }
  }
}

.square-calendar-square {
  width: 6px;
  height: 6px;
  background-color: transparent;
  border: 1px solid black;
  display: block;

  @media screen and (max-width: 850px) {
    height: 4px;
    width: 4px;
  }

  @media screen and (max-width: 550px) {
    height: 3px;
    width: 3px;
  }

  @media screen and (max-width: 450px) {
    height: 2px;
    width: 2px;
  }

  &.used {
    background-color: black;
  }

  &.shared {
    border-color: #1a86d9;
  }
}
</style>
