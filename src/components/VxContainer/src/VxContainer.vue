<script lang="ts" setup>
defineOptions({
  name: "vx-container"
})
</script>
<template>
  <div class="vx-container">
    <ElCard class="vx-container__card" shadow="never">
      <slot></slot>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped>
@use "./VxContainer.scss";
</style>
