<script lang="ts" setup>
import { ref, onMounted, computed, unref } from "vue"
import { useDebounceFn } from "@vueuse/core"
import { RouteRecordRaw, useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { getUseTableList } from "@/api/user"
import { useAppStore } from "@/store/modules/app"
import { useRoutersStore } from "@/store/modules/router"
import { staticRouter } from "@/router"
import { omit } from "lodash-es"

const { push } = useRouter()
const appSotre = useAppStore()
const routersStore = useRoutersStore()

const routerMode = computed(() => appSotre.getRouterMode)

const isAnimate = ref(false)

const username = ref("")
const password = ref("")

const Login = useDebounceFn(async () => {
  const loginRes = await getUseTableList({
    username: unref(username) || "test",
    password: unref(password) || "test"
  })
  let user = omit(loginRes.data.data, "routers")
  // 存储user信息
  routersStore.setUser(user)
  // 写入router
  routersStore.setRouters(
    unref(routerMode) === "static" ? staticRouter : (loginRes.data.data.routers as RouteRecordRaw[]),
    unref(routerMode)
  )
  if (loginRes.data.code === 200) {
    // push({
    //   name: "Welcome"
    // })
  }
}, 300)

onMounted(() => {
  isAnimate.value = true
})
</script>
<template>
  <div class="vx-login">
    <div class="vx-login__left" v-if="false">
      <Transition
        enter-active-class="animate__animated animate__bounceInLeft"
        leave-active-class="animate__animated animate__bounceInLeft"
      >
        <img v-if="isAnimate" src="@/assets/svgs/login-banner.svg" alt="" />
      </Transition>
    </div>
    <div class="vx-login__right">
      <div class="vx-login__right__login-box">
        <ElInput aria-placeholder="132" v-model="username" />
        <ElInput aria-placeholder="132" v-model="password" />
        <ElButton @click="Login">登录</ElButton>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "./Login.scss";
</style>
