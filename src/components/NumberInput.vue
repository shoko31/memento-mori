<template>
  <div class="number_input_wrap">
    <input
      v-bind="$attrs"
      :placeholder="placeholder"
      type="tel"
      autocomplete="off"
      class="number_input"
      v-model="value"
      @blur="updateInternalValue"
    />
  </div>
</template>

<script lang="ts" setup>
export interface NumberInputEvents {
  (e: 'update:modelValue', value: number): void
}

export interface NumberInputProps {
  placeholder?: string
  modelValue: number
}

const emit = defineEmits<NumberInputEvents>()
const props = defineProps<NumberInputProps>()
const modelValue = useVModel(props, 'modelValue', emit)

const value = computed({
  get(): string {
    return `${modelValue.value}`
  },
  set(val: string) {
    try {
      modelValue.value = Number.parseInt(val)
    } finally {
      /* empty */
    }
  }
})

const updateInternalValue = (ev: Event) => {
  if (ev.target === null) return
  if (ev.target instanceof HTMLInputElement) {
    ev.target.value = `${modelValue.value}`
  }
}
</script>

<style lang="scss" scoped>
.number_input_wrap {
  position: relative;
  width: 100%;
  box-sizing: unset;
  font-family: var(--input-font-family);
  user-select: none;
}

.number_input {
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

  // padding-inline-start: var(--dp-input-icon-padding);

  &:hover {
    color: var(--input-hover-text-color);
    border-color: var(--input-border-color-hover);
  }
}

.number_input_icon {
  stroke: currentcolor;
  fill: currentcolor;

  position: absolute;
  top: 50%;
  inset-inline-end: 0;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--dp-icon-color);

  display: inline-block;
  width: var(--dp-font-size);
  height: var(--dp-font-size);
  stroke-width: 0;
  font-size: var(--dp-font-size);
  line-height: calc(var(--dp-font-size) * 1.5);
  padding: 6px 12px;
  box-sizing: content-box;
}
</style>
