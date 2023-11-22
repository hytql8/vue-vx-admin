<script lang="tsx">
import { defineComponent, ref } from "vue"

export default defineComponent({
  components: {},
  props: {},
  emits: [],
  setup() {
    return ref("500")
  }
})
</script>
<template>
  <div>{{ 500 }}</div>
</template>
