<template>
  <h2>{{ formatTTL }}</h2>
  <h3 v-if="formatTTLTogether">{{ formatTTLTogether }}<br /><label>together</label></h3>
</template>

<script lang="ts" setup>
import { useStore } from '@/stores'
import { Duration } from 'luxon'

const store = useStore()

const formatTTL = computed(() => {
  if (!store.timeToLiveInMs) return undefined
  const dt = Duration.fromMillis(store.timeToLiveInMs).rescale()
  return dt.toFormat("y 'years' M 'months' d 'days'")
})

const formatTTLTogether = computed(() => {
  if (!store.birthday || !store.compareBirthday) return undefined
  if (!store.sharedTimeIsMs) return undefined
  if (store.compareBirthday > store.birthday) return formatTTL.value
  const dt = Duration.fromMillis(store.sharedTimeIsMs).rescale()
  return dt.toFormat("y 'years' M 'months' d 'days'")
})
</script>

<style lang="scss" scoped>
h2 {
  font-size: 3rem;
  text-shadow: 2px 2px 5px #fff;
  text-align: center;
}
h3 {
  text-align: center;
  color: #ca3482;

  label {
    color: rgb(115, 115, 115);
    font-size: 0.9em;
  }
}
</style>
