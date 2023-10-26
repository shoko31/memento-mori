<template>
  <main :style="{ backgroundColor: store.backgroundColor }">
    <div class="form">
      <SquareCalendar v-if="isSquareCalendar" :mode="squareCalendarMode" />
      <TimerCalendar v-else-if="store.displayMode.equals(CalendarTypes.TIMER)" />
      <FillCalendar v-else-if="store.displayMode.equals(CalendarTypes.FILL)" />
    </div>
    <MyButton class="return-btn" @click="returnToHome">←</MyButton>
  </main>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'
import { DateTime } from 'luxon'
import { CalendarType, CalendarTypes } from '@/components/calendars/calendarTypes'

const store = useStore()
const router = useRouter()
const route = useRoute()

function parseDOBFromUrl() {
  if (typeof route.query.dob === 'string') {
    try {
      const parsedDOB = route.query.dob.split('-')
      if (parsedDOB.length !== 3) return
      store.birthday = DateTime.fromObject({
        year: Number.parseInt(parsedDOB[0]),
        month: Number.parseInt(parsedDOB[1]),
        day: Number.parseInt(parsedDOB[2])
      })
    } finally {
      /* empty */
    }
  }
}

function parseCompareDOBFromUrl() {
  if (typeof route.query.dob2 === 'string') {
    try {
      const parsedDOB = route.query.dob2.split('-')
      if (parsedDOB.length !== 3) return
      store.compareBirthday = DateTime.fromObject({
        year: Number.parseInt(parsedDOB[0]),
        month: Number.parseInt(parsedDOB[1]),
        day: Number.parseInt(parsedDOB[2])
      })
    } finally {
      /* empty */
    }
  }
}

function parseAgeFromUrl() {
  if (typeof route.query.age === 'string') {
    try {
      store.averageAge = Number.parseInt(route.query.age)
    } finally {
      /* empty */
    }
  }
}

function parseDisplayFromUrl() {
  if (typeof route.query.display === 'string') {
    const wantedDisplay = route.query.display.toLowerCase()
    const wantedCalendarType = CalendarType.fromValue(wantedDisplay)
    if (wantedCalendarType) {
      store.displayMode = wantedCalendarType
    }
  }
}

const returnToHome = () => {
  router.back()
}

parseDOBFromUrl()
parseCompareDOBFromUrl()
parseAgeFromUrl()
parseDisplayFromUrl()

const isSquareCalendar = computed(
  () =>
    store.displayMode.equals(CalendarTypes.MONTH_SQUARE) ||
    store.displayMode.equals(CalendarTypes.WEEK_SQUARE)
)
const squareCalendarMode = computed(() =>
  store.displayMode.equals(CalendarTypes.MONTH_SQUARE) ? 'MONTHS' : 'WEEKS'
)
</script>

<style lang="scss" scoped>
main {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  overflow: auto;
  box-sizing: border-box;

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: max-content;
    padding: 30px;
    gap: 30px;
  }

  .return-btn {
    position: fixed;
    top: 5px;
    left: 5px;
    padding: 0;
    width: 20px;
    height: 20px;
    padding-bottom: 2px;
  }
}
</style>
