import type { EChartsOption } from "echarts"
import type { Ref } from "vue"
import { tryOnUnmounted, useDebounceFn } from "@vueuse/core"
import { unref, nextTick, watch, ref } from "vue"
import echarts from "@/plugins/echarts"
import { useAppStoreWithOut } from "@/store/modules/app"

const appStore = useAppStoreWithOut()

export function useECharts(elRef: Ref<HTMLDivElement>) {
  // 获取当前主题
  const isDark = ref(appStore.getIsDark ? "dark" : "light")
  // echarts实例ref对象
  const echartsInstance = ref<echarts.ECharts>()
  // 接受的options对象
  const cacheOptions = ref({}) as Ref<EChartsOption>
  // 监听主题变化
  watch(
    () => appStore.getIsDark,
    async (val: boolean) => {
      isDark.value = val ? "dark" : "light"
      disposeCharts()
      await initOrSetOptions(unref(isDark), unref(cacheOptions))
      await setOptions(unref(cacheOptions))
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
      return
    }
    echartsInstance.value = echarts.init(unref(elRef), theme, { width: 450, height: 300 })
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
  const setOptions = async (options: EChartsOption) => {
    cacheOptions.value = options
    if (!unref(echartsInstance)) {
      await initCharts(unref(isDark))
    }
    unref(echartsInstance).setOption(unref(options))
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
    getInstance
  }
}
