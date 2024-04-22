import { nextTick, unref, isRef } from "vue"
import type { Ref } from "vue"
import { Graph } from "@antv/x6"

export const useX6 = (elRef: Ref<HTMLElement>, ...args: any) => {
  // antv x6实例对象
  let instance: Nullable<any> = null
  //   初始化
  const init = async () => {
    await nextTick()
    if (!elRef || !unref(elRef)) {
      console.log("antv is null")
      return
    }
    instance = new Graph(
      Object.assign(
        {
          container: unref(elRef)
        },
        ...args
      )
    )
  }
  // 设置参数data
  const setOptions = async (data: any) => {
    let activeOptions = isRef(data) ? unref(data) : data
    if (!instance) {
      await init()
    }
    instance.fromJSON(activeOptions)
  }

  // 获取当前antv x6实例
  const getInstance = async () => {
    if (!instance) {
      await init()
    }
    return instance as Nullable<any>
  }
  //   添加node
  const addNode = async (data: any) => {
    if (!instance) {
      await init()
    }
    instance.addNode(data)
  }
  //   添加edge
  const addEdge = async (data: any) => {
    if (!instance) {
      await init()
    }
    instance.addEdge(data)
  }
  //   删除node
  const removeNode = async (node: any) => {
    if (!instance) {
      await init()
    }
    instance.removeNode(node)
  }
  //   删除edge
  const removeEdge = async (data: any) => {
    if (!instance) {
      await init()
    }
    instance.removeEdge(data)
  }
  return {
    setOptions,
    getInstance,
    addNode,
    addEdge,
    removeNode,
    removeEdge
  }
}
