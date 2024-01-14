import { h } from "vue"
import type { VNode } from "vue"
import { VxIcon, IconTypes } from "@/components/VxIcon"

export const useIcon = (props: IconTypes): VNode => {
  return h(VxIcon, props)
}
