<script setup lang="tsx">
import { computed, unref, ref } from "vue"
import { Menu } from "@/components/Menu"
import { Logo } from "@/components/Logo"
import { ThemeSwitch } from "@/components/ThemeSwitch"
import { SearchMenus } from "@/components/SearchMenus"
import { Avatar } from "@/components/Avatar"
import { LocaleSwitch } from "@/components/LocaleSwitch"
import { Fullscreen } from "@/components/Fullscreen"
import { useAppStore } from "@/store/modules/app"
import { ElContainer, ElHeader, ElScrollbar, ElMain } from "element-plus"

const appStore = useAppStore()

const isFold = computed(() => appStore.getIsFold)

const isSeemMoblie = computed(() => appStore.getIsSeemMoblie)

const menuWidth = computed(() => (unref(isFold) ? "55px" : "200px"))

const isHandleClick = ref(false)
</script>

<template>
  <ElContainer class="vx-container">
    <ElHeader class="vx-header">
      <Logo class="vx-header__logo" v-show="!isSeemMoblie || isHandleClick" />
      <Menu class="vx-header__menu" />
      <div class="vx-header__domain">
        <SearchMenus />
        <ThemeSwitch />
        <Fullscreen v-show="!isSeemMoblie" />
        <LocaleSwitch />
        <Avatar />
      </div>
    </ElHeader>
    <ElContainer class="vx-content">
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
@use "./Horizontal.scss";
.vx-aside {
  width: v-bind(menuWidth);
}
</style>
