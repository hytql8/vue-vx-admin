<script lang="tsx" setup>
import { ref, unref, watch } from "vue"
import { Horizontal, Vertical } from "./components"
import { useAppStore } from "@/store/modules/app"
import { setCssVar } from "@/utils"

const app = useAppStore()
setCssVar("--theme-bg-color", "#f5f7f9")

watch(
  () => app.getIsDark,
  val => {
    if (val) {
      setCssVar("--theme-bg-color", "#1b1b1f")
    } else {
      setCssVar("--theme-bg-color", "#f5f7f9")
    }
  }
)

defineOptions({
  name: "Layout"
})

const layout = ref("horizontal") // vertical
const renderMenus = () => {
  const jsxDom =
    unref(layout) === "horizontal" ? (
      <div>
        <Horizontal />
      </div>
    ) : (
      <div>
        <Vertical />
      </div>
    )

  return jsxDom
}
</script>
<template>
  <div class="layout"><renderMenus /></div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
