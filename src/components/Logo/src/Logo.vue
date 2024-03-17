<script lang="tsx" setup>
import { computed, unref } from "vue"
import { useAppStore } from "@/store/modules/app"

const appStore = useAppStore()
const isFold = computed(() => appStore.getIsFold)
const horizontalMode = computed(() =>
  appStore.getLayout === "horizontal"
    ? {
        backgroundColor: "var(--theme-div-color)",
        color: "var(--theme-text-color)",
        border: "none"
      }
    : {
        backgroundColor: " var(--left-menu-bg-color)",
        color: "var(--left-menu-text-active-color)"
      }
)

const menuWidth = computed(() => (unref(isFold) ? "0" : "148.5px"))

const logoUrl = new URL("@/assets/imgs/VxLogo.png", import.meta.url).href
const vxTitle = import.meta.env.VITE_APP_TITLE
</script>
<template>
  <div class="vx-logo" :style="horizontalMode">
    <div class="vx-logo__image">
      <img :src="logoUrl" />
    </div>
    <div class="vx-logo__title">
      <span :style="horizontalMode">{{ vxTitle }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "./Logo.scss";
.vx-logo__title {
  width: v-bind(menuWidth);
}
</style>
