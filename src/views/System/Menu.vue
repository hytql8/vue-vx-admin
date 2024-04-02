<script setup lang="tsx">
import { getRouterList } from "@/api/user"
import { onMounted } from "vue"
import { VxContainer } from "@/components/VxContainer"
import { unref, ref } from "vue"
import type { StructureConfig } from "@/components/StructureTypes"
import { useStructure } from "@/hooks/useStructure"
import { Table } from "@/components/Table"
import { useTable } from "@/hooks/useTable"
import { Form } from "@/components/Form"
import { useForm } from "@/hooks/useForm"
import { ElButton, ElText, ElMessage, ElTag } from "element-plus"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

onMounted(async () => {
  const {
    data: {
      code,
      data: { list, total }
    }
  } = await getRouterList({
    page: 1,
    pageSize: 10
  })
  console.log(code, list, total)
})

const original: StructureConfig[] = [
  {
    type: "expand",
    tableConfig: {
      width: 100
    },
    formConfig: {
      hidden: true
    }
  },
  {
    field: "meta.icon",
    label: "图标",
    tableConfig: {
      width: 100,
      slots: {
        default: ({ row }) => {
          return <VxIcon icon={row.meta.icon} />
        }
      }
    },
    formConfig: {
      hidden: true
    }
  },
  {
    field: "meta.title",
    label: "路由名",
    tableConfig: {
      width: 180,
      slots: {
        default: ({ row }) => {
          return <div>{t(row.meta.title)}</div>
        }
      }
    },
    formConfig: {
      hidden: true
    }
  },
  {
    field: "path",
    label: "路径",
    tableConfig: {},
    formConfig: {
      hidden: true
    }
  },
  {
    field: "search",
    tableConfig: {
      width: 150,
      slots: {
        default: ({ row }) => {
          return (
            <div style="display:flex;align-items:center">
              <ElText type="primary" style="margin-right: 15px;" onClick={() => update(row)}>
                修改
              </ElText>
              <ElText type="danger" onClick={() => deletes(row)}>
                删除
              </ElText>
            </div>
          )
        }
      }
    },
    formConfig: {
      hidden: true
    }
  }
]

const { tableRegister, tableState, tableMethods } = useTable({
  getDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const {
      data: {
        code,
        data: { list, total }
      }
    } = await getRouterList({
      page: unref(currentPage),
      pageSize: unref(pageSize)
    })
    return {
      list: code === 200 ? list : [],
      total: code === 200 ? total : 0
    }
  }
})
const { tableColumns } = useStructure(original)
const { loading, dataList, currentPage, pageSize } = tableState
const { refresh } = tableMethods

const update = ({ name }) => {
  ElMessage.success("执行了更新操作, 操作的name=" + name)
}

const deletes = ({ name }) => {
  ElMessage.error("执行了删除操作, 操作的name=" + name)
}
</script>
<template>
  <VxContainer>
    <div>
      <Table
        row-key="path"
        default-expand-all
        :border="true"
        :loading="loading"
        :data="dataList"
        v-model:pageSize="pageSize"
        v-model:currentPage="currentPage"
        style="width: 100%"
        :columns="tableColumns"
        @register="tableRegister"
        @refresh="refresh"
      >
        <template #setting></template>
      </Table>
    </div>
  </VxContainer>
</template>
