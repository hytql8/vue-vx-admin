<script setup lang="tsx">
import { ref } from "vue"
import { VxContainer } from "@/components/VxContainer"
import { Table } from "@/components/Table"
import { ElButton, ElTag } from "element-plus"
import axios from "axios"

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}
const randomNumber = Math.floor(Math.random() * 10000) + 1
axios({
  method: "post",
  url: "/userTable/list"
}).then(res => {
  console.log(res.data)
})
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
    // index: randomNumber
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
        return <ElButton>我是column的插槽</ElButton>
      }
    }
  }
]
const rowClick = e => {
  console.log(e)
}

const register = (a, b) => {
  console.log(a, b)
}
</script>
<template>
  <VxContainer>
    <div>Workplace</div>
    <div>
      <Table
        stripe
        :height="200"
        :border="true"
        style="width: 100%"
        :data="tableData"
        @row-click="rowClick"
        :columns="columns"
        @register="register"
        row-key="id"
      >
      </Table>
    </div>
  </VxContainer>
</template>
