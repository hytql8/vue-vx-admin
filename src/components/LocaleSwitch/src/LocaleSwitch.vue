<script lang="ts" setup>
// import { ref } from "vue"
import { VxIcon } from "@/components/VxIcon"

defineOptions({
  name: "LocaleSwitch"
})
</script>
<template>
  <ElDropdown class="el-dropdown">
    <VxIcon icon="line-md:chevron-down"></VxIcon>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem>中文</ElDropdownItem>
        <ElDropdownItem>English</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
