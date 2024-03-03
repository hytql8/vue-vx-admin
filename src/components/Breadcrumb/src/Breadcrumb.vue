<script lang="ts" setup>
import { ref, unref, watch } from "vue"
import { useRouter, RouteRecordRaw, RouteRecordName, useRoute } from "vue-router"
import { staticRouter } from "@/router"
import { useI18n } from "vue-i18n"

defineOptions({
  name: "Breadcrumb"
})

const { currentRoute } = useRouter()
const { t } = useI18n()
const route = useRoute()

const breadcrumbList = ref<RouteRecordRaw[]>([])
// 寻找跟name有关系的路由
/**
 *
 * @param routes 整个路由对象
 * @param name 当前需要查找的name对象
 */
const findRelatedRouters = (routes: RouteRecordRaw[], name: RouteRecordName): RouteRecordRaw[] => {
  const res = [] as RouteRecordRaw[]
  for (const v of routes) {
    res.push(v)
    if (v.name === name) {
      return res
    } else if (v.children?.length) {
      const res2 = findRelatedRouters(v.children, name)
      if (res2) {
        res.push(...res2)
        return res
      } else {
        res.pop()
      }
    } else {
      res.pop()
    }
  }
}
const createBreadList = (name: RouteRecordName = route.name) => {
  const result = findRelatedRouters(staticRouter, name)
  breadcrumbList.value = result
}

const breadPathResolve = (bread: RouteRecordRaw) => {
  return bread.children?.length
    ? bread.children[0]?.children?.length
      ? bread.path + "/" + bread.children[0].path + "/" + bread.children[0].children[0].path
      : bread.children[0].path
    : bread.path
}
watch(
  () => unref(currentRoute),
  val => {
    createBreadList(val.name)
  },
  {
    immediate: true
  }
)
</script>
<template>
  <ElBreadcrumb separator="/" class="vx-breadcrumb">
    <TransitionGroup enter-active-class="animate__animated animate__fadeInRight">
      <ElBreadcrumbItem
        v-for="bread in breadcrumbList"
        :key="bread.name"
        :to="{
          path: breadPathResolve(bread)
        }"
      >
        {{ t(bread?.meta?.title) }}
      </ElBreadcrumbItem>
    </TransitionGroup>
  </ElBreadcrumb>
</template>
<style lang="scss" scoped>
@import "./Breadcrumb.scss";
</style>
