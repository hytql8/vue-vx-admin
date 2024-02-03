<script setup lang="tsx">
import { ref, unref, watch } from "vue"
import { VxContainer } from "@/components/VxContainer"
import { Table } from "@/components/Table"
import { useTable } from "@/hooks/useTable"
import { ElButton, ElTag } from "element-plus"
import axios from "axios"

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
    width: 120,
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
    slots: {
      default: () => {
        return <ElButton type="primary">我是column的插槽</ElButton>
      },
      header: () => {
        return <ElTag effect="dark">操作 我是header的插槽</ElTag>
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
    console.log(unref(currentPage), unref(pageSize), "=====================")
    let list = []
    let total = 0
    const res = await axios({
      url: "/useTable/list",
      method: "post",
      data: {
        page: unref(currentPage),
        pageSize: unref(pageSize)
      }
    })
    console.log(res)
    list = res.data.result.items
    total = res.data.result.total
    return {
      list,
      total
    }
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { getList, getElTableExpose, delList } = tableMethods
</script>
<template>
  <VxContainer>
    <div class="vx-workplace">
      <Table
        :loading="loading"
        v-model:pageSize="pageSize"
        v-model:currentPage="currentPage"
        :border="true"
        style="width: 100%"
        :data="dataList"
        @row-click="rowClick"
        :columns="columns"
        @register="tableRegister"
        row-key="id"
        :pagination="{
          total
        }"
      >
      </Table>
    </div>
  </VxContainer>
</template>
<style scoped>
.vx-workplace {
  height: 100%;
}
</style>
