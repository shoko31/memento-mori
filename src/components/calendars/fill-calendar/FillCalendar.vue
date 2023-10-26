<template>
  <div class="fill-calendar">
    <div class="fill-calendar-used-time-wrapper" :style="{ height: `${fillPercentage * 100}dvh` }">
      <div class="fill-calendar-color" />
      <div class="fill-calendar-gradient" />
    </div>
    <div
      v-if="store.compareBirthday"
      class="fill-calendar-used-time-wrapper shared"
      :style="{ height: `${sharedFillPercentage * 100}dvh` }"
    >
      <div class="fill-calendar-color" />
      <div class="fill-calendar-gradient" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/stores'

const store = useStore()

const fillPercentage = computed(() => {
  if (!store.timeToLiveInMs || !store.birthday || !store.dateOfDeath) return 0
  return (
    Math.round(
      (1 - store.timeToLiveInMs / store.dateOfDeath?.diff(store.birthday).as('milliseconds')) *
        10000
    ) / 10000
  )
})

const sharedFillPercentage = computed(() => {
  if (!store.sharedTimeIsMs || !store.birthday || !store.dateOfDeath) return 0
  return (
    Math.round(
      (store.sharedTimeIsMs / store.dateOfDeath?.diff(store.birthday).as('milliseconds')) * 10000
    ) / 10000
  )
})
</script>

<style lang="scss" scoped>
.fill-calendar {
  position: fixed;
  inset: 0;
}
.fill-calendar-used-time-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  .fill-calendar-gradient {
    position: absolute;
    bottom: -30px;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(#000000 0%, #00000066 30%, #00000000 90%, #ffffffaa 100%);
  }
  .fill-calendar-color {
    background-color: #000000;
    height: 100%;
  }

  &.shared {
    top: unset;
    bottom: 0;

    .fill-calendar-gradient {
      position: absolute;
      top: 0px;
      left: 0;
      right: 0;
      height: 30px;
      background: linear-gradient(#26218000 0%, #26218066 90%, #26218000 30%, #262180aa 0%);
    }
    .fill-calendar-color {
      background: linear-gradient(#262180 0%, #04106e 100%);
      margin-top: 30px;
      height: calc(100% - 30px);
    }
  }
}
</style>
