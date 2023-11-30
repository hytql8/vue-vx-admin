<script setup lang="ts">
import { ThemeSwitch } from "@/components/ThemeSwitch"
import { LocaleSwitch } from "@/components/LocaleSwitch"
</script>

<template>
  <ThemeSwitch />
  <LocaleSwitch />
  <ElCard>这是一个卡片</ElCard>
  <ElButton type="primary">123</ElButton>
  <ElLink type="primary">123</ElLink>
  <ElButton type="danger">123</ElButton>
</template>

<style lang="scss" scoped></style>
