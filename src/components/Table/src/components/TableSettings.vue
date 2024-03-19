<script lang="tsx">
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from "element-plus"
import type { ComponentSize } from "element-plus"
import { computed, defineComponent, unref, ref, VNode } from "vue"
import type { PropType } from "vue"
import { VxIcon } from "@/components/VxIcon"
import { useAppStore } from "@/store/modules/app"
import { useI18n } from "vue-i18n"

export default defineComponent({
  name: "TableSetting",
  props: {
    slot: {
      type: Object as PropType<VNode>
    }
  },
  emits: ["changeSize", "refresh", "changeFullScreen"],

  setup(props, { emit }) {
    const appStore = useAppStore()
    const columnSize = computed(() => appStore.getColumnSize)
    const { t } = useI18n()

    const changeSize = (size: ComponentSize) => {
      emit("changeSize", size)
    }

    const refresh = () => {
      emit("refresh")
    }

    const isFullSrceen = ref(false)

    const changeFullScreen = () => {
      isFullSrceen.value = !unref(isFullSrceen)
      emit("changeFullScreen", unref(isFullSrceen))
    }

    return () => (
      <div class="vx-table-setting-style">
        <div class="setting-slot">{props.slot}</div>
        <div class="setting-option">
          <VxIcon onClick={refresh} class="vx-icon" color="var(--el-text-color-regular)" size={22} icon="mdi:refresh" />
          <ElDropdown trigger="click" onCommand={changeSize}>
            {{
              default: () => (
                <VxIcon class="vx-icon" color="var(--el-text-color-regular)" size={18} icon="mdi:arrow-expand-vertical" />
              ),
              dropdown: () => {
                return (
                  <ElDropdownMenu>
                    {{
                      default: () => {
                        return unref(columnSize).map((v: string) => (
                          <ElDropdownItem key={v} command={v}>
                            {t(`size.${v}`)}
                          </ElDropdownItem>
                        ))
                      }
                    }}
                  </ElDropdownMenu>
                )
              }
            }}
          </ElDropdown>
          {/* <ElPopover placement="bottom" title="Title" width={200} trigger="click">
            {{
              default: () => {
                return (
                  <>
                    <div>设置</div>
                  </>
                )
              },
              reference: () => {
                return (
                  <>
                    <VxIcon
                      class="vx-icon"
                      color="var(--el-text-color-regular)"
                      size={18}
                      icon="material-symbols:settings-outline"
                    />
                  </>
                )
              }
            }}
          </ElPopover> */}

          <VxIcon
            class="vx-icon"
            onClick={changeFullScreen}
            color="var(--el-text-color-regular)"
            size={18}
            icon="material-symbols:fullscreen"
          />
        </div>
      </div>
    )
  }
})
</script>
<style lang="scss" scoped>
@use "./TableSetting.scss";
</style>
