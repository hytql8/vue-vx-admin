<script lang="ts" setup>
import { VxIcon } from "@/components/VxIcon"
import { ElDialog, ElInput, ElCard, ElScrollbar } from "element-plus"
import { ref, unref, watch, type Ref } from "vue"
import { useRouter, type RouteRecord } from "vue-router"
import { useI18n } from "@/hooks/useI18n"
import { type SearchMenusType } from "./types"
import { useLocaleStore } from "@/store/modules/locale"
import { tryOnMounted, useDebounceFn } from "@vueuse/core"

const dialogVisible = ref(false)
const query = ref("")

const localeStore = useLocaleStore()
const routers = useRouter()
const { t } = useI18n()

const menus = ref([]) as Ref<SearchMenusType[]>
const cacheMenus = ref([]) as Ref<SearchMenusType[]>

const searchMenu = useDebounceFn(() => {
  cacheMenus.value = unref(query) ? unref(menus).filter((v: SearchMenusType) => v.name.includes(unref(query))) : []
}, 300)

const createMenus = (): SearchMenusType[] | null => {
  console.log(routers.getRoutes())
  return routers.getRoutes()?.map((v: RouteRecord) => {
    return {
      path: v.path,
      name: v.meta.title ? t(v.meta.title) : "",
      icon: v.meta.icon ? v.meta.icon : ""
    }
  })
}

watch(
  () => localeStore.currentLocale,
  () => {
    menus.value = createMenus() ?? []
  },
  {
    deep: true
  }
)

tryOnMounted(() => {
  menus.value = createMenus() ?? []
})

// 拼装数据
const toogleSearch = () => {
  dialogVisible.value = !dialogVisible.value
}
</script>
<template>
  <div class="vx-search-menus">
    <VxIcon
      class="search-icon"
      icon="line-md:search"
      color="var(--theme-text-color)"
      :size="20"
      hover-color="var(--theme-text-color)"
      @click="toogleSearch"
    />
  </div>
  <ElDialog v-model="dialogVisible" width="500" center>
    <ElInput v-model="query" placeholder="输入菜单中文名，例如：工作台" @input="searchMenu">
      <template #prefix>
        <VxIcon
          class="search-icon"
          icon="line-md:search"
          color="var(--theme-text-color)"
          :size="20"
          hover-color="var(--theme-text-color)"
          @click="toogleSearch"
        />
      </template>
    </ElInput>
    <ElScrollbar height="300px">
      <div class="menus-list">
        <ElCard style="margin-top: 10px" v-for="v in cacheMenus" :key="v.path" shadow="hover">
          <div class="card-inside">
            <VxIcon
              v-if="v.icon"
              :icon="v.icon"
              color="var(--theme-text-color)"
              :size="20"
              hover-color="var(--theme-text-color)"
            ></VxIcon>
            <span> {{ v.name }}</span>
            <span> {{ v.path }}</span>
          </div>
        </ElCard>
      </div>
    </ElScrollbar>

    <template #footer>
      <div class="search-footer">
        <div class="keyboard-tips">
          <VxIcon icon="mdi:keyboard-return" color="var(--theme-text-color)" :size="20" hover-color="var(--theme-text-color)" />
          <span>选择</span>
        </div>
        <div class="keyboard-tips">
          <VxIcon
            icon="fluent:arrow-up-24-filled"
            color="var(--theme-text-color)"
            :size="18"
            hover-color="var(--theme-text-color)"
          />
          <VxIcon
            icon="fluent:arrow-down-24-filled"
            color="var(--theme-text-color)"
            :size="18"
            hover-color="var(--theme-text-color)"
          />
          <span>切换</span>
        </div>
        <div class="keyboard-tips">
          <VxIcon icon="mdi-keyboard-esc" color="var(--theme-text-color)" :size="20" hover-color="var(--theme-text-color)" />
          <span>关闭</span>
        </div>
      </div>
    </template>
  </ElDialog>
</template>
<style lang="scss" scoped>
@import "./SearchMenus.scss";
</style>
