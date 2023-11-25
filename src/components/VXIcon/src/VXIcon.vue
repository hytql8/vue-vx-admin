<script lang="ts">
import { h, defineComponent, PropType, computed } from "vue"
import { Icon } from "@iconify/vue"

export default defineComponent({
  name: "VXIcon",
  components: { Icon },
  props: {
    icon: {
      type: String as PropType<string>,
      default: ""
    },
    color: {
      type: String as PropType<string>
    },
    size: {
      type: Number as PropType<number>,
      default: 16
    },
    hoverColor: {
      type: String as PropType<string>
    }
  },
  setup(props) {
    const refHoverColor = computed(() => props.hoverColor)
    return { hc: refHoverColor }
  },
  render() {
    return h(Icon, { icon: this.icon, color: this.color, size: this.size })
  }
})
</script>
<style lang="scss">
.iconify {
  &:hover {
    color: v-bind(hc) !important;
  }
}
</style>
