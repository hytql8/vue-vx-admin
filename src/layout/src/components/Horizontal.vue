<script setup lang="ts">
import { Menu } from "@/components/Menu"
import { Logo } from "@/components/Logo"
import { ThemeSwitch } from "@/components/ThemeSwitch"
</script>

<template>
  <ElContainer class="vx-container">
    <ElHeader class="vx-header">
      <Logo class="vx-header__logo" />
      <div class="vx-header__nav">
        <ThemeSwitch />
      </div>
    </ElHeader>
    <ElContainer class="vx-content">
      <ElAside class="vx-aside">
        <Menu class="vx-aside__menu" />
      </ElAside>
      <ElMain class="vx-content__main">Main</ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style lang="scss" scoped>
@use "./Horizontal.scss";
</style>
