<script setup lang="ts">
import { ref, onMounted } from "vue"
import { VxContainer } from "@/components/VxContainer"
import { useX6 } from "@/hooks/useX6"
import { Shape } from "@antv/x6"

const antv = ref<HTMLElement>()

const data = {
  // 节点
  nodes: [
    {
      id: "node1", // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: "hello", // String，节点标签
      attrs: {
        body: {
          fill: "var(--theme-div-color)", // 背景颜色
          stroke: "var(--theme-text-color)" // 边框颜色
        },
        label: {
          text: "节点1", // 文本
          fill: "var(--theme-text-color)", // 文字颜色
          fontSize: 13 // 文字大小
        }
      }
    },
    {
      id: "node2", // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      attrs: {
        body: {
          fill: "var(--theme-div-color)", // 背景颜色
          stroke: "var(--theme-text-color)" // 边框颜色
        },
        label: {
          text: "节点2", // 文本
          fill: "var(--theme-text-color)", // 文字颜色
          fontSize: 13 // 文字大小
        }
      }
    }
  ],
  // 边
  edges: [
    {
      source: "node1", // String，必须，起始节点 id
      target: "node2", // String，必须，目标节点 id
      attrs: {
        line: {
          stroke: "var(--theme-text-color)" // 指定 path 元素的填充色
        }
      }
    }
  ]
}

// 创建节点
const rect = new Shape.Rect({
  id: "node3",
  x: 350,
  y: 30,
  width: 100,
  height: 40,
  label: "rect",
  zIndex: 2,
  attrs: {
    body: {
      fill: "var(--theme-div-color)", // 背景颜色
      stroke: "var(--theme-text-color)" // 边框颜色
    },
    label: {
      text: "节点3", // 文本
      fill: "var(--theme-text-color)", // 文字颜色
      fontSize: 13 // 文字大小
    }
  }
})
// 创建线
const edge = new Shape.Edge({
  id: "edge1",
  source: rect,
  target: "node2",
  zIndex: 1,
  attrs: {
    line: {
      stroke: "var(--theme-text-color)" // 指定 path 元素的填充色
    }
  }
})

const { setOptions, addNode, addEdge } = useX6(antv, { grid: true })

setTimeout(() => {
  console.log("add node")
  addNode(rect)
}, 3000)

setTimeout(() => {
  console.log("add edge")
  addEdge(edge)
}, 5000)

onMounted(() => {
  setOptions(data)
})
</script>
<template>
  <VxContainer>
    <div ref="antv" class="antv"></div>
  </VxContainer>
</template>
<style scoped>
.antv {
  width: 100%;
  height: calc(100dvh - 170px);
}
</style>
