<script lang="ts" setup>
import { watch, computed } from "vue"
import { VxIcon } from "@/components/VxIcon"
import { useLocaleStore } from "@/store/modules/locale"
import { setHtmlLang, useCustomLocale } from "@/hooks/useLocale"

const localeStore = useLocaleStore()
const { changeLocale } = useCustomLocale()

defineOptions({
  name: "VxLocaleSwitch"
})

const localeMaps = computed(() => localeStore.getLocaleMap)

const toggleLang = (localeMap: LocaleMap) => {
  localeStore.setCurrentLocale({ lang: localeMap.lang })
  changeLocale(localeMap)
}

const activeLang = computed(() => localeStore.getCurrentLocale.lang)

setHtmlLang(localeStore.currentLocale)
console.log(localeStore.currentLocale.lang, `localeStore.currentLocale`)

watch(
  () => localeStore.currentLocale,
  async val => {
    setHtmlLang(val)
  },
  { deep: true }
)
</script>
<template>
  <div class="vx-locale-switch">
    <ElDropdown trigger="click" class="el-dropdown-link">
      <VxIcon icon="ion:language" :size="20" color="var(--theme-text-color)"></VxIcon>
      <template #dropdown>
        <div class="dropdown-menu">
          <div
            :class="activeLang === v.lang ? 'dropdown-item dropdown-item--active' : 'dropdown-item'"
            v-for="v in localeMaps"
            :key="v.lang"
            @click="toggleLang(v)"
          >
            <VxIcon :class="activeLang === v.lang ? '' : 'vx-icon--visible'" icon="ep:check" />
            <span>{{ v.name }}</span>
          </div>
        </div>
      </template>
    </ElDropdown>
  </div>
</template>
<style scoped lang="scss">
@import "./LocaleSwitch.scss";
</style>
