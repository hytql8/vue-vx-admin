<script lang="ts" setup>
import { computed, unref, ref } from "vue"
import { useAppStore } from "@/store/modules/app"
import { staticRouter } from "@/router"
import { generateLowerRoutes, createMenuRoutes } from "@/utils/routerUtils"
import RenderVertical from "./components/RenderVertical.vue"
import { RouteRecordRaw, useRouter } from "vue-router"

const { currentRoute } = useRouter()
const appStore = useAppStore()

const isFold = computed(() => appStore.getIsFold)
const isGroup = computed(() => appStore.getIsGroup)

const handleOpen = (key: string, keyPath: string[]) => {}
const handleClose = (key: string, keyPath: string[]) => {}

const routes = generateLowerRoutes(createMenuRoutes(staticRouter as RouteRecordRaw[]))
// 获取当前选中的路由
const activeMenu = computed(() => {
  const { name } = unref(currentRoute)
  return name as string
})
</script>

<template>
  <ElScrollbar class="vx-scrollbar">
    <ElMenu
      class="vx-menu"
      active-text-color="var(--left-menu-text-active-color)"
      background-color="var(--left-menu-bg-color)"
      :default-active="activeMenu"
      :collapse="isFold"
      text-color="var(--left-menu-text-color)"
      @open="handleOpen"
      @close="handleClose"
    >
      <RenderVertical :routes="routes" :is-group="isGroup" />
    </ElMenu>
  </ElScrollbar>
</template>
<style lang="scss" scoped>
@import "./Menu.scss";
</style>
