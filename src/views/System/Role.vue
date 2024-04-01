<script setup lang="tsx">
import { VxContainer } from "@/components/VxContainer"
import { roleList } from "@/api/user"
import { unref, ref } from "vue"
import type { StructureConfig } from "@/components/StructureTypes"
import { useStructure } from "@/hooks/useStructure"
import { Table } from "@/components/Table"
import { useTable } from "@/hooks/useTable"
import { Form } from "@/components/Form"
import { useForm } from "@/hooks/useForm"
import { ElButton, ElMessage, ElTag } from "element-plus"

// onMounted(async () => {
//   const {
//     data: {
//       code,
//       data: { list, total }
//     }
//   } = await roleList({
//     page: 1,
//     pageSize: 10
//   })
//   console.log(code, list, total)
// })

const original: StructureConfig[] = [
  {
    field: "role",
    label: "权限",
    tableConfig: {
      width: 150
    },
    formConfig: {
      component: "Input",
      colProps: {
        span: 6
      }
    }
  },
  {
    field: "roleName",
    label: "权限名",
    tableConfig: {
      width: 150
    },
    formConfig: {
      component: "Input",
      colProps: {
        span: 6
      }
    }
  },
  {
    field: "createTime",
    label: "创建时间",
    tableConfig: {
      width: 150
    },
    formConfig: {
      component: "DatePicker",
      colProps: {
        span: 6
      }
    }
  },
  {
    field: "remark",
    label: "描述",
    tableConfig: {
      prop: "remark",
      slots: {
        default: ({ row: { auths } }) => {
          return auths ? auths.map((v: string) => <ElTag style="margin-right: 15px">{v}</ElTag>) : null
        }
      }
    },
    formConfig: {
      component: "Input",
      componentProps: {
        placeholder: "请选择权限",
        type: "textarea"
      },
      colProps: {
        span: 6
      }
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
              <ElButton type="primary" onClick={() => update(row)}>
                修改
              </ElButton>
              <ElButton type="danger" onClick={() => deletes(row)}>
                删除
              </ElButton>
            </div>
          )
        }
      }
    },
    formConfig: {
      formItemProps: {
        slots: {
          default: () => {
            return (
              <>
                <ElButton onClick={reset}>重置</ElButton>
                <ElButton onClick={search} type="primary">
                  提交
                </ElButton>
              </>
            )
          }
        },
        style: "width:100%;margin-left: 30px"
      },
      colProps: {
        span: 24
      }
    }
  }
]

const { formItems, tableColumns } = useStructure(original)
const query = ref("")
const { tableRegister, tableState, tableMethods } = useTable({
  getDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const {
      data: {
        code,
        data: { list, total }
      }
    } = await roleList({
      page: unref(currentPage),
      pageSize: unref(pageSize)
    })
    return {
      list: code === 200 ? list : [],
      total: code === 200 ? total : 0
    }
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { refresh, getList } = tableMethods

const { formRegister, formMethods } = useForm()
const { getFormData, getElFormExpose } = formMethods

// 重置
const reset = async () => {
  // 获取 form的ref
  const formRef = await getElFormExpose()
  formRef?.resetFields()
  query.value = ""
  getList()
}
// 搜索
const search = async () => {
  const formRef = await getElFormExpose()
  const vali = await formRef.validate()
  if (vali) {
    const { username } = await getFormData()
    query.value = username
    getList()
  } else {
    ElMessage.error("请先填写必填项！")
  }
}

const update = ({ roleId }) => {
  ElMessage.success("执行了更新操作, 操作的roleId=" + roleId)
}

const deletes = ({ roleId }) => {
  ElMessage.error("执行了删除操作, 操作的roleId=" + roleId)
}
</script>
<template>
  <VxContainer>
    <div>
      <div style="margin-top: 20px">
        <Form :schema="formItems" @register="formRegister" />
      </div>
      <div>
        <Table
          :border="true"
          :loading="loading"
          :data="dataList"
          v-model:pageSize="pageSize"
          v-model:currentPage="currentPage"
          style="width: 100%"
          :columns="tableColumns"
          @register="tableRegister"
          @refresh="refresh"
          :pagination="{
            total
          }"
        >
          <template #setting></template>
        </Table>
      </div>
    </div>
  </VxContainer>
</template>
