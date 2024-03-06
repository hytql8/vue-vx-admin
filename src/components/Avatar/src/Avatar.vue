<script lang="ts" setup>
import { computed } from "vue"
import { VxIcon } from "@/components/VxIcon"
import { useI18n } from "vue-i18n"
import { useAppStore } from "@/store/modules/app"

const appStore = useAppStore()

const isFold = computed(() => appStore.getIsFold)
const isSeemMoblie = computed(() => appStore.getIsSeemMoblie)

defineOptions({
  name: "VxAvatar"
})

const { t } = useI18n()

// const url = getStaticSource("@/assets/imgs/Avatar.png")
const url = new URL("@/assets/imgs/Avatar.png", import.meta.url).href
</script>
<template>
  <div class="vx-avatar">
    <ElDropdown placement="bottom" trigger="click" class="el-dropdown-link">
      <div class="vx-dropdown">
        <span :class="isFold && isSeemMoblie ? 'vx-dropdown__username' : 'vx-dropdown__username--fold'">系统管理员</span>
        <ElAvatar :size="30" :src="url" />
      </div>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem>
            <VxIcon icon="ant-design:user-outlined" />
            <span class="vx-dropdown-item__text">{{ t("personalCenter.personalCenter") }}</span>
          </ElDropdownItem>
          <ElDropdownItem>
            <VxIcon icon="ant-design:unlock-outlined" />
            <span class="vx-dropdown-item__text">{{ t("personalCenter.changePassword") }}</span>
          </ElDropdownItem>
          <ElDropdownItem>
            <VxIcon icon="mdi:logout" />
            <span class="vx-dropdown-item__text">{{ t("personalCenter.loginOut") }}</span>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>
<style lang="scss" scoped>
@import "./Avatar.scss";
</style>
