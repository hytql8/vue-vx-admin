<script lang="ts" setup>
import { ref, watch, nextTick, unref, computed } from "vue"
import { toCanvas, toDataURL, type QRCodeRenderersOptions } from "qrcode"
import { cloneDeep } from "lodash-es"
import type { QrcodePropsType, QrcodeOptionType } from "@/components/Qrcode/src/types"
import { isString } from "@/utils/is"
import { VxIcon } from "@/components/VxIcon"

const props = withDefaults(defineProps<QrcodePropsType>(), {
  render: "canvas",
  value: null,
  options: () => ({}),
  width: 200,
  logo: null,
  disabled: false,
  disabledText: ""
})

const loading = ref(true)

const qrcodeRef = ref<Nullable<HTMLCanvasElement | HTMLImageElement>>(null)

const value = computed(() => props.value)

const emit = defineEmits<{
  (e: "done", url: unknown): void
  (e: "click"): void
  (e: "disabledClick"): void
}>()

const style = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.width}px`
  }
})

const getErrorCorrectionLevel = (content: string) => {
  if (content.length > 36) {
    return "M"
  } else if (content.length > 16) {
    return "Q"
  } else {
    return "H"
  }
}

const getOriginWidth = async (content: string, options: QRCodeRenderersOptions) => {
  const _canvas = document.createElement("canvas")
  await toCanvas(_canvas, content, options)
  return _canvas.width
}

const canvasRoundRect = (ctx: CanvasRenderingContext2D) => {
  return (x: number, y: number, w: number, h: number, r: number) => {
    const minSize = Math.min(w, h)
    if (r > minSize / 2) {
      r = minSize / 2
    }
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
    return ctx
  }
}

const createLogoCode = (canvasRef: HTMLCanvasElement) => {
  const canvasWidth = canvasRef.width
  const logoOptions: QrcodeOptionType = Object.assign(
    {
      logoSize: 0.15,
      bgColor: "#ffffff",
      borderSize: 0.05,
      crossOrigin: "anonymous",
      borderRadius: 8,
      logoRadius: 0
    },
    isString(props.logo) ? {} : props.logo
  )
  const {
    logoSize = 0.15,
    bgColor = "#ffffff",
    borderSize = 0.05,
    crossOrigin = "anonymous",
    borderRadius = 8,
    logoRadius = 0
  } = logoOptions
  const logoSrc = isString(props.logo) ? props.logo : props.logo.src
  const logoWidth = canvasWidth * logoSize
  const logoXY = (canvasWidth * (1 - logoSize)) / 2
  const logoBgWidth = canvasWidth * (logoSize + borderSize)
  const logoBgXY = (canvasWidth * (1 - logoSize - borderSize)) / 2

  const ctx = canvasRef.getContext("2d")
  if (!ctx) return

  // logo 底色
  canvasRoundRect(ctx)(logoBgXY, logoBgXY, logoBgWidth, logoBgWidth, borderRadius)
  ctx.fillStyle = bgColor
  ctx.fill()

  // logo
  const image = new Image()
  if (crossOrigin || logoRadius) {
    image.setAttribute("crossOrigin", crossOrigin)
  }
  ;(image as any).src = logoSrc

  // 使用image绘制可以避免某些跨域情况
  const drawLogoWithImage = (image: HTMLImageElement) => {
    ctx.drawImage(image, logoXY, logoXY, logoWidth, logoWidth)
  }

  // 使用canvas绘制以获得更多的功能
  const drawLogoWithCanvas = (image: HTMLImageElement) => {
    const canvasImage = document.createElement("canvas")
    canvasImage.width = logoXY + logoWidth
    canvasImage.height = logoXY + logoWidth
    const imageCanvas = canvasImage.getContext("2d")
    if (!imageCanvas || !ctx) return
    imageCanvas.drawImage(image, logoXY, logoXY, logoWidth, logoWidth)

    canvasRoundRect(ctx)(logoXY, logoXY, logoWidth, logoWidth, logoRadius)
    if (!ctx) return
    const fillStyle = ctx.createPattern(canvasImage, "no-repeat")
    if (fillStyle) {
      ctx.fillStyle = fillStyle
      ctx.fill()
    }
  }

  // 将 logo绘制到 canvas上
  return new Promise((resolve: any) => {
    image.onload = () => {
      logoRadius ? drawLogoWithCanvas(image) : drawLogoWithImage(image)
      resolve(canvasRef.toDataURL())
    }
  })
}

const initQrcode = async () => {
  await nextTick()
  const options = cloneDeep(props.options || {})
  if (props.render === "canvas") {
    options.errorCorrectionLevel = options.errorCorrectionLevel || getErrorCorrectionLevel(unref(value))
    const _width: number = await getOriginWidth(unref(value), options)
    options.scale = props.width === 0 ? undefined : (props.width / _width) * 4
    const canvasRef = (await toCanvas(
      unref(qrcodeRef) as HTMLCanvasElement,
      unref(value),
      options
    )) as unknown as HTMLCanvasElement
    if (props.logo) {
      const url = await createLogoCode(canvasRef)
      emit("done", url)
      loading.value = false
    } else {
      emit("done", canvasRef.toDataURL())
      loading.value = false
    }
  } else {
    const url = await toDataURL(unref(value), {
      errorCorrectionLevel: "H",
      width: props.width,
      ...options
    })
    ;(unref(qrcodeRef) as HTMLImageElement).src = url
    emit("done", url)
    loading.value = false
  }
}

watch(
  () => props.value,
  async () => {
    if (props.value) {
      await initQrcode()
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const clickCode = () => {
  emit("click")
}

const disabledClick = () => {
  emit("disabledClick")
}
</script>

<template>
  <div v-loading="loading" :style="style" class="vx-qrcode">
    <component :is="render" ref="qrcodeRef" @click="clickCode" />
    <div v-if="disabled" @click="disabledClick" class="vx-qrcode__cover">
      <div class="cover-inset">
        <VxIcon icon="ep:refresh-right" :size="30" color="var(--el-color-primary)" hover-color="var(--el-color-primary)" />
        <div>{{ disabledText }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@use "./Qrcode.scss";
</style>
