<script lang="tsx" setup>
import { VxIcon } from "@/components/VxIcon"
</script>
<template>
  <div class="vx-tags">
    <div class="vx-tags-list-pre">
      <VxIcon icon="line-md:chevron-double-left" color="#8D9095" :size="16"></VxIcon>
    </div>
    <ElScrollbar class="vx-scrollbar">
      <div class="vx-tags-list">
        <div class="vx-tags-list__item vx-tags-list__item--normal">
          <div class="vx-tags-list__item--normal__left">
            <VxIcon icon="ep:guide" :size="14"></VxIcon>
            <span>导航</span>
          </div>
          <div class="vx-tags-list__item--normal__right">
            <VxIcon icon="ep:close" :size="14"></VxIcon>
          </div>
        </div>
        <div class="vx-tags-list__item vx-tags-list__item--current">
          <div class="vx-tags-list__item--current__left">
            <span>标签页</span>
          </div>
          <div class="vx-tags-list__item--current__right">
            <VxIcon icon="ep:close" :size="14" color="#fff"></VxIcon>
          </div>
        </div>
      </div>
    </ElScrollbar>
    <div class="vx-tags-list-pre">
      <VxIcon icon="line-md:chevron-double-right" color="#8D9095" :size="16"></VxIcon>
    </div>
    <div class="vx-tags-list-suf">
      <VxIcon icon="clarity:refresh-line" color="#8D9095" :size="14"></VxIcon>
    </div>
    <ElDropdown>
      <div class="vx-tags-list-suf">
        <VxIcon icon="uiw:setting-o" color="#8D9095" :size="14"></VxIcon>
      </div>
      <template #dropdown>
        <div>13</div>
      </template>
    </ElDropdown>
  </div>
</template>
<style lang="scss" scoped>
@import "./TagsView.scss";
</style>
