<markdown>
# 树型数据

在行数据中设定 `children` 来展示树型数据。如果你想用别的 key 来获取 children，那么可以设定 `children-key`。
</markdown>

<script lang="ts" setup>
import type { DataTableColumns } from 'naive-ui'

interface RowData {
  name: string
  index: string
  children?: RowData[]
}

const data: RowData[] = [
  {
    name: '07akioni',
    index: '07',
    children: [
      {
        name: '08akioni',
        index: '08',
        children: [
          {
            name: '09akioni',
            index: '09'
          },
          {
            name: '10akioni',
            index: '10'
          }
        ]
      }
    ]
  },
  {
    name: '11akioni',
    index: '11'
  }
]

const columns: DataTableColumns<RowData> = [
  {
    type: 'selection'
  },
  {
    title: 'name',
    key: 'name'
  },
  {
    title: 'index',
    key: 'index'
  }
]

function rowKey(row: RowData) {
  return row.index
}
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :row-key="rowKey"
    default-expand-all
  />
</template>
