// 此文件代表暗黑模式和正常模式配置，appStore读取此文件中的配置信息，建议与var.scss中保持一致
const normalTheme: ThemeTypes = {
  themeColor: "#3a6ee8",
  elColorPrimary: "#3a6ee8",
  themeTextColor: "#252525",
  themeBgColor: "#f5f7f9",
  themeDivColor: "#fff",
  dividerColor: "#dbdcdd",
  leftMenuBgColor: "#001529",
  leftMenuBgLightColor: "#0f2438",
  leftMenuBgActiveColor: "var(--el-color-primary)",
  leftMenuTextColor: "#bfcbd9",
  leftMenuTextActiveColor: "#ffffff",
  leftMenuCollapseBgActiveColor: "var(--el-color-primary)"
}

const darkTheme: ThemeTypes = {
  themeColor: "#3a6ee8",
  elColorPrimary: "#3a6ee8",
  themeTextColor: "#fff",
  themeBgColor: "#1b1b1f",
  themeDivColor: "#2e2e32",
  dividerColor: "#4C4D4F",
  leftMenuBgColor: "#191b24",
  leftMenuBgLightColor: "#282a33",
  leftMenuBgActiveColor: "var(--el-color-primary)",
  leftMenuTextColor: "#bfcbd9",
  leftMenuTextActiveColor: "#ffffff",
  leftMenuCollapseBgActiveColor: "var(--el-color-primary)"
}

export { normalTheme, darkTheme }
