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
            <ElMenuItem v-if="!n.meta.hidden" :index="String(n.name)">
              <VxIcon v-if="n.meta.icon" :icon="n.meta.icon" :size="16" />
              <span class="span-ml">{{ t(n.meta.title) }}</span>
            </ElMenuItem>
          </template>
        </ElSubMenu>
        <ElMenuItem v-if="!m?.children?.length && !m.meta.hidden" :index="String(m.name)" @click="goTo(m.name)">
          <VxIcon v-if="m.meta.icon" :icon="m.meta.icon" :size="16" />
          <span class="span-ml">{{ t(m.meta.title) }}</span>
        </ElMenuItem>
      </template>
    </ElSubMenu>
    <ElMenuItem v-if="!v?.children?.length && !v.meta.hidden" :index="String(v.name)">
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
import { VxIcon } from "@/components/VxIcon"

const { push } = useRouter()

const { t } = useI18n()
defineOptions({
  name: "RenderVertical"
})

const props = defineProps<{
  routes: RouteRecordRaw[]
}>()

const routes = computed(() => props.routes)

const goTo = name => {
  push({ name })
}
</script>
<style lang="scss" scoped>
@import "./RenderVertical.scss";
</style>
