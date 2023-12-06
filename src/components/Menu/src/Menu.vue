<script lang="ts" setup>
import { computed } from "vue"
import { useAppStore } from "@/store/modules/app"
import { useLocale } from "@/hooks/useLocale"

const { t } = useLocale()

const appStore = useAppStore()

const isFold = computed(() => appStore.getIsFold)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu
    class="vx-menu"
    active-text-color="var(--left-menu-text-active-color)"
    background-color="var(--left-menu-bg-color)"
    default-active="2"
    :collapse="isFold"
    text-color="var(--left-menu-text-color)"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <span>{{ t("layout.test") }}</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="1-1">{{ t("layout.test") }}</el-menu-item>
        <el-menu-item index="1-2">{{ t("layout.test") }}</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">{{ t("layout.test") }}</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>{{ t("layout.test") }}</template>
        <el-menu-item index="1-4-1">{{ t("layout.test") }}</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <span>{{ t("layout.test") }}</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <span>{{ t("layout.test") }}</span>
    </el-menu-item>
    <el-menu-item index="4">
      <span>{{ t("layout.test") }}</span>
    </el-menu-item>
  </el-menu>
</template>
<style lang="scss" scoped>
@import "./Menu.scss";
</style>
