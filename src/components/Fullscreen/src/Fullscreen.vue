<script lang="ts" setup>
import { useFullscreen } from "@vueuse/core"
import { VxIcon } from "@/components/VxIcon"

defineOptions({
  name: "VxFullscreen"
})

const { isFullscreen, toggle } = useFullscreen()
</script>
<template>
  <div class="vx-fullscreen">
    <VxIcon
      class="vx-fullscreen__icon"
      :icon="isFullscreen ? 'ic:baseline-fullscreen-exit' : 'ic:baseline-fullscreen'"
      color="var(--theme-text-color)"
      :size="24"
      @click="toggle"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "./Fullscreen.scss";
</style>
