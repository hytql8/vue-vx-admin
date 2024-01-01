import { defineStore } from "pinia"
import { useStorage } from "@/hooks/useStorage"

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
    }
  },
  actions: {
    setTagsList(tagsList: TagsList[]) {
      this.tagsList = tagsList
      setStorage("tagsList", tagsList)
    }
  }
})
