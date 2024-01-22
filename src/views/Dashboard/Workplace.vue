<script setup lang="ts">
import { ref } from "vue"
import { VxContainer } from "@/components/VxContainer"
import { Table } from "@/components/Table"

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const tableData = ref<RowVO[]>([
  { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
  { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
  { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
  { id: 10004, name: "Test4", role: "Designer", sex: "Women", age: 24, address: "Shanghai" }
])
</script>
<template>
  <VxContainer>
    <div>Workplace</div>
    <div><Table :data="tableData" /></div>
  </VxContainer>
</template>
