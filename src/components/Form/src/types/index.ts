import { ElForm, FormRules, ComponentSize } from "element-plus"

type ElFormPropsType = InstanceType<typeof ElForm> extends { $props: infer P } ? P : never

/**
 * @description Form的参数
 * @param model 表单数据对象
 * @param rules 表单验证规则
 * @param inline 行内表单模式
 * @param labelPosition  表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性
 * @param labelWidth 标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。
 * @param labelSuffix 表单域标签的后缀
 * @param hideRequiredAsterisk 是否隐藏必填字段标签旁边的红色星号。
 * @param requireAsteriskPosition 星号的位置。
 * @param showMessage 是否显示校验错误信息
 * @param inlineMessage 是否以行内形式展示校验信息
 * @param statusIcon 是否在输入框中显示校验结果反馈图标
 * @param validateOnRuleChange 是否在 rules 属性改变后立即触发一次验证
 * @param size 用于控制该表单内组件的尺寸
 * @param disabled 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性
 * @param scrollToError 当校验失败时，滚动到第一个错误表单项
 * @param scrollIntoViewOptions 当校验有失败结果时，滚动到第一个失败的表单项目 可通过 scrollIntoView 配置
 */
interface FormParameterTypes extends ElFormPropsType {
  model?: Recordable
  rules?: FormRules
  inline?: boolean
  labelPosition?: string & ("left" | "right" | "top")
  labelWidth?: string | number
  labelSuffix?: string
  hideRequiredAsterisk?: boolean
  requireAsteriskPosition?: string & ("left" | "right")
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  size?: ComponentSize
  disabled?: boolean
  scrollToError?: boolean
  scrollIntoViewOptions?: Recordable | boolean
}

export type { FormParameterTypes }
