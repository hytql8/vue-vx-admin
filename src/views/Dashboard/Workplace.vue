<script setup lang="tsx">
import { ref, unref } from "vue"
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

let tableData = ref([])

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
        return <ElButton type="primary">我是column的插槽</ElButton>
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

const total = ref(0)

axios({
  method: "post",
  url: "/useTable/list"
}).then(res => {
  console.log(res.data.result)
  tableData.value = res.data.result.items
  total.value = res.data.result.total
})
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
        :pagination="{
          total
        }"
      >
      </Table>
    </div>
  </VxContainer>
</template>
