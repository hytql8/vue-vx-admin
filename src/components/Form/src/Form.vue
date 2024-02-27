<script lang="tsx">
import { defineComponent, PropType } from "vue"
import { ElForm, ElFormItem, ElInput } from "element-plus"
import type { ComponentSize, FormRules, FormItemProp } from "element-plus"

export default defineComponent({
  name: "VxForm",
  props: {
    // 生成Form的布局结构数组
    schema: {
      type: Array as PropType<any>,
      default: () => []
    },
    // 是否需要栅格布局
    isCol: {
      type: Boolean,
      default: true
    },
    // 表单数据对象
    model: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    // 是否自动设置placeholder
    autoSetPlaceholder: {
      type: Boolean,
      default: true
    },
    // 是否自定义内容
    isCustom: {
      type: Boolean,
      default: false
    },
    // 表单label宽度
    labelWidth: {
      type: [String, Number] as PropType<string | number>,
      default: "auto"
    },
    rules: {
      type: Object as PropType<FormRules>,
      default: () => ({})
    },
    labelPosition: {
      type: String as PropType<String & ("left" | "right" | "top")>,
      default: "right"
    },
    labelSuffix: {
      type: String,
      default: ""
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
    },
    requireAsteriskPosition: {
      type: String as PropType<String & ("left" | "right")>,
      default: "left"
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    inlineMessage: {
      type: Boolean,
      default: false
    },
    statusIcon: {
      type: Boolean,
      default: false
    },
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    size: {
      type: String as PropType<ComponentSize>,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    scrollToError: {
      type: Boolean,
      default: false
    },
    scrollToErrorOffset: {
      type: [Boolean, Object] as PropType<boolean | string>,
      default: undefined
    },
    onValidate: {
      type: Function as PropType<(prop: FormItemProp, isValid: boolean, message: string) => void>,
      default: () => undefined
    }
  },
  emits: ["register"],
  setup() {
    return () => (
      <ElForm>
        <ElFormItem label="title">
          <ElInput></ElInput>
        </ElFormItem>
      </ElForm>
    )
  }
})
</script>
