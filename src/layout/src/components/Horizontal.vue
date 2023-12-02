<script setup lang="ts">
import { Menu } from "@/components/Menu"
import { Logo } from "@/components/Logo"
</script>

<template>
  <ElContainer>
    <ElHeader>
      <Logo />
    </ElHeader>
    <ElContainer>
      <ElAside width="200px">
        <Menu />
      </ElAside>
      <ElMain>Main</ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style lang="scss" scoped>
@use "./Horizontal.scss";
</style>
