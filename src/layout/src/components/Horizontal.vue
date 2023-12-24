<script setup lang="tsx">
import { computed, unref } from "vue"
import { Menu } from "@/components/Menu"
// import { VxContainer } from "@/components/VxContainer"
import { Logo } from "@/components/Logo"
import { ThemeSwitch } from "@/components/ThemeSwitch"
import { Avatar } from "@/components/Avatar"
import { LocaleSwitch } from "@/components/LocaleSwitch"
import { Fullscreen } from "@/components/Fullscreen"
import { useAppStore } from "@/store/modules/app"
import { VxIcon } from "@/components/VxIcon"
import { ElContainer } from "element-plus"

const appStore = useAppStore()

const isFold = computed(() => appStore.getIsFold)

const menuWidth = computed(() => (unref(isFold) ? "55px" : "200px"))

const MenuSwitch = () => {
  const jsxDom = unref(isFold) ? (
    <VxIcon icon="ant-design:menu-fold-outlined" style="transform: rotate(180deg)" size={20} />
  ) : (
    <VxIcon icon="ant-design:menu-fold-outlined" size={20} />
  )
  return jsxDom
}

const toggleExpand = () => {
  appStore.setIsFold(!unref(isFold))
}
</script>

<template>
  <ElContainer class="vx-container">
    <ElHeader class="vx-header">
      <Logo class="vx-header__logo" />
      <div class="vx-header__nav">
        <div class="vx-header__menu-switch"><MenuSwitch @click="toggleExpand" /></div>
        <div class="vx-header__info"><ThemeSwitch /> <Fullscreen /> <LocaleSwitch /> <Avatar /></div>
      </div>
    </ElHeader>
    <ElContainer class="vx-content">
      <ElAside class="vx-aside">
        <Menu class="vx-aside__menu" />
      </ElAside>
      <ElMain class="vx-main">
        <TagsView />
        <div class="vx-main__container">
          <RouterView></RouterView>
        </div>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style lang="scss" scoped>
@use "./Horizontal.scss";
.vx-aside {
  width: v-bind(menuWidth);
}
</style>
