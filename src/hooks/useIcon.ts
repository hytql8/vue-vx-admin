import { h } from "vue"
import type { VNode } from "vue"
import { VxIcon } from "@/components/VxIcon"
import type { IconTypes } from "@/components/VxIcon/src/types"

export const useIcon = (props: IconTypes): VNode => {
  return h(VxIcon, props)
}
