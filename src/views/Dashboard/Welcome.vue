<script setup lang="ts">
import { ref } from "vue"
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
})
const { setOptions } = useECharts(echarts)

setOptions(options)

const setRes = () => {
  setOptions(options)
}
</script>
<template>
  <VxContainer>
    <div @click="setRes">Welcome</div>
    <div ref="echarts">123</div>
  </VxContainer>
</template>
