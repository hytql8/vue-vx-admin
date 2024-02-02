<script lang="ts" setup>
defineOptions({
  name: "vx-container"
})
</script>
<template>
  <div class="vx-container">
    <ElScrollbar class="vx-container__scrollbar">
      <!-- <div class="vx-container__scrollbar-block"> -->
      <slot />
      <!-- </div> -->
    </ElScrollbar>
  </div>
</template>

<style lang="scss" scoped>
@use "./VxContainer.scss";
</style>
