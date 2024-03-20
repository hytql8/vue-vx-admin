<script setup lang="tsx">
import { unref } from "vue"
import { VxContainer } from "@/components/VxContainer"
import { Table } from "@/components/Table"
import { useTable } from "@/hooks/useTable"
import { ElButton, ElTag } from "element-plus"
import { getUseTableList } from "@/api/table"

const columns = [
  {
    label: "#",
    width: 55,
    type: "selection"
  },
  {
    label: "序号",
    width: 55,
    type: "index"
  },
  {
    field: "id",
    label: "Id",
    prop: "id",
    width: 120
  },
  {
    field: "name",
    label: "名字",
    prop: "name",
    width: 120
  },
  {
    field: "role",
    label: "角色",
    prop: "role",
    children: [
      {
        field: "sex",
        label: "性别",
        prop: "sex",
        width: 120
      },
      {
        field: "age",
        label: "年龄",
        prop: "age"
      }
    ]
  },
  {
    field: "action",
    label: "操作",
    prop: "action",
    width: 150,
    slots: {
      default: () => {
        return <ElButton type="primary">tsx 按钮</ElButton>
      },
      header: () => {
        return <ElTag effect="dark">tsx 头部</ElTag>
      }
    }
  }
]
const rowClick = e => {
  console.log(e)
}

const { tableRegister, tableState, tableMethods } = useTable({
  getDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getUseTableList({
      page: unref(currentPage),
      pageSize: unref(pageSize)
    })
    return {
      list: res.result.items,
      total: res.result.total
    }
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { getElTableExpose, refresh } = tableMethods

const getElTableRef = async () => {
  const elTableRef = await getElTableExpose()
  console.log(elTableRef, "el-table-ref")
}

getElTableRef()
</script>
<template>
  <VxContainer>
    <div class="vx-workplace">
      <Table
        fill-up
        :loading="loading"
        v-model:pageSize="pageSize"
        v-model:currentPage="currentPage"
        style="width: 100%"
        :data="dataList"
        :columns="columns"
        @row-click="rowClick"
        @register="tableRegister"
        @refresh="refresh"
        row-key="id"
        :pagination="{
          total
        }"
      >
        <template #setting> UseTable</template>
      </Table>
    </div>
  </VxContainer>
</template>
<style scoped>
.vx-workplace {
  height: 100%;
}
</style>
