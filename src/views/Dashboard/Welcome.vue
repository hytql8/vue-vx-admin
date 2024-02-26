<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Ref } from "vue"
import type { EChartsOption } from "echarts"

import { VxContainer } from "@/components/VxContainer"
import { useECharts } from "@/hooks/useEcharts"
const echarts = ref<HTMLDivElement>()

const options = ref({
  xAxis: {
    data: ["A", "B", "C", "D", "E"]
  },
  yAxis: {},
  series: [
    {
      type: "bar",
      data: [
        10,
        22,
        28,
        {
          value: 43,
          // 设置单个柱子的样式
          itemStyle: {
            color: "#91cc75",
            shadowColor: "#91cc75",
            borderType: "dashed",
            opacity: 0.5
          }
        },
        49
      ],
      itemStyle: {
        borderRadius: 5,
        borderWidth: 1,
        borderType: "solid",
        borderColor: "#73c0de",
        shadowColor: "#5470c6",
        shadowBlur: 3
      }
    }
  ]
}) as Ref<EChartsOption>
const { setOptions } = useECharts(echarts)

setOptions(options)

const setRes = () => {
  setOptions(options)
}

let a = ref(500)
// setInterval(() => {
// a.value += 10
// options.value.series[0].itemStyle.borderRadius++
// setOptions(options)
// console.log(132)
// }, 500)

onMounted(() => {
  console.log("父组件挂载")
})
</script>
<template>
  <VxContainer>
    <div @click="setRes">Welcome</div>
    <div ref="echarts" :style="`width: 50vw; height: 318px`"></div>
  </VxContainer>
</template>
