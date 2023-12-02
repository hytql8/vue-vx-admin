<script lang="ts" setup>
import { watch, computed } from "vue"
import { VxIcon } from "@/components/VxIcon"
import { useLocaleStore } from "@/store/modules/locale"
import { setHtmlLang } from "@/hooks/useLocale"

const localeStore = useLocaleStore()

defineOptions({
  name: "VxLocaleSwitch"
})

const localeMaps = computed(() => localeStore.getLocaleMap)

const toggleLang = (localeMap: LocaleMap) => {
  localeStore.setCurrentLocale({ lang: localeMap.lang })
}

setHtmlLang(localeStore.currentLocale)

watch(
  () => localeStore.currentLocale,
  async val => {
    setHtmlLang(val)
  },
  { deep: true }
)
</script>
<template>
  <div class="locale-switch">
    <ElDropdown trigger="click" class="el-dropdown-link">
      <VxIcon icon="ion:language" :size="20" color="var(--theme-text-color)"></VxIcon>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem v-for="v in localeMaps" :key="v.lang" @click="toggleLang(v)">{{ v.name }}</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>
<style scoped lang="scss">
@import "./LocaleSwitch.scss";
</style>
