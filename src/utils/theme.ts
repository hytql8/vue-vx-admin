// 此文件代表暗黑模式和正常模式配置，appStore读取此文件中的配置信息，建议与var.less中保持一致
const normalTheme: ThemeTypes = {
  elPrimaryColor: "#3a6ee8",
  themeTextColor: "#252525",
  themeBgColor: "#f5f7f9",
  themeDivColor: "#fff",
  dividerColor: "#dbdcdd"
}

const darkTheme: ThemeTypes = {
  elPrimaryColor: "#3a6ee8",
  themeTextColor: "#fff",
  themeBgColor: "#1b1b1f",
  themeDivColor: "#2e2e32",
  dividerColor: "#2f2f2f"
}

export { normalTheme, darkTheme }
