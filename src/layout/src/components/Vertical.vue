<script setup lang="tsx">
import { computed, unref, ref } from "vue"
import { Menu } from "@/components/Menu"
import { Logo } from "@/components/Logo"
import { ThemeSwitch } from "@/components/ThemeSwitch"
import { Avatar } from "@/components/Avatar"
import { LocaleSwitch } from "@/components/LocaleSwitch"
import { TagsView } from "@/components/TagsView"
import { Fullscreen } from "@/components/Fullscreen"
import { Breadcrumb } from "@/components/Breadcrumb"
import { useAppStore } from "@/store/modules/app"
import { VxIcon } from "@/components/VxIcon"
import { ElContainer, ElHeader, ElScrollbar, ElMain, ElAside } from "element-plus"
import { SearchMenus } from "@/components/SearchMenus"
import { type RouteLocationNormalizedLoaded } from "vue-router"

const appStore = useAppStore()

const isFold = computed(() => appStore.getIsFold)
const layout = computed(() => appStore.getLayout)
const isShowFolding = computed(() => appStore.getIsShowFolding)
const isBreadcrumb = computed(() => appStore.getIsBreadcrumb)

const isSeemMoblie = computed(() => appStore.getIsSeemMoblie)

const menuWidth = computed(() => (unref(isFold) ? "55px" : "200px"))

const MenuSwitch = () => {
  const jsxDom = unref(isFold) ? (
    <VxIcon icon="ant-design:menu-fold-outlined" style="transform: rotate(180deg)" size={20} />
  ) : (
    <VxIcon icon="ant-design:menu-fold-outlined" size={20} />
  )
  return jsxDom
}
const isHandleClick = ref(false)

const toggleExpand = () => {
  if (unref(isSeemMoblie)) {
    isHandleClick.value = !unref(isHandleClick)
    appStore.setIsFold(!unref(isHandleClick))
  } else {
    appStore.setIsFold(!unref(isFold))
  }
}

const getCache = (route: RouteLocationNormalizedLoaded) => {
  const { meta } = route
  if (meta && meta.keepAlive) {
    return route.name as any
  }
  return null
}
</script>

<template>
  <ElContainer class="vx-container">
    <ElAside class="vx-aside" v-show="!isSeemMoblie || isHandleClick">
      <Logo class="vx-header__logo" v-show="!isSeemMoblie || isHandleClick" />
      <Menu class="vx-aside__menu" />
    </ElAside>
    <ElContainer class="vx-content">
      <ElHeader class="vx-header">
        <div class="vx-header__nav">
          <div class="vx-header__menu-switch">
            <MenuSwitch @click="toggleExpand" v-show="layout === 'vertical' && isShowFolding" /><Breadcrumb
              v-show="!isSeemMoblie && isBreadcrumb"
            />
          </div>
          <div class="vx-header__info">
            <SearchMenus /><ThemeSwitch /> <Fullscreen v-show="!isSeemMoblie" /> <LocaleSwitch /> <Avatar />
          </div>
        </div>
      </ElHeader>
      <ElMain class="vx-main">
        <TagsView />
        <ElScrollbar class="vx-main__container">
          <RouterView #default="{ Component, route }">
            <Transition name="container" mode="out-in">
              <KeepAlive :include="getCache(route)">
                <component :is="Component" :key="route.fullPath" />
              </KeepAlive>
            </Transition>
          </RouterView>
        </ElScrollbar>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style lang="scss" scoped>
@use "./Vertical.scss";
.vx-aside {
  width: v-bind(menuWidth);
}
</style>
