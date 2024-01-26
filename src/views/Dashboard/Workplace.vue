<script setup lang="tsx">
import { ref } from "vue"
import { VxContainer } from "@/components/VxContainer"
import { Table } from "@/components/Table"
import { ElButton, ElTag } from "element-plus"

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const tableData = [
  { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
  { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
  { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
  { id: 10004, name: "Test4", role: "Designer", sex: "Women", age: 24, address: "Shanghai" }
]

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
    width: 120
  },
  {
    field: "sex",
    label: "性别",
    prop: "sex",
    width: 120,
    fixed: "right"
  },
  {
    field: "age",
    label: "年龄",
    prop: "age",
    width: 250,
    slots: {
      default: () => {
        return (
          <>
            <ElButton>这是default</ElButton>
          </>
        )
      },
      newSlots: () => {
        return (
          <>
            <ElTag>这是newSlots</ElTag>
          </>
        )
      }
    }
  }
]
const rowClick = e => {
  console.log(e)
}
</script>
<template>
  <VxContainer>
    <div>Workplace</div>
    <div>
      <Table :data="tableData" @row-click="rowClick" :columns="columns" />
    </div>
  </VxContainer>
</template>
