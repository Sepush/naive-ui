<markdown>
# Scroll to
</markdown>

<script lang="ts" setup>
import type { AnchorInst } from 'naive-ui'
import { ref } from 'vue'

const anchorRef = ref<AnchorInst | null>(null)
function scrollTo(href: string) {
  anchorRef.value?.scrollTo(href)
}
</script>

<template>
  <div style="height: 200px; padding-left: 200px">
    <n-anchor
      ref="anchorRef"
      affix
      :trigger-top="24"
      :top="88"
      :bound="24"
      style="z-index: 1"
    >
      <n-anchor-link title="Demos" href="#Demos">
        <n-anchor-link title="Basic" href="#basic.vue" />
        <n-anchor-link title="Ignore-Gap" href="#ignore-gap.vue" />
        <n-anchor-link title="Affix" href="#affix.vue" />
        <n-anchor-link title="Scroll To" href="#scrollto.vue" />
      </n-anchor-link>
      <n-anchor-link title="API" href="#API" />
    </n-anchor>
  </div>
  <n-space style="padding-left: 400px">
    <n-button @click="scrollTo('#basic.vue')">
      Basic
    </n-button>
    <n-button @click="scrollTo('#affix.vue')">
      Affix
    </n-button>
  </n-space>
</template>
