<script lang="tsx" setup>
// import { defineComponent } from "vue"

const logoUrl = new URL("@/assets/imgs/VxLogo.png", import.meta.url).href
const vxTitle = import.meta.env.VITE_APP_TITLE
</script>
<template>
  <div class="vx-logo">
    <div class="vx-logo__image">
      <img :src="logoUrl" />
    </div>
    <div class="vx-logo__title">
      <span>{{ vxTitle }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "./Logo.scss";
</style>
