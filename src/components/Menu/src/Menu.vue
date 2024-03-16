<script lang="ts" setup>
import { computed, unref, ref, watch } from "vue"
import { useAppStore } from "@/store/modules/app"
import { generateLowerRoutes, createMenuRoutes } from "@/utils/routerUtils"
import RenderVertical from "./components/RenderVertical.vue"
import { useRouter } from "vue-router"
import { useRoutersStore } from "@/store/modules/router"

const { currentRoute } = useRouter()
const appStore = useAppStore()
const routersStore = useRoutersStore()

const isFold = computed(() => appStore.getIsFold)
const isGroup = computed(() => appStore.getIsGroup)
const layout = ref(appStore.getLayout)
// routersStore.getRouters 此方法过滤时已筛选过权限，此时直接获取就行
const menuRoutes = routersStore.getRouters

watch(
  () => appStore.getLayout,
  (val: LayoutType) => {
    layout.value = val
  }
)

watch(
  () => appStore.getIsSeemMoblie,
  (val: boolean) => {
    if (val) {
      layout.value = "vertical"
      appStore.setLayout("vertical")
    }
  }
)

const routes = generateLowerRoutes(createMenuRoutes(menuRoutes))
// 获取当前选中的路由
const activeMenu = computed(() => {
  const { path } = unref(currentRoute)
  return path as string
})
</script>

<template>
  <template v-if="layout === 'horizontal'">
    <ElMenu ellipsis class="vx-menu--horizontal" mode="horizontal" :default-active="activeMenu">
      <RenderVertical :routes="routes" />
    </ElMenu>
  </template>
  <ElScrollbar v-else class="vx-scrollbar">
    <ElMenu
      class="vx-menu"
      mode="vertical"
      active-text-color="var(--left-menu-text-active-color)"
      background-color="var(--left-menu-bg-color)"
      :default-active="activeMenu"
      :collapse="isFold"
      text-color="var(--left-menu-text-color)"
    >
      <RenderVertical :routes="routes" :is-group="isGroup" />
    </ElMenu>
  </ElScrollbar>
</template>
<style lang="scss" scoped>
@import "./Menu.scss";
</style>
