<script lang="tsx" setup>
import { ref, unref } from "vue"
import { Horizontal, Vertical } from "./components"

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

<style lang="scss">
@import "./index.scss";
</style>
