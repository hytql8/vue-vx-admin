<script setup lang="tsx">
import { VxContainer } from "@/components/VxContainer"
import { userList } from "@/api/user"
import { unref, ref } from "vue"
import { useValidator } from "@/hooks/useValidator"
import type { StructureConfig } from "@/components/StructureTypes"
import { useStructure } from "@/hooks/useStructure"
import { Table } from "@/components/Table"
import { useTable } from "@/hooks/useTable"
import { Form } from "@/components/Form"
import { useForm } from "@/hooks/useForm"
import { ElButton, ElMessage, ElTag, ElText } from "element-plus"

const { required } = useValidator()

const original: StructureConfig[] = [
  {
    field: "username",
    label: "账号",
    tableConfig: {
      width: 150
    },
    formConfig: {
      component: "Input",
      formItemProps: {
        rules: [required()]
      },
      colProps: {
        span: 6
      }
    }
  },
  {
    field: "nickname",
    label: "昵称",
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
    field: "sex",
    label: "性别",
    tableConfig: {
      width: 150,
      slots: {
        default: ({ row: { sex } }) => {
          return sex === 0 ? "女" : sex === 1 ? "男" : ""
        }
      }
    },
    formConfig: {
      component: "Select",
      componentProps: {
        placeholder: "请选择性别",
        options: [
          {
            label: "女",
            value: 0
          },
          {
            label: "男",
            value: 1
          }
        ]
      },
      colProps: {
        span: 6
      }
    }
  },
  {
    field: "age",
    label: "年龄",
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
    field: "auths",
    label: "权限",
    tableConfig: {
      prop: "auths",
      slots: {
        default: ({ row: { auths } }) => {
          return auths ? auths.map((v: string) => <ElTag style="margin-right: 15px">{v}</ElTag>) : null
        }
      }
    },
    formConfig: {
      component: "Select",
      componentProps: {
        multiple: true,
        placeholder: "请选择权限",
        options: [
          {
            label: "创建",
            value: "create"
          },
          {
            label: "读取",
            value: "read"
          },
          {
            label: "更新",
            value: "update"
          },
          {
            label: "删除",
            value: "delete"
          }
        ]
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
              <ElText type="primary" style="margin-right: 15px" onClick={() => update(row)}>
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
        }
      },
      colProps: {
        span: 6
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
    } = await userList({
      username: unref(query),
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

const update = ({ userId }) => {
  ElMessage.success("执行了更新操作, 操作的userId=" + userId)
}

const deletes = ({ userId }) => {
  ElMessage.error("执行了删除操作, 操作的userId=" + userId)
}
</script>
<template>
  <VxContainer>
    <div>
      <ElAlert type="warning">因数据源mockjs原因 当前仅做了账号的搜索，此页面用来展示table与form联动，详情请看代码哈</ElAlert>
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
