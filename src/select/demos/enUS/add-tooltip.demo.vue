<markdown>
# Add tooltip to option

Use the `render-option` property to control rendering of the entire option.
</markdown>

<script lang="ts" setup>
import type { SelectOption } from 'naive-ui'
import type { VNode } from 'vue'
import { NTooltip } from 'naive-ui'
import { h, ref } from 'vue'

function renderOption({ node, option }: { node: VNode, option: SelectOption }) {
  return h(NTooltip, null, {
    trigger: () => node,
    default: () => `Rubber Soul -${option.label}`
  })
}

const options = ref([
  {
    label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
    value: 'song0',
    disabled: true
  },
  {
    label: 'Drive My Car',
    value: 'song1'
  },
  {
    label: 'Norwegian Wood',
    value: 'song2'
  },
  {
    label: 'You Won\'t See',
    value: 'song3',
    disabled: true
  },
  {
    label: 'Nowhere Man',
    value: 'song4'
  },
  {
    label: 'Think For Yourself',
    value: 'song5'
  },
  {
    label: 'The Word',
    value: 'song6'
  },
  {
    label: 'Michelle',
    value: 'song7',
    disabled: true
  },
  {
    label: 'What goes on',
    value: 'song8'
  },
  {
    label: 'Girl',
    value: 'song9'
  },
  {
    label: 'I\'m looking through you',
    value: 'song10'
  },
  {
    label: 'In My Life',
    value: 'song11'
  },
  {
    label: 'Wait',
    value: 'song12'
  }
])
</script>

<template>
  <n-select :options="options" :render-option="renderOption" />
</template>
