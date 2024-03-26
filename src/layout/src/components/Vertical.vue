<script setup lang="tsx">
import { computed, unref, ref } from "vue"
import { Menu } from "@/components/Menu"
import { Logo } from "@/components/Logo"
import { ThemeSwitch } from "@/components/ThemeSwitch"
import { Avatar } from "@/components/Avatar"
import { LocaleSwitch } from "@/components/LocaleSwitch"
import { Fullscreen } from "@/components/Fullscreen"
import { Breadcrumb } from "@/components/Breadcrumb"
import { useAppStore } from "@/store/modules/app"
import { VxIcon } from "@/components/VxIcon"
import { ElContainer, ElHeader, ElScrollbar, ElMain, ElAside } from "element-plus"

const appStore = useAppStore()

const isFold = computed(() => appStore.getIsFold)
const layout = computed(() => appStore.getLayout)

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
</script>

<template>
  <ElContainer class="vx-container">
    <ElHeader class="vx-header">
      <Logo class="vx-header__logo" v-show="!isSeemMoblie || isHandleClick" />
      <div class="vx-header__nav">
        <div class="vx-header__menu-switch">
          <MenuSwitch @click="toggleExpand" v-show="layout === 'vertical'" /><Breadcrumb v-show="!isSeemMoblie" />
        </div>
        <div class="vx-header__info"><ThemeSwitch /> <Fullscreen v-show="!isSeemMoblie" /> <LocaleSwitch /> <Avatar /></div>
      </div>
    </ElHeader>
    <ElContainer class="vx-content">
      <ElAside class="vx-aside" v-show="!isSeemMoblie || isHandleClick">
        <Menu class="vx-aside__menu" />
      </ElAside>
      <ElMain class="vx-main">
        <TagsView />
        <ElScrollbar class="vx-main__container">
          <RouterView v-slot="{ Component }">
            <Transition name="container" mode="out-in">
              <component :is="Component" />
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
