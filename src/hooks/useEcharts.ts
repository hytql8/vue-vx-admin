import type { EChartsOption } from "echarts"
import type { Ref } from "vue"
import { tryOnUnmounted, useDebounceFn, useElementSize } from "@vueuse/core"
import { unref, nextTick, watch, ref, isRef, onMounted } from "vue"
import echarts from "@/plugins/echarts"
import { useAppStoreWithOut } from "@/store/modules/app"

const appStore = useAppStoreWithOut()

export const useECharts = (elRef: Ref<HTMLDivElement>) => {
  // 获取当前主题
  const isDark = ref(appStore.getIsDark ? "dark" : "light")
  // echarts实例ref对象
  const echartsInstance = ref<echarts.ECharts>(null)
  // 接受的options对象缓存
  const cacheOptions = ref({}) as Ref<EChartsOption>
  // 图表根据父容器大小resize
  const resize = async () => {
    const echartsExpose = await getInstance()
    console.log(echartsExpose.resize, "resize方法")
    echartsExpose?.resize()
  }
  // 监听主题变化
  watch(
    () => appStore.getIsDark,
    async (val: boolean) => {
      isDark.value = val ? "dark" : "light"
      if (unref(echartsInstance)) {
        disposeCharts()
        await initOrSetOptions(unref(isDark), unref(cacheOptions))
        await setOptions(unref(cacheOptions))
      }
    },
    {
      immediate: true
    }
  )
  // 初始化echart
  const initCharts = async (theme: string = "light") => {
    await nextTick()
    console.log("hooks nextTick")
    window.addEventListener("resize", resize)
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    const { width, height } = useElementSize(el)
    echartsInstance.value = echarts.init(unref(elRef), theme, { width: unref(width), height: unref(height) })
  }
  // 销毁当前的 echarts 实例
  const disposeCharts = () => {
    unref(echartsInstance)?.dispose()
    echartsInstance.value = null
  }
  // 检查缓存来初始化echart
  const initOrSetOptions = async (theme: string, options: EChartsOption) => {
    if (!unref(echartsInstance)) {
      await initCharts(theme)
    } else {
      setOptions(options)
    }
  }
  // 设置echarts options方法
  const setOptions = async (options: EChartsOption | Ref<EChartsOption>) => {
    let activeOptions = isRef(options) ? unref(options) : options
    cacheOptions.value = activeOptions
    if (!unref(echartsInstance)) {
      await initCharts(unref(isDark))
    }
    unref(echartsInstance).setOption(activeOptions)
  }
  // echarts 对象实例
  const getInstance = async (): Promise<echarts.ECharts | null> => {
    if (!unref(echartsInstance)) {
      await initCharts(unref(isDark))
    }
    return unref(echartsInstance)
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance
  }
}
