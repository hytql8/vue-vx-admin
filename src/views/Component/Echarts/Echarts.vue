<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Ref } from "vue"
import type { EChartsOption } from "echarts"
import { VxContainer } from "@/components/VxContainer"
import { useECharts } from "@/hooks/useEcharts"

const echarts = ref<HTMLDivElement | null>(null)

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

onMounted(() => {
  setOptions(options)
})
</script>
<template>
  <VxContainer>
    <div>echarts</div>
    <div ref="echarts" :style="`width: 50%; height: 318px`"></div>
  </VxContainer>
</template>
