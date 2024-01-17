import type { App, Component } from "vue"

import {
  // 表格功能
  // Filter,
  // Edit,
  // Menu,
  // Export,
  // Keyboard,
  // Validator,

  // 可选组件
  Icon,
  Column,
  // Colgroup,
  // Grid,
  // Tooltip,
  // Toolbar,
  // Pager,
  // Form,
  // FormItem,
  // FormGather,
  // Checkbox,
  // CheckboxGroup,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Switch,
  // Input,
  // Select,
  // Optgroup,
  // Option,
  // Textarea,
  // Button,
  // Modal,
  // List,
  // Pulldown,

  // 表格
  Table
} from "vxe-table"

// 需要全局引入的组件
const components = [Icon, Column, Table]

export function setupVxeTable(app: App) {
  // 注册组件
  components.forEach((component: Component) => {
    app.component(component.name, component)
  })
}
