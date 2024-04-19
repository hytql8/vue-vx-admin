<script setup lang="ts">
import { ref, unref, onMounted } from "vue"
import type { Ref } from "vue"
import type { EChartsOption } from "echarts"
import { VxContainer } from "@/components/VxContainer"
import { useECharts } from "@/hooks/useEcharts"
import { Graph } from "@antv/x6"
import { ElButton, ElText } from "element-plus"

const echarts = ref<HTMLDivElement | null>(null)
const antv = ref<HTMLDivElement | null>(null)

const options = ref({
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {},
  series: [
    {
      type: "bar",
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
}) as Ref<EChartsOption>
const { setOptions } = useECharts(echarts)

onMounted(() => {
  setOptions(options)
})

const changeXisDta = () => {
  const randomIndex = Math.floor(Math.random() * 7)
  options.value.series[0].data[randomIndex] += 2
  setOptions(options)
}
const delXisDta = () => {
  const randomIndex = Math.floor(Math.random() * 7)
  options.value.series[0].data[randomIndex] -= 2
  setOptions(options)
}

const visibleLend = () => {
  options.value.legend = {
    data: ["日期"],
    icon: "rect"
  }
  options.value.series[0] = { name: "日期", type: "bar", data: [23, 24, 18, 25, 27, 28, 25] }
  setOptions(options)
}

const isShowName = ref(false)

const addXisName = () => {
  isShowName.value = !unref(isShowName)
  if (unref(isShowName)) {
    // @ts-expect-error ignore echarts type error
    options.value.xAxis.name = "日期"
    // @ts-expect-error ignore echarts type error
    options.value.yAxis.name = "数量"
  } else {
    // @ts-expect-error ignore echarts type error
    options.value.xAxis.name = ""
    // @ts-expect-error ignore echarts type error
    options.value.yAxis.name = ""
  }
  setOptions(options)
}

const data = {
  // 节点
  nodes: [
    {
      id: "node1", // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: "hello" // String，节点标签
    },
    {
      id: "node2", // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: "world" // String，节点标签
    }
  ],
  // 边
  edges: [
    {
      source: "node1", // String，必须，起始节点 id
      target: "node2" // String，必须，目标节点 id
    }
  ]
}

onMounted(() => {
  const graph = new Graph({
    container: unref(antv),
    width: 800,
    height: 600
  })
  graph.fromJSON(data)
})
</script>
<template>
  <VxContainer>
    <div><ElText tag="b">UseEcharts</ElText></div>
    <div>
      <ElText tag="l"
        >1. useEcharts
        已经对echarts做了自适应，会根据容器div大小变化而resize，并且做了防抖处理，页面或者组件卸载时销毁，仅在展示时渲染charts，使用者无须关心echarts的基础配置，只需要关心options的数据结构即可</ElText
      ><br />
      <ElText>2. options使用响应式数据定义，只需要更改setOptions方法的参数options即可驱动页面图表更新</ElText>
      <div style="margin-top: 20px">
        <ElButton @click="changeXisDta" type="primary">随机增加x轴data数值</ElButton>
        <ElButton @click="delXisDta" type="primary">随机减少x轴data数值</ElButton>
        <ElButton @click="visibleLend" type="primary">添加 图例</ElButton>
        <ElButton @click="addXisName" type="primary">添加/删除 x y 轴名字</ElButton>
      </div>
    </div>
    <div ref="echarts" :style="`width: 50%; height: 318px`"></div>
    <div ref="antv" :style="`width: 50%; height: 318px`"></div>
  </VxContainer>
</template>
