<markdown>
# 基础

你可以使用上面的 CSS 变量。如果你需要在 JS 中使用这些变量，请使用 [useThemeVars](../docs/theme#use-theme-vars)。
</markdown>

<script lang="ts" setup>
import { darkTheme } from 'naive-ui'
import { ref } from 'vue'

const theme = ref<typeof darkTheme | null>(null)
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="theme = darkTheme">
        深色
      </n-button>
      <n-button @click="theme = null">
        浅色
      </n-button>
    </n-space>
    <n-config-provider :theme="theme">
      <n-card>
        <n-el
          tag="span"
          style="
            color: var(--primary-color);
            transition: 0.3s var(--cubic-bezier-ease-in-out);
          "
        >
          我是个 span 标签
        </n-el>
      </n-card>
    </n-config-provider>
  </n-space>
</template>
