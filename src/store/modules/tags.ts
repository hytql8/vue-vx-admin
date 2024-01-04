import { defineStore } from "pinia"
import { useStorage } from "@/hooks/useStorage"
import { RouteRecordRaw } from "vue-router"
import { toRaw } from "vue"
import { store } from "../index"

const { getStorage, setStorage } = useStorage()

type tagsState = {
  tagsList: TagsList[]
}

export const useTagsStore = defineStore("tags", {
  state: (): tagsState => {
    return {
      tagsList: getStorage("tagsList") || []
    }
  },
  getters: {
    getTagsList(): TagsList[] {
      return this.tagsList
    },
    // 获取当前选中的tag
    getCurrentTag(): TagsList {
      return this.tagsList.filter((v: TagsList) => v.current)[0]
    }
  },
  actions: {
    // 设置整个tagsList
    setTagsList(tagsList: TagsList[]) {
      this.tagsList = tagsList
      setStorage("tagsList", tagsList)
    },
    // 添加tags
    addTags(route: RouteRecordRaw) {
      if (this.tagsList.some((v: TagsList) => v.path === route.path)) {
        this.updateTagsByRoute(route)
        return
      }
      // 添加之前先干掉所有样式
      this.tagsList.forEach((v: TagsList) => Object.assign(v, { current: false, isFixed: false }))
      this.tagsList.push(
        Object.assign({
          current: true,
          icon: route.meta.icon,
          isFixed: true,
          path: route.path,
          title: route.meta.title ?? "no title"
        })
      )
      setStorage("tagsList", this.tagsList)
    },
    // 根据当前路由更新tags
    updateTagsByRoute(route: RouteRecordRaw) {
      this.tagsList.forEach((v: TagsList) => Object.assign(v, { current: false, isFixed: false }))
      for (let v of this.tagsList) {
        if (v.path === route.path) {
          v = Object.assign(v, {
            current: true,
            icon: route.meta.icon,
            isFixed: true,
            path: route.path,
            title: route.meta.title ?? "no title"
          })
          break
        }
      }
      setStorage("tagsList", this.tagsList)
    },
    // 根据传入Tags更新tags
    updateTagsByTags(tag: TagsList) {
      this.tagsList.forEach((v: TagsList) => Object.assign(v, { current: false, isFixed: false }))
      for (let v of this.tagsList) {
        if (v.path === tag.path) {
          v = Object.assign(v, tag, { current: true, isFixed: true })
          break
        }
      }
      setStorage("tagsList", this.tagsList)
    },
    // 根据传入Tags删除tags
    delTagsByTags(tag: TagsList): string {
      let index = this.tagsList.findIndex((v: TagsList, index: number) => (v.path === tag.path ? index : -1))
      for (let [i, v] of this.tagsList.entries()) {
        if (tag.path === v.path) {
          this.tagsList.splice(i, 1)
          break
        }
      }
      // 删完立马缓存(缓存交给update方法)
      // setStorage("tagsList", this.tagsList)
      // 接下来解决路由跳转问题,默认跳转到tags在 tagsList的前一个,找不到则为最后一个tag(前一个添加的tag,因为template中已经加以限制,能显示删除的tagsList length最少为2)
      let path = index > 0 ? this.tagsList[index - 1].path : index === 0 ? this.tagsList[this.tagsList.length - 1].path : "/404"
      this.updateTagsByTags(toRaw(this.tagsList.filter((v: TagsList) => v.path === path)[0]))
      return path
    },
    // 关闭当前标签页
    delCurrentTags(): string {
      return this.delTagsByTags(toRaw(this.getCurrentTag))
    },
    // 关闭全部标签页
    delOtherTags() {
      const currentTag = toRaw(this.getCurrentTag) as TagsList
      this.tagsList.splice(0, this.tagsList.length)
      this.tagsList.push(currentTag)
      setStorage("tagsList", this.tagsList)
    },
    // 关闭左侧标签页
    delLeftTags() {
      const currentTag = toRaw(this.getCurrentTag) as TagsList
      for (let [i, v] of toRaw(this.getTagsList).entries()) {
        if (v.path === currentTag.path) {
          this.tagsList.splice(0, i)
          break
        }
      }
      setStorage("tagsList", this.tagsList)
    },
    // 关闭右侧标签页
    delRightTags() {
      const currentTag = toRaw(this.getCurrentTag) as TagsList
      for (let [i, v] of toRaw(this.getTagsList).entries()) {
        if (v.path === currentTag.path) {
          this.tagsList.splice(i + 1, this.tagsList.length)
          break
        }
      }
      setStorage("tagsList", this.tagsList)
    },
    delAllTags() {
      this.tagsList.splice(0, this.tagsList.length)
      setStorage("tagsList", this.tagsList)
    }
  }
})

export const useTagsStoreWithOut = () => {
  return useTagsStore(store)
}
