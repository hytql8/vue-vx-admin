<script lang="tsx">
import { computed, unref, ref, watch, defineComponent } from "vue"
import { useAppStore } from "@/store/modules/app"
import { generateLowerRoutes, createMenuRoutes } from "@/utils/routerUtils"
import { useRouter, type RouteRecordRaw, RouteMeta } from "vue-router"
import { useRoutersStore } from "@/store/modules/router"
import { ElMenu, ElSubMenu, ElMenuItem, ElMenuItemGroup, ElScrollbar } from "element-plus"
import { useTagsStore } from "@/store/modules/tags"
import { findRoutePath } from "@/utils/routerUtils"
import { VxIcon } from "@/components/VxIcon"
import { useI18n } from "vue-i18n"
import { isUrl } from "@/utils/is"

export default defineComponent({
  name: "VxMenu",
  setup() {
    const { currentRoute, push, getRoutes } = useRouter()
    const staticRouter = getRoutes()
    const appStore = useAppStore()
    const routersStore = useRoutersStore()
    const tagsStore = useTagsStore()

    const isFold = computed(() => appStore.getIsFold)
    const isGroup = computed(() => appStore.getIsGroup)
    const layout = ref(appStore.getLayout)

    const { t } = useI18n()

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
    // routersStore.getRouters 此方法过滤时已筛选过权限，此时直接获取就行
    const menuRoutes = routersStore.getMenu
    watch(
      () => appStore.getLayout,
      (val: LayoutType) => {
        layout.value = val
      }
    )

    watch(
      () => appStore.getIsSeemMoblie,
      (val: boolean) => {
        if (val) {
          layout.value = "vertical"
          appStore.setLayout("vertical")
        }
      }
    )

    const routes = generateLowerRoutes(createMenuRoutes(menuRoutes))
    // 获取当前选中的路由
    const activeMenu = computed(() => {
      const { path } = unref(currentRoute)
      return path as string
    })
    return () => {
      return unref(layout) === "horizontal" ? (
        <ElMenu style="width: 600px" class="vx-menu--horizontal" mode="horizontal" default-active={unref(activeMenu)}>
          {{
            default: () => {
              return renderMenu(routes)
            }
          }}
        </ElMenu>
      ) : (
        <ElScrollbar class="vx-scrollbar">
          <ElMenu
            class="vx-menu"
            mode="vertical"
            active-text-color="var(--left-menu-text-active-color)"
            background-color="var(--left-menu-bg-color)"
            default-active={unref(activeMenu)}
            collapse={unref(isFold)}
            text-color="var(--left-menu-text-color)"
          >
            {{
              default: () => {
                return unref(isGroup) ? renderGroupMenu(routes) : renderMenu(routes)
              }
            }}
          </ElMenu>
        </ElScrollbar>
      )
    }
  }
})
</script>
<style lang="scss" scoped>
@use "./Menu.scss";
</style>
