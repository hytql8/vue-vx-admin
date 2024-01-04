import TagsView from "./src/TagsView.vue"
import { computed, unref } from "vue"
import { router } from "@/router"
import { useTagsStoreWithOut } from "@/store/modules/tags"

const tagsStore = useTagsStoreWithOut()
const tagsList = computed(() => tagsStore.getTagsList)

// 初始化tags
const tagsViewInit = (): string => {
  const redirect = router.getRoutes().find(v => v.path === "/").redirect
  const defaultCurRoute = router.getRoutes().find(v => v.path === redirect)
  if (!unref(tagsList)?.length) {
    const arr: TagsList[] = []
    arr.push(
      Object.assign(unref(tagsList)[0] ?? {}, {
        title: defaultCurRoute.meta.title,
        path: defaultCurRoute.path,
        icon: defaultCurRoute.meta.icon,
        isFixed: true,
        current: true
      })
    )
    tagsStore.setTagsList(arr)
    return defaultCurRoute.path
  }
  return void 0
}

export { TagsView, tagsViewInit }
