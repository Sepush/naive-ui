<markdown>
# 自定义颜色

这两个颜色看起来像毒蘑菇。
</markdown>

<script lang="ts" setup>
import { CashOutline as CashIcon } from '@vicons/ionicons5'
</script>

<template>
  <n-space align="center">
    <n-button color="#8a2be2">
      <template #icon>
        <n-icon>
          <CashIcon />
        </n-icon>
      </template>
      #8a2be2
    </n-button>
    <n-button color="#ff69b4">
      <template #icon>
        <n-icon>
          <CashIcon />
        </n-icon>
      </template>
      #ff69b4
    </n-button>
    <n-button ghost color="#8a2be2">
      <template #icon>
        <n-icon>
          <CashIcon />
        </n-icon>
      </template>
      #8a2be2
    </n-button>
    <n-button ghost color="#ff69b4">
      <template #icon>
        <n-icon>
          <CashIcon />
        </n-icon>
      </template>
      #ff69b4
    </n-button>
    <n-button text color="#8a2be2">
      <template #icon>
        <n-icon>
          <CashIcon />
        </n-icon>
      </template>
      #8a2be2
    </n-button>
    <n-button text color="#ff69b4">
      <template #icon>
        <n-icon>
          <CashIcon />
        </n-icon>
      </template>
      #ff69b4
    </n-button>
  </n-space>
</template>
