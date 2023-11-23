<script lang="tsx">
import { defineComponent, ref } from "vue"

export default defineComponent({
  components: {},
  props: {},
  emits: [],
  setup() {
    return ref("404")
  }
})
</script>
<template>
  <div>{{ 404 }}</div>
</template>
