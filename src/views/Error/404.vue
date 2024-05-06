<script lang="ts" setup>
import { ElResult } from "element-plus"
import { VxIcon } from "@/components/VxIcon"
import { useI18n } from "@/hooks/useI18n"

const { t } = useI18n()
</script>
<template>
  <div>
    <ElResult title="404" :sub-title="t('result.notFound')">
      <template #icon>
        <VxIcon icon="ic:outline-error-outline" color="var(--el-color-danger)" :size="60" hover-color="var(--el-color-danger)" />
      </template>
    </ElResult>
  </div>
</template>
