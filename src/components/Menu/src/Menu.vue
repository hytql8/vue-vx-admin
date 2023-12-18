<script lang="ts" setup>
import { computed } from "vue"
import { useAppStore } from "@/store/modules/app"
import { useLocale } from "@/hooks/useLocale"
import { staticRouter } from "@/router"
import { createMenuRoutes } from "@/utils/routerUtils"
import { ElSubMenu } from "element-plus"

const { t } = useLocale()

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
    <div v-for="v in routes" :key="v.path">
      <ElSubMenu v-if="v?.children?.length" :index="String(v.name)">
        <template #title>
          <span>{{ v.name }}</span>
        </template>
        <div v-for="m in v.children" :key="m.path">
          <ElSubMenu v-if="m?.children?.length" :index="String(m.name)">
            <template #title>
              <span>{{ m.name }}</span>
            </template>
            <!-- <ElMenuItem :index="String(m.name)">
              {{ m.name }}
            </ElMenuItem> -->
            <div v-for="n in m.children">
              <ElMenuItem :index="String(n.name)">{{ n.name }}</ElMenuItem>
            </div>
          </ElSubMenu>
          <ElMenuItem v-else :index="String(m.name)">{{ m.name }}</ElMenuItem>
        </div>
      </ElSubMenu>
      <ElMenuItem v-else :index="String(v.name)">{{ v.name }}</ElMenuItem>
    </div>
  </ElMenu>
</template>
<style lang="scss" scoped>
@import "./Menu.scss";
</style>
