<script lang="tsx">
import type { RouteRecordRaw, RouteMeta } from "vue-router"
import { computed, defineComponent, unref } from "vue"
import type { PropType } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { VxIcon } from "@/components/VxIcon"
import { useTagsStore } from "@/store/modules/tags"
import { findRoutePath } from "@/utils/routerUtils"
import { isUrl } from "@/utils/is"
import { ElSubMenu, ElMenuItem, ElMenuItemGroup } from "element-plus"

export default defineComponent({
  name: "RenderVertical",
  props: {
    routes: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: () => []
    },
    isGroup: Boolean
  },
  setup(props) {
    const { push, getRoutes } = useRouter()

    const staticRouter = getRoutes()

    const tagsStore = useTagsStore()

    const { t } = useI18n()

    const routes = computed(() => props.routes)
    const isGroup = computed(() => props.isGroup)

    // 组装tagsView信息
    const findRoute = (args: string[]): RouteRecordRaw => {
      return staticRouter.filter((v: RouteRecordRaw) => v.path.includes(args[args.length - 1]))[0]
    }

    // 跳转
    const routingJump = ({ index }) => {
      const activeRoute = findRoute(index.split("/"))
      const path = activeRoute.path
      // tags切换
      tagsStore.addTags(activeRoute)
      // 跳转
      push({
        path
      })
    }
    // 渲染title
    const renderMenuTitle = (v: RouteRecordRaw) => {
      return (
        <>
          {v.meta?.icon ? <VxIcon icon={v.meta.icon} size={16} /> : null}
          <span class="span-ml">{v.meta?.title ? t(v.meta?.title) : "请设置标题"}</span>
        </>
      )
    }

    const renderMenu = (routers: RouteRecordRaw[]) => {
      // 如果有 渲染
      return routers.map((v: RouteRecordRaw) => {
        let meta = (v.meta ? v.meta : {}) as RouteMeta
        let currentPath = isUrl(v.path)
          ? v.path
          : findRoutePath(staticRouter, v.path)
          ? findRoutePath(staticRouter, v.path)
          : v.path
        // hidden为真代表此项以及子项不渲染，不存在/为false都代表此项正常渲染
        if (!meta?.hidden) {
          // 渲染
          if (v?.children?.length) {
            renderMenu(v.children)
            return (
              <ElSubMenu index={currentPath}>
                {{
                  title: () => {
                    return renderMenuTitle(v)
                  },
                  default: () => {
                    return renderMenu(v.children)
                  }
                }}
              </ElSubMenu>
            )
          } else {
            return (
              <ElMenuItem index={currentPath} onClick={routingJump}>
                {{
                  default: () => {
                    return renderMenuTitle(v)
                  }
                }}
              </ElMenuItem>
            )
          }
        }
      })
    }

    /**
     * @param routers router对象
     * @param parentPath 父级path
     * @param level 需要第一层还是往下变为group menu 这里默认是level > 1 ? 即为 1 级（最大为一级）， 如果改为1，则从第二级有子项的开始改为group模式
     */

    const renderGroupMenu = (routers: RouteRecordRaw[], level: number = 2) => {
      // 如果有 渲染
      return routers.map((v: RouteRecordRaw) => {
        let meta = (v.meta ? v.meta : {}) as RouteMeta
        let currentPath = isUrl(v.path)
          ? v.path
          : findRoutePath(staticRouter, v.path)
          ? findRoutePath(staticRouter, v.path)
          : v.path
        if (!meta?.hidden) {
          // 渲染
          if (v?.children?.length) {
            renderGroupMenu(v.children, level)
            return level > 1 ? (
              <ElMenuItemGroup index={currentPath}>
                {{
                  title: () => {
                    return renderMenuTitle(v)
                  },
                  default: () => {
                    return renderGroupMenu(v.children, level + 1)
                  }
                }}
              </ElMenuItemGroup>
            ) : (
              <ElSubMenu index={currentPath}>
                {{
                  title: () => {
                    return renderMenuTitle(v)
                  },
                  default: () => {
                    return renderGroupMenu(v.children, level + 1)
                  }
                }}
              </ElSubMenu>
            )
          } else {
            return (
              <ElMenuItem index={currentPath} onClick={routingJump}>
                {{
                  default: () => {
                    return renderMenuTitle(v)
                  }
                }}
              </ElMenuItem>
            )
          }
        }
      })
    }
    return () => {
      if (!unref(routes).length) {
        return null
      }
      return unref(isGroup) ? renderGroupMenu(unref(routes)) : renderMenu(unref(routes))
    }
  }
})
</script>
<style lang="scss" scoped>
@import "./RenderVertical.scss";
</style>
