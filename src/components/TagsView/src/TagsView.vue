<script lang="tsx" setup>
import { computed } from "vue"
import { VxIcon } from "@/components/VxIcon"
import { useTagsStore } from "@/store/modules/tags"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const tagsStore = useTagsStore()

const tagsList = computed(() => tagsStore.getTagsList)
</script>
<template>
  <div class="vx-tags">
    <div class="vx-tags-list-pre">
      <VxIcon icon="line-md:chevron-double-left" color="#8D9095" :size="16"></VxIcon>
    </div>
    <ElScrollbar class="vx-scrollbar">
      <div class="vx-tags-list">
        <div
          :class="`vx-tags-list__item vx-tags-list__item--${v.current ? 'current' : 'normal'}`"
          v-for="v in tagsList"
          :key="v.path"
        >
          <div :class="`vx-tags-list__item--${v.current ? 'current' : 'normal'}__left`">
            <VxIcon :icon="v.icon" :size="14"></VxIcon>
            <span>{{ t(v.title) }}</span>
          </div>
          <div :class="`vx-tags-list__item--${v.current ? 'current' : 'normal'}__right`">
            <VxIcon icon="ep:close" :size="14"></VxIcon>
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
        <!-- <div>13</div> -->
        <ElDropdownMenu>
          <ElDropdownItem>
            <VxIcon icon="solar:refresh-bold" :size="16" />
            <span class="dropItem__span">重新加载</span>
          </ElDropdownItem>
          <ElDropdownItem>
            <VxIcon icon="line-md:close" :size="16" />
            <span class="dropItem__span">关闭标签页</span>
          </ElDropdownItem>
          <ElDropdownItem>
            <VxIcon icon="line-md:arrow-close-left" :size="16" />
            <span class="dropItem__span">关闭左侧标签页</span>
          </ElDropdownItem>
          <ElDropdownItem>
            <VxIcon icon="line-md:arrow-close-right" :size="16" />
            <span class="dropItem__span">关闭右侧标签页</span>
          </ElDropdownItem>
          <ElDropdownItem>
            <VxIcon icon="ant-design:tag-outlined" :size="16" />
            <span class="dropItem__span">关闭其他标签页</span>
          </ElDropdownItem>
          <ElDropdownItem>
            <VxIcon icon="ep:semi-select" :size="16" />
            <span class="dropItem__span">关闭全部标签页</span>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>
<style lang="scss" scoped>
@import "./TagsView.scss";
</style>
