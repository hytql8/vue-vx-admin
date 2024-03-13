// 按钮级别权限
import { hasAuth } from "./utils"
import type { Directive, DirectiveBinding } from "vue"
import { App } from "vue"

export const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    if (value) {
      !hasAuth(value) && el.parentNode?.removeChild(el)
    } else {
      throw new Error("[Directive: auth]: need auths! Like v-auth=\"['create', 'read', 'update', 'delete']\"")
    }
  }
}

export const setupAuthDirective = (app: App<Element>) => {
  app.directive("auth", auth)
}
