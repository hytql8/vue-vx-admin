/** 处理环境变量 */
const readEnv = (envConf: Recordable): ViteEnv => {
  /** 此处为默认值 */
  const ret: ViteEnv = {
    VITE_APP_TITLE: "",
    VITE_PORT: 8080,
    VITE_PUBLIC_PATH: "",
    VITE_ROUTER_HISTORY: "",
    VITE_CDN: false,
    VITE_COMPRESSION: "none"
    VITE_REPORT: false,
  }

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n")
    realName = realName === "true" ? true : realName === "false" ? false : realName

    if (envName === "VITE_PORT") {
      realName = Number(realName)
    }
    ret[envName] = realName
    if (typeof realName === "string") {
      process.env[envName] = realName
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}

export { readEnv }
