<markdown>
# Unclosable

You can make it unclosable.
</markdown>

<script lang="ts" setup>
import { useNotification } from 'naive-ui'

const notification = useNotification()

function handleClick() {
  notification.create({
    title: 'Close Me if You Can',
    duration: 2000,
    closable: false,
    onAfterLeave: () => {
      notification.create({
        title: 'Ha Ha Ha Ha!',
        duration: 2000,
        closable: false,
        onAfterLeave: () => {
          notification.create({
            title: 'No, You Can\'t',
            duration: 2000,
            closable: false
          })
        }
      })
    }
  })
}
</script>

<template>
  <n-button @click="handleClick">
    Unclosable
  </n-button>
</template>
