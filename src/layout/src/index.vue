<script lang="tsx">
import { defineComponent, ref } from "vue"

export default defineComponent({
  components: {},
  props: {},
  emits: [],
  setup() {
    const layout = ref("这是layout")

    return layout
  }
})
</script>
<template>
  <div>{{ layout }}</div>
</template>
