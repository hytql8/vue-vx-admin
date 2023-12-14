<script lang="ts" setup>
import { unref, computed } from "vue"
import { useFullscreen } from "@vueuse/core"
import { VxIcon } from "@/components/VxIcon"

defineOptions({
    name: "VxFullscreen"
})

const { isFullscreen, enter, exit, toggle } = useFullscreen()

// const fullscreenIcon = isFullscreen ? 'bx:bxs-fullscreen'

</script>
<template>
<div class="vx-fullscreen">
    <VxIcon class="vx-fullscreen__icon" :icon="isFullscreen ? 'ic:baseline-fullscreen-exit' : 'ic:baseline-fullscreen'" color="var(--theme-text-color)" :size="24" @click="toggle" />
</div>
</template>

<style lang="scss" scoped>
@import "./Fullscreen.scss"
</style>