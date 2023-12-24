<script lang="ts" setup>
import { computed } from "vue"
import { useAppStore } from "@/store/modules/app"
import { staticRouter } from "@/router"
import { createMenuRoutes } from "@/utils/routerUtils"
import RenderVertical from "./components/RenderVertical.vue"

const appStore = useAppStore()

const isFold = computed(() => appStore.getIsFold)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const routes = createMenuRoutes(staticRouter)
console.log(routes, "===========")
</script>

<template>
  <ElMenu
    class="vx-menu"
    active-text-color="var(--left-menu-text-active-color)"
    background-color="var(--left-menu-bg-color)"
    default-active="1"
    :collapse="isFold"
    text-color="var(--left-menu-text-color)"
    @open="handleOpen"
    @close="handleClose"
  >
    <!-- <template v-for="v in routes" :key="v.name">
      <ElSubMenu v-if="v?.children?.length" :index="String(v.name)">
        <template #title>
          <span>{{ t(v.meta.title) }}</span>
        </template>
        <template v-for="m in v.children" :key="m.name">
          <ElSubMenu v-if="m?.children?.length" :index="String(m.name)">
            <template #title>
              <span>{{ t(m.meta.title) }}</span>
            </template>
            <template v-for="n in m.children" :key="n.name">
              <ElMenuItem :index="String(n.name)">{{ t(n.meta.title) }}</ElMenuItem>
            </template>
          </ElSubMenu>
          <ElMenuItem v-else :index="String(m.name)">{{ t(m.meta.title) }}</ElMenuItem>
        </template>
      </ElSubMenu>
      <ElMenuItem v-else :index="String(v.name)">{{ t(v.meta.title) }}</ElMenuItem>
    </template> -->
    <!-- <template v-for="route in routes" :key="route.name">
      <RenderVertical :route="route" />
    </template> -->
    <RenderVertical :routes="routes" />
  </ElMenu>
</template>
<style lang="scss" scoped>
@import "./Menu.scss";
</style>
