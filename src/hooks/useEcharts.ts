import type { EChartsOption } from "echarts"
import type { Ref } from "vue"
import { tryOnUnmounted, useDebounceFn } from "@vueuse/core"
import { unref, nextTick, toRaw, watch, computed, ref, onMounted } from "vue"
import echarts from "@/plugins/echarts"
import { useAppStoreWithOut } from "@/store/modules/app"

const appStore = useAppStoreWithOut()

export function useECharts(elRef: Ref<HTMLDivElement>) {
  // 系统主题
  const isDark = ref("light")

  // echarts实例ref对象
  const echartsInstance = ref<echarts.ECharts>()
  // 接受的options对象
  const cacheOptions = ref({}) as Ref<EChartsOption>
  // 获取echarts对象
  const getChartInstance = async (reset: boolean) => {
    await nextTick()
    if (reset) {
      if (unref(echartsInstance)) {
        unref(echartsInstance).dispose()
        console.log(isDark)
        return echarts.init(unref(elRef), unref(isDark), { width: 300, height: 200 })
      }
    } else {
      if (!unref(echartsInstance)) {
        return echarts.init(unref(elRef), unref(isDark), { width: 300, height: 200 })
      }
    }
  }

  watch(
    () => appStore.getIsDark,
    val => {
      console.log(val)
      isDark.value = val ? "dark" : "light"
      if (!unref(echartsInstance)) {
        unref(echartsInstance).setOption(unref(cacheOptions), true)
      }
    }
  )
  // 设置echarts options方法
  const setOptions = async (options: any, reset: boolean = false) => {
    cacheOptions.value = options
    if (!unref(echartsInstance)) {
      echartsInstance.value = await getChartInstance(reset)
    }
    unref(echartsInstance).setOption(unref(options))
  }

  return {
    setOptions
  }
}
