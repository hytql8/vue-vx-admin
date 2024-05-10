import type { QRCodeRenderersOptions } from "qrcode"

/**
 * @description: qrcode components props type
 */
type QrcodePropsType = {
  render?: "canvas" | "img"
  value?: string
  options?: QRCodeRenderersOptions
  width?: number
  logo?: QrcodeOptionType | string
  disabled?: boolean
  disabledText?: string
}

/**
 * @description: qrcode options type
 */
type QrcodeOptionType = {
  src?: string
  logoSize?: number
  bgColor?: string
  borderSize?: number
  crossOrigin?: string
  borderRadius?: number
  logoRadius?: number
}

export type { QrcodePropsType, QrcodeOptionType }
