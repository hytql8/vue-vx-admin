<script lang="ts" setup>
import { ref } from "vue"
import { VxContainer } from "@/components/VxContainer"
import { Qrcode } from "@/components/Qrcode"

const clickThis = () => {
  alert("点击了二维码")
}

const url = ref("")

setTimeout(() => {
  url.value = "http://hytql8.top"
}, 2000)

const logoUrl = new URL("@/assets/imgs/VxLogo.png", import.meta.url).href
</script>

<template>
  <VxContainer>
    <div style="display: flex; flex-wrap: wrap">
      <div style="text-align: center">
        <div>canvas渲染</div>
        <Qrcode :value="'http://hytql8.top'" render="canvas" />
      </div>
      <div style="text-align: center">
        <div>img渲染</div>
        <Qrcode :value="'http://hytql8.top'" render="img" />
      </div>
      <div style="text-align: center">
        <div>点击事件</div>
        <Qrcode :value="'http://hytql8.top'" render="canvas" @click="clickThis" />
      </div>
      <div style="text-align: center">
        <div>异步</div>
        <Qrcode :value="url" render="canvas" />
      </div>
      <div style="text-align: center">
        <div>不可用</div>
        <Qrcode value="http://hytql8.top" disabled disabled-text="已失效" render="canvas" />
      </div>
      <div style="text-align: center">
        <div>配置logo</div>
        <Qrcode value="http://hytql8.top" :logo="logoUrl" render="canvas" />
      </div>
      <div style="text-align: center">
        <div>配置logo样式</div>
        <Qrcode
          value="http://hytql8.top"
          :logo="{
            src: logoUrl,
            bgColor: 'skyblue',
            borderRadius: 50
          }"
          render="canvas"
        />
      </div>
      <div style="text-align: center">
        <div>大小配置</div>
        <Qrcode value="http://hytql8.top" :width="100" :logo="logoUrl" render="canvas" />
      </div>
    </div>
  </VxContainer>
</template>

<style scoped></style>
