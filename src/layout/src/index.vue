<script lang="tsx" setup>
import { ref, unref, watch, computed } from "vue"
import { Horizontal, Vertical } from "./components"
import { useAppStore } from "@/store/modules/app"
import { setCssVar } from "@/utils"
import { VxIcon } from "@/components/VxIcon"
import { ThemeSwitch } from "@/components/ThemeSwitch"

const appStore = useAppStore()

watch(
  () => appStore.getIsDark,
  val => {
    if (val) {
      setCssVar("--theme-bg-color", "#1b1b1f")
    } else {
      setCssVar("--theme-bg-color", "#f5f7f9")
    }
  },
  {
    immediate: true
  }
)

defineOptions({
  name: "Layout"
})

const getLayout = computed(() => {
  appStore.setIsGroup(appStore.getLayout === "group")
  return appStore.getLayout
}) // vertical / group
const RenderMenus = () => {
  const jsxDom =
    unref(getLayout) === "vertical" || unref(getLayout) === "group" ? (
      <div class="layout-vertical">
        <Vertical />
      </div>
    ) : (
      <div>
        <Horizontal />
      </div>
    )

  return jsxDom
}

const Setting = () => {
  return (
    <div class="vx-setting">
      <VxIcon icon="line-md:cog-loop" size={18} color="#fff" hover-color="#fff" />
    </div>
  )
}

const settingVisible = ref(false)

const openSetting = () => {
  settingVisible.value = !unref(settingVisible)
}

const togglePosition = (layout: LayoutType) => {
  console.log(layout, "layout")
  appStore.setLayout(layout)
  appStore.setIsFold(false)
}

const color = ref("#3a6ee8")

const colorsList = ["#409eff", "#009688", "#536dfe", "#ff5c93", "#ee4f12", "#0096c7", "#9c27b0", "#ff9800"]

const toggleThemeColor = (color: string) => {
  setCssVar("--theme-color", color)
  setCssVar("--el-color-primary", color)
  appStore.setTheme(Object.assign(appStore.getTheme, { elColorPrimary: color, themeColor: color }))
}

// 颜色选择
const colorPicker = (color: string) => {
  toggleThemeColor(color)
}

// 面包屑
const bindBread = ref(appStore.getIsBreadcrumb)
watch(
  () => unref(bindBread),
  (val: boolean) => appStore.setIsBreadcrumb(val)
)
// 折叠菜单开关
const bindFold = ref(appStore.getIsShowFolding)
watch(
  () => unref(bindFold),
  (val: boolean) => appStore.setIsShowFolding(val)
)
// 哀悼模式
const bindMourn = ref(appStore.getIsMourning)
// 样式
const mournStyle = ref("")
watch(
  () => unref(bindMourn),
  (val: boolean) => {
    if (val) {
      mournStyle.value = "grayscale(100%)"
    } else {
      mournStyle.value = ""
    }
    appStore.setIsMourning(val)
  },
  {
    immediate: true
  }
)

// 色弱模式
const bindColorWeakness = ref(appStore.getIsColorWeakness)
watch(
  () => unref(bindColorWeakness),
  (val: boolean) => {
    if (val) {
      mournStyle.value = "invert(80%)"
    } else {
      mournStyle.value = ""
    }
    appStore.setIsColorWeakness(val)
  }
)
</script>
<template>
  <div class="layout">
    <RenderMenus /><Setting @click="openSetting" class="layout-setting" />
    <ElDrawer size="350px" v-model="settingVisible" title="项目配置" :with-header="true">
      <ElDivider content-position="center">系统主题</ElDivider>
      <div class="layout-inset__switch"><ThemeSwitch /></div>
      <ElDivider content-position="center">页面布局</ElDivider>
      <div class="layout-inset__position">
        <div :class="getLayout === 'vertical' ? 'normal-mode mode-active' : 'normal-mode'" @click="togglePosition('vertical')">
          <div class="normal-left">
            <div class="normal-left-t"></div>
            <div class="normal-left-b"></div>
          </div>
          <div class="normal-right">
            <div class="normal-right-t"></div>
            <div class="normal-right-b"></div>
          </div>
        </div>
        <div :class="getLayout === 'group' ? 'group-mode mode-active' : 'group-mode'" @click="togglePosition('group')">
          <div class="group-left">
            <div class="group-left-t"></div>
            <div class="group-left-b">
              <div class="group-left-b-i"></div>
              <div class="group-left-b-y"></div>
            </div>
          </div>
          <div class="group-right">
            <div class="group-right-t"></div>
            <div class="group-right-b"></div>
          </div>
        </div>
        <div :class="getLayout === 'horizontal' ? 'top-mode mode-active' : 'top-mode'" @click="togglePosition('horizontal')">
          <div class="top-left">
            <div class="top-left-t"></div>
            <div class="top-left-b"></div>
          </div>
          <div class="top-right">
            <div class="top-right-t"></div>
            <div class="top-right-b"></div>
          </div>
        </div>
      </div>
      <ElDivider content-position="center">配置主题色</ElDivider>
      <div class="layout-inset__theme">
        <div v-for="v in colorsList" :key="v" class="color-box" :style="`background: ${v};`" @click="toggleThemeColor(v)"></div>
        <ElColorPicker v-model="color" @change="colorPicker" show-alpha />
      </div>
      <ElDivider content-position="center">页面配置</ElDivider>
      <div class="layout-inset__config">
        <div class="config-inset"><span>面包屑</span><ElSwitch v-model="bindBread" /></div>
      </div>
      <div class="layout-inset__config">
        <div class="config-inset"><span>折叠菜单</span><ElSwitch v-model="bindFold" /></div>
      </div>
      <div class="layout-inset__config">
        <div class="config-inset"><span>哀悼模式</span><ElSwitch v-model="bindMourn" /></div>
      </div>
      <div class="layout-inset__config">
        <div class="config-inset"><span>色弱模式</span><ElSwitch v-model="bindColorWeakness" /></div>
      </div>
    </ElDrawer>
  </div>
</template>

<style lang="scss" scoped>
@use "./index.scss";
.layout {
  filter: v-bind(mournStyle);
  transition: all 0.3s;
}
</style>
