<script lang="ts" setup>
import { computed, unref } from "vue"
import { useAppStore } from "@/store/modules/app"
import { staticRouter } from "@/router"
import { createMenuRoutes } from "@/utils/routerUtils"
import RenderVertical from "./components/RenderVertical.vue"
import { RouteRecordRaw, useRouter } from "vue-router"

const { currentRoute } = useRouter()
const appStore = useAppStore()

const isFold = computed(() => appStore.getIsFold)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const routes = createMenuRoutes(staticRouter as RouteRecordRaw[])
// 获取当前选中的路由
console.log(unref(currentRoute), `unref(currentRoute)`)
const activeMenu = computed(() => {
  const { name } = unref(currentRoute)
  return name as string
})
</script>

<template>
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
    <RenderVertical :routes="routes" />
  </ElMenu>
</template>
<style lang="scss" scoped>
@import "./Menu.scss";
</style>
