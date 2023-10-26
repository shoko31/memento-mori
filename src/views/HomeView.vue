<template>
  <main :style="{ backgroundColor: store.backgroundColor }">
    <div class="form">
      <BirthdayPicker v-model="store.birthday" />
      <NumberInput v-model="store.averageAge" placeholder="Average age of death" />
      <SelectInput
        :options="displayOptions"
        v-model="store.displayMode"
        placeholder="Average age of death"
      />
      <MyButton @click="goToCalendar" :disabled="!store.averageAge || !store.birthday"
        >Generate</MyButton
      >
      <div class="divider">Compare with someone</div>
      <BirthdayPicker v-model="store.compareBirthday" />
      <MyButton
        @click="goToCalendar"
        :disabled="!store.averageAge || !store.birthday || !store.compareBirthday"
        >Compare & Generate</MyButton
      >
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router'
import { useStore } from '@/stores'
import { stringifyDate } from '@/utils'
import { CalendarTypes } from '@/components/calendars/calendarTypes'

const store = useStore()
const router = useRouter()

const displayOptions = Object.values(CalendarTypes)

const goToCalendar = () => {
  if (!store.birthday) return
  router.push({
    name: RouteNames.CALENDAR,
    query: {
      dob: stringifyDate(store.birthday.toJSDate()),
      age: `${store.averageAge}`,
      display: `${store.displayMode.value}`,
      dob2: store.compareBirthday ? stringifyDate(store.compareBirthday.toJSDate()) : undefined
    }
  })
}
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
}

.divider {
  display: inline-block;
  opacity: 0.6;
  &::before,
  &::after {
    display: inline-block;
    content: ' ';
    width: 50px;
    height: 1px;
    background-color: #444c;
    vertical-align: middle;
    margin: 0 10px;
    border-radius: 5px;
  }
}
</style>
