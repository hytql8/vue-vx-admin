<script setup lang="tsx">
import { unref } from "vue"
import { VxContainer } from "@/components/VxContainer"
import { Table } from "@/components/Table"
import { useTable } from "@/hooks/useTable"
import { ElButton, ElTag } from "element-plus"
import { getUseTableList } from "@/api/workplace"

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
const { getElTableExpose, setProps, refresh } = tableMethods

const getElTableRef = async () => {
  const elTableRef = await getElTableExpose()
  console.log(elTableRef, "el-table-ref")
}

getElTableRef()
const clickSetProps = () => {
  setProps({
    stripe: true
  })
}
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
        <template #search>
          <span>待添加搜索Form部分的插槽</span>
        </template>
        <template #prefix>
          <span>自定义部分插槽，不需要可忽略</span>
          <ElButton @click="clickSetProps">设置属性prefix</ElButton>
        </template>
        <template #setting>
          <span>table setting部分插槽, 不需要可忽略</span>
        </template>
      </Table>
    </div>
  </VxContainer>
</template>
<style scoped>
.vx-workplace {
  height: 100%;
}
</style>
