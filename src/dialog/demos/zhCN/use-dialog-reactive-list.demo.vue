<markdown>
# 访问全部 Dialog 实例

你可以使用 `useDialogReactiveList` 去访问当前 `n-dialog-provider` 下的所有对话框。
</markdown>

<script lang="ts" setup>
import { useDialogReactiveList } from 'naive-ui'

const dialogReactiveList = useDialogReactiveList()
</script>

<template>
  目前页面中共有 {{ dialogReactiveList.length }} 个对话框。
</template>
