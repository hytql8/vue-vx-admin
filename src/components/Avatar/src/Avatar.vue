<script lang="ts" setup>
import { computed } from "vue"
import { VxIcon } from "@/components/VxIcon"
import { useI18n } from "vue-i18n"
import { useAppStore } from "@/store/modules/app"
import { useLocaleStore } from "@/store/modules/locale"
import { useRoutersStore } from "@/store/modules/router"
import { useTagsStore } from "@/store/modules/tags"

import { outLogin } from "@/api/user"
import { ElMessageBox, ElMessage } from "element-plus"
import { useStorage } from "@/hooks/useStorage"
import { reload } from "@/utils"

const appStore = useAppStore()
const localeStore = useLocaleStore()
const routersStore = useRoutersStore()
const tagsStore = useTagsStore()

const { clear } = useStorage("localStorage")

const isFold = computed(() => appStore.getIsFold)
const isSeemMoblie = computed(() => appStore.getIsSeemMoblie)

defineOptions({
  name: "VxAvatar"
})

const { t } = useI18n()

const url = new URL("@/assets/imgs/Avatar.png", import.meta.url).href
// 退出登录
const loginOut = () => {
  ElMessageBox.confirm(t("login.outDesp"), "Warning", {
    confirmButtonText: t("login.confirm"),
    cancelButtonText: t("login.cancel"),
    type: "warning"
  }).then(async () => {
    const {
      data: { code }
    } = await outLogin()
    console.log(code)
    if (code === 200) {
      // 清除本地user和路由缓存
      clear()
      // 清除状态管理
      appStore.$reset()
      localeStore.$reset()
      routersStore.$reset()
      tagsStore.$reset()
      ElMessage({
        type: "success",
        message: t("login.outSuccess")
      })
      reload()
    }
  })
}
</script>
<template>
  <div class="vx-avatar">
    <ElDropdown placement="bottom" trigger="click" class="el-dropdown-link">
      <div class="vx-dropdown">
        <!-- eslint-disable  -->
        <span :class="isSeemMoblie ? (isFold ? 'vx-dropdown__username' : 'vx-dropdown__username--fold') : 'vx-dropdown__username'"
          >系统管理员</span
        >
        <!-- eslint-enable  -->
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
            <span class="vx-dropdown-item__text" @click="loginOut">{{ t("personalCenter.loginOut") }}</span>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>
<style lang="scss" scoped>
@import "./Avatar.scss";
</style>
