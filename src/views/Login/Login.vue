<script lang="ts" setup>
import { ref, onMounted, computed, unref } from "vue"
import axios from "axios"
import { useDebounceFn } from "@vueuse/core"
import { RouteRecordRaw, useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { getUseTableList } from "@/api/user"
import { useAppStore } from "@/store/modules/app"
import { useRoutersStore } from "@/store/modules/router"
import { staticRouter } from "@/router"

const { push } = useRouter()
const appSotre = useAppStore()
const routersStore = useRoutersStore()

const routerMode = computed(() => appSotre.getRouterMode)

const isAnimate = ref(false)

const Login = useDebounceFn(async () => {
  const loginRes = await getUseTableList({
    username: "admin",
    password: "admin"
  })
  routersStore.setRouters(
    unref(routerMode) === "static" ? staticRouter : (loginRes.data.data.routers as RouteRecordRaw[]),
    unref(routerMode)
  )
  // axios({
  //   method: "post",
  //   url: "/user/login",
  //   data: {
  //     username: "admin",
  //     password: "admin"
  //   }
  // }).then(res => {
  //   if (res.data.data.code === 200) {
  //     console.log(res, "loginRes====")

  //     push({
  //       name: "Welcome"
  //     })
  //   } else {
  //     ElMessage.error("账号或者密码输入错误")
  //   }
  // })
}, 300)

onMounted(() => {
  isAnimate.value = true
})
</script>
<template>
  <div class="vx-login">
    <div class="vx-login__left">
      <Transition
        enter-active-class="animate__animated animate__bounceInLeft"
        leave-active-class="animate__animated animate__bounceInLeft"
      >
        <img v-if="isAnimate" src="@/assets/svgs/login-banner.svg" alt="" />
      </Transition>
    </div>
    <div class="vx-login__right">
      <div class="vx-login__right__login-box">
        <ElInput aria-placeholder="132" value="admin" />
        <ElInput aria-placeholder="132" value="admin" />
        <ElButton @click="Login">登录</ElButton>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "./Login.scss";
</style>
