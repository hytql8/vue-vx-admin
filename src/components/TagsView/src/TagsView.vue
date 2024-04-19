<script lang="tsx" setup>
import { ref, computed, toRaw, unref, nextTick } from "vue"
import { VxIcon } from "@/components/VxIcon"
import { useTagsStore } from "@/store/modules/tags"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { tagsViewInit } from "@/components/TagsView"
import { reload } from "@/utils"
import { ElScrollbar, ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus"

const { t } = useI18n()
const { push, currentRoute } = useRouter()
const tagsStore = useTagsStore()

const tagsList = computed(() => tagsStore.getTagsList)

const currentIndex = computed(() => {
  let currentTag = tagsStore.getCurrentTag
  for (let [i, v] of unref(tagsList).entries()) {
    if (v?.path === currentTag?.path) {
      return i
    }
  }
  return -1
})

// 1 关闭左侧按钮启用， 2 关闭右侧按钮启用， 3 关闭其他tags按钮启用， 4 关闭所有按钮按钮启用
const isCloseLeftTagsVisable = () => {
  return unref(currentIndex) <= 0
}
const isCloseRightTagsVisable = () => {
  return unref(currentIndex) + 1 === unref(tagsList).length
}
const isCloseOtherTagsVisable = () => {
  return unref(currentIndex) === 0 && unref(tagsList).length === 1
}

const isCloseAllTagsVisible = () => {
  return unref(tagsList).length === 0 && unref(currentRoute)?.path === unref(tagsList)[0]?.path
}

const routingJump = (tags: TagsList) => {
  tagsStore.updateTagsByTags(toRaw(tags))
  push(tags?.path)
}

const delTags = (tags: TagsList) => {
  const path = tagsStore.delTagsByTags(toRaw(tags))
  push(path)
}

const closeTag = () => {
  const path = tagsStore.delCurrentTags()
  push(path)
}

const closeOtherTag = () => {
  tagsStore.delOtherTags()
}

const closeLeftTag = () => {
  tagsStore.delLeftTags()
}

const closeRightTag = () => {
  tagsStore.delRightTags()
}

const closeAllTag = () => {
  tagsStore.delAllTags()
  const path = tagsViewInit()
  if (path) {
    push(path)
  }
}

const refresh = () => {
  reload()
}

const scrollViewRef = ref<InstanceType<typeof ElScrollbar>>()
const scrollLeftNumber = ref(0)
// 默认滚动距离
const step = 250
// 实际left滚动距离
let left: number

const getScroll = ({ scrollLeft }) => {
  scrollLeftNumber.value = scrollLeft as number
}

const getScrollViewRef = async () => {
  await nextTick()
  return scrollViewRef
}

const scrollPre = async () => {
  const scrollbarRef = await getScrollViewRef()
  left = unref(scrollLeftNumber) - step < 0 ? 0 : unref(scrollLeftNumber) - step
  unref(scrollbarRef).scrollTo({ left, behavior: "smooth" })
}

const scrollNext = async () => {
  const scrollbarRef = await getScrollViewRef()
  left = unref(scrollLeftNumber) + step
  unref(scrollbarRef).scrollTo({ left, behavior: "smooth" })
}
</script>
<template>
  <div class="vx-tags">
    <div class="vx-tags-list-pre first-pre" @click="scrollPre">
      <VxIcon icon="line-md:chevron-double-left" color="#8D9095" :size="16"></VxIcon>
    </div>
    <ElScrollbar class="vx-scrollbar" ref="scrollViewRef" @scroll="getScroll">
      <div class="vx-tags-list">
        <div
          :class="`vx-tags-list__item vx-tags-list__item--${v.current ? 'current' : 'normal'}`"
          v-for="v in tagsList"
          :key="v?.path"
          @click="routingJump(v)"
        >
          <div :class="`vx-tags-list__item--${v.current ? 'current' : 'normal'}__left`">
            <VxIcon :icon="v.icon" :size="14"></VxIcon>
            <span>{{ t(v.title) }}</span>
          </div>
          <div :class="`vx-tags-list__item--${v.current ? 'current' : 'normal'}__right`">
            <VxIcon v-if="tagsList.length > 1" icon="ep:close" :size="14" @click.stop="delTags(v)"></VxIcon>
            <div class="seat"></div>
          </div>
        </div>
      </div>
    </ElScrollbar>
    <div class="vx-tags-list-pre" @click="scrollNext">
      <VxIcon icon="line-md:chevron-double-right" color="#8D9095" :size="16"></VxIcon>
    </div>
    <div class="vx-tags-list-suf" @click="refresh">
      <VxIcon icon="clarity:refresh-line" color="#8D9095" :size="14"></VxIcon>
    </div>
    <ElDropdown>
      <div class="vx-tags-list-suf">
        <VxIcon icon="uiw:setting-o" color="#8D9095" :size="14"></VxIcon>
      </div>
      <template #dropdown>
        <ElDropdownMenu>
          <!-- <ElDropdownItem @click="refresh">
            <VxIcon icon="solar:refresh-bold" :size="16" />
            <span class="dropItem__span">t('tagsOperations.reload')</span>
          </ElDropdownItem> -->
          <ElDropdownItem @click="closeTag" :disabled="isCloseOtherTagsVisable()">
            <VxIcon icon="line-md:close" :size="16" />
            <span class="dropItem__span">{{ t("tagsOperations.closeTag") }}</span>
          </ElDropdownItem>
          <ElDropdownItem @click="closeLeftTag" :disabled="isCloseLeftTagsVisable()">
            <VxIcon icon="line-md:arrow-close-left" :size="16" />
            <span class="dropItem__span">{{ t("tagsOperations.closeLeftTag") }}</span>
          </ElDropdownItem>
          <ElDropdownItem @click="closeRightTag" :disabled="isCloseRightTagsVisable()">
            <VxIcon icon="line-md:arrow-close-right" :size="16" />
            <span class="dropItem__span">{{ t("tagsOperations.closeRightTag") }}</span>
          </ElDropdownItem>
          <ElDropdownItem @click="closeOtherTag" :disabled="isCloseOtherTagsVisable()">
            <VxIcon icon="ant-design:tag-outlined" :size="16" />
            <span class="dropItem__span">{{ t("tagsOperations.closeOtherTag") }}</span>
          </ElDropdownItem>
          <ElDropdownItem @click="closeAllTag" :disabled="isCloseAllTagsVisible()">
            <VxIcon icon="ep:semi-select" :size="16" />
            <span class="dropItem__span">{{ t("tagsOperations.closeAllTag") }}</span>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>
<style lang="scss" scoped>
@import "./TagsView.scss";
</style>
