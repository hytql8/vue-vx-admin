<script setup lang="ts">
import { ref, unref, onMounted } from "vue"
import { VxContainer } from "@/components/VxContainer"
import { Graph } from "@antv/x6"
import { ElButton, ElText } from "element-plus"
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
    <div ref="antv" :style="`width: 50%; height: 318px`"></div>
  </VxContainer>
</template>
