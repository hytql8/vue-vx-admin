import type { EChartsOption } from "echarts"
import type { Ref } from "vue"
import { tryOnUnmounted, useDebounceFn } from "@vueuse/core"
import { unref, nextTick, watch, ref, isRef } from "vue"
import echarts from "@/plugins/echarts"
import { useAppStoreWithOut } from "@/store/modules/app"

const appStore = useAppStoreWithOut()

export const useECharts = (elRef: Ref<HTMLDivElement>) => {
  // 获取当前主题
  const isDark = ref(appStore.getIsDark ? "dark" : "light")
  // echarts实例ref对象
  let echartsInstance: Nullable<echarts.ECharts> = null
  // 接受的options对象缓存
  const cacheOptions = ref({}) as Ref<EChartsOption>
  // 移除resize监听方法
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let removeResizeFn: Fn = () => {}
  // 图表根据父容器大小resize
  const resize = useDebounceFn(() => {
    echartsInstance &&
      echartsInstance.resize({
        animation: {
          duration: 200,
          easing: "quadraticIn"
        }
      })
  }, 200)
  // 监听主题变化
  watch(
    () => appStore.getIsDark,
    async (val: boolean) => {
      isDark.value = val ? "dark" : "light"
      if (echartsInstance) {
        disposeCharts()
        await setOptions(unref(cacheOptions))
      }
    },
    {
      immediate: true
    }
  )
  // 监听是否折叠菜单
  watch(
    () => appStore.getIsFold,
    () => {
      resize()
    },
    {
      immediate: true
    }
  )

  // 初始化echart
  const initCharts = async (theme: string = "light") => {
    await nextTick()
    const el = unref(elRef)
    if (!el || !unref(el)) {
      console.warn("echarts is null")
      return
    }
    echartsInstance = echarts.init(el, theme)
    window.addEventListener("resize", resize)
    removeResizeFn = () => {
      window.removeEventListener("resize", resize)
    }
  }
  // 销毁当前的 echarts 实例
  const disposeCharts = () => {
    echartsInstance?.dispose()
    echartsInstance = null
  }
  // 设置echarts options方法
  const setOptions = async (options: EChartsOption | Ref<EChartsOption>) => {
    let activeOptions = isRef(options) ? unref(options) : options
    cacheOptions.value = activeOptions
    if (!echartsInstance) {
      await initCharts(unref(isDark))
    }
    echartsInstance.setOption(activeOptions)
  }
  // echarts 对象实例
  const getInstance = async (): Promise<Nullable<echarts.ECharts>> => {
    if (!echartsInstance) {
      await initCharts(unref(isDark))
    }
    return echartsInstance as Nullable<echarts.ECharts>
  }
  // 组件卸载，图表相关一样卸载
  tryOnUnmounted(() => {
    if (!echartsInstance) return
    removeResizeFn()
    disposeCharts()
    echartsInstance = null
  })

  return {
    setOptions,
    resize,
    echarts,
    getInstance
  }
}
