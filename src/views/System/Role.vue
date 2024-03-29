<script setup lang="ts">
import { VxContainer } from "@/components/VxContainer"
import { roleList } from "@/api/user"
import { onMounted } from "vue"

onMounted(async () => {
  const {
    data: {
      code,
      data: { list, total }
    }
  } = await roleList({
    page: 1,
    pageSize: 10
  })
  console.log(code, list, total)
})
</script>
<template>
  <VxContainer>
    <div>Role</div>
  </VxContainer>
</template>
