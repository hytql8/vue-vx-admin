<script setup lang="ts">
import { unref, watch } from "vue"
import { useRouter } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import { useRoutersStore } from "@/store/modules/router"
import { createRouter } from "@/router/asyncRouterHelper"

defineOptions({
  name: "Redirect"
})

const routersStore = useRoutersStore()

const { currentRoute, replace, isReady } = useRouter()

const { params, query } = unref(currentRoute)
const { path, type } = params

const _path = Array.isArray(path) ? path.join("/") : path

watch(
  () => routersStore.getRouters,
  (val: RouteRecordRaw[]) => {
    if (type === "async") {
      createRouter(val)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

// 路由准备好就跳转，反之抛出err返回login
isReady()
  .then(() => {
    replace({
      path: "/" + _path,
      query
    })
  })
  .catch((err: any) => {
    console.warn(err)
    replace({
      path: "/login"
    })
  })
</script>

<template>
  <div />
</template>
