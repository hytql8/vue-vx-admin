<script lang="ts" setup>
import { ref, onMounted, watch } from "vue"
import { useLocaleStore } from "@/store/modules/locale"
import { LocaleSwitch } from "@/components/LocaleSwitch"
import { ThemeSwitch } from "@/components/ThemeSwitch"
import type { TabsPaneContext } from "element-plus"
import LoginForm from "./components/LoginForm.vue"
import { reload } from "@/utils"
import { Qrcode } from "@/components/Qrcode"

const activeName = ref("login")

const handleClick = (tab: TabsPaneContext) => {
  console.log("tab切换监听：", tab.index)
}

const locale = useLocaleStore()
const vxTitle = import.meta.env.VITE_APP_TITLE
const isAnimate = ref(false)
const logoUrl = new URL("@/assets/imgs/VxLogo.png", import.meta.url).href

watch(
  () => locale.getCurrentLocale,
  val => {
    console.log(val)
    reload()
  },
  {
    deep: true
  }
)

onMounted(() => {
  isAnimate.value = true
})
</script>
<template>
  <div class="vx-login">
    <ElContainer>
      <ElHeader>
        <ElRow :gutter="24">
          <ElCol :span="16"><div class="grid-content ep-bg-purple" /></ElCol>
          <ElCol :span="8">
            <div class="vx-login__avatar">
              <LocaleSwitch />
              <ThemeSwitch />
            </div>
          </ElCol>
        </ElRow>
      </ElHeader>
      <ElMain class="vx-login__main">
        <div class="loginBox">
          <div class="loginBox__title">
            <img :src="logoUrl" />
            <span>{{ vxTitle }}</span>
          </div>
          <div class="loginBox__desp">一款基于Typescript + vue3 + vite + vueuse的后台管理系统框架</div>
          <div class="loginBox__container">
            <ElTabs class="loginBox__tabs" v-model="activeName" @tab-click="handleClick">
              <ElTabPane label="登录" name="login"><LoginForm /></ElTabPane>
              <ElTabPane label="二维码登录" name="qr-login">
                <div class="qrcode-login">
                  <Qrcode value="http://hytql8.top" />
                </div>
              </ElTabPane>
            </ElTabs>
          </div>
        </div>
      </ElMain>
    </ElContainer>
  </div>
</template>
<style lang="scss">
@import "./Login.scss";
</style>
