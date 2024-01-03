<template>
  <template v-for="v in routes" :key="v.name">
    <ElSubMenu v-if="v?.children?.length && !v.meta.hidden" :index="String(v.name)">
      <template #title>
        <VxIcon v-if="v.meta.icon" :icon="v.meta.icon" :size="16" />
        <span class="span-ml">{{ t(v.meta.title) }}</span>
      </template>
      <template v-for="m in v.children" :key="m.name">
        <ElSubMenu v-if="m?.children?.length && !m.meta.hidden" :index="String(m.name)">
          <template #title>
            <VxIcon v-if="m.meta.icon" :icon="m.meta.icon" :size="16" />
            <span class="span-ml">{{ t(m.meta.title) }}</span>
          </template>
          <template v-for="n in m.children" :key="n.name">
            <!-- 三级路由子项(仅允许最多存在三级路由,超出部分会降级) -->
            <ElMenuItem v-if="!n.meta.hidden" :index="String(n.name)" @click="routingJump(v.path, m.path, n.path)">
              <VxIcon v-if="n.meta.icon" :icon="n.meta.icon" :size="16" />
              <span class="span-ml">{{ t(n.meta.title) }}</span>
            </ElMenuItem>
          </template>
        </ElSubMenu>
        <!-- 二级路由子项 -->
        <ElMenuItem v-if="!m?.children?.length && !m.meta.hidden" :index="String(m.name)" @click="routingJump(v.path, m.path)">
          <VxIcon v-if="m.meta.icon" :icon="m.meta.icon" :size="16" />
          <span class="span-ml">{{ t(m.meta.title) }}</span>
        </ElMenuItem>
      </template>
    </ElSubMenu>
    <!-- 一级路由子项 -->
    <ElMenuItem v-if="!v?.children?.length && !v.meta.hidden" :index="String(v.name)" @click="routingJump(v.path)">
      <VxIcon v-if="v.meta.icon" :icon="v.meta.icon" :size="16" />
      <span class="span-ml">{{ t(v.meta.title) }}</span>
    </ElMenuItem>
  </template>
</template>
<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router"
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { VxIcon } from "@/components/VXIcon"
import { useTagsStore } from "@/store/modules/tags"

const { push, getRoutes } = useRouter()

const staticRouter = getRoutes()

const tagsView = useTagsStore()

const { t } = useI18n()

defineOptions({
  name: "RenderVertical"
})

const props = defineProps<{
  routes: RouteRecordRaw[]
}>()

const routes = computed(() => props.routes)

const routingJump = (...args: string[]) => {
  console.log(findRoute(args))
  tagsView.addTags(findRoute(args))
  const path = args.join("/")
  push({
    path
  })
}

// 组装tagsView信息
const findRoute = (args: string[]): RouteRecordRaw => {
  return staticRouter.filter((v: RouteRecordRaw) => v.path.includes(args[args.length - 1]))[0]
}
</script>
<style lang="scss" scoped>
@import "./RenderVertical.scss";
</style>
