<script lang="ts" setup>
defineOptions({
  name: "vx-container"
})
</script>
<template>
  <div class="vx-container">
    <ElScrollbar class="vx-container__scrollbar">
      <slot></slot>
    </ElScrollbar>
  </div>
</template>

<style lang="scss" scoped>
@use "./VxContainer.scss";
</style>
