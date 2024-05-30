<script setup lang="tsx">
import { unref, ref } from "vue"
import { VxContainer } from "@/components/VxContainer"
import { Table } from "@/components/Table"
import { useTable } from "@/hooks/useTable"
import { ElButton, ElMessage, ElTag } from "element-plus"
import { getUseTableList } from "@/api/table"

const moduleCss = {
  display: "flex",
  alignItems: " center",
  justifyContent: "center",
  width: "100%"
}
const columns = [
  {
    label: "#",
    width: 55,
    type: "selection"
  },
  {
    label: "序号",
    width: 55,
    type: "index"
  },
  {
    field: "id",
    label: "Id",
    prop: "id",
    width: 120
  },
  {
    field: "name",
    label: "名字",
    prop: "name",
    width: 120
  },
  {
    field: "role",
    label: "角色",
    prop: "role"
  },
  {
    field: "sex",
    label: "性别",
    prop: "sex",
    width: 120
  },
  {
    field: "age",
    label: "年龄",
    prop: "age"
  },
  {
    field: "action",
    label: "操作",
    prop: "action",
    width: 150,
    slots: {
      default: () => {
        return (
          <div style={moduleCss}>
            <ElButton type="primary">编辑</ElButton>
            <ElButton type="danger">删除</ElButton>
          </div>
        )
      },
      header: () => {
        return <ElTag effect="dark">操作（tsx插入）</ElTag>
      }
    }
  }
]
const rowClick = e => {
  console.log(e)
}

const { tableRegister, tableState, tableMethods } = useTable({
  getDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getUseTableList({
      page: unref(currentPage),
      pageSize: unref(pageSize)
    })
    return {
      list: res.result.items,
      total: res.result.total
    }
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { getElTableExpose, refresh, setProps, setColumn, getList } = tableMethods

// tabs默认选中
const activeTab = ref("0")
// 展示表格设置列
const showSetting = ref(true)
const slotCount = ref(0)
const showPagination = ref(true)

const settingVisible = () => {
  showSetting.value = !unref(showSetting)
}

const changeSettingText = () => {
  slotCount.value++
}

const paginationVisible = () => {
  showPagination.value = !unref(showPagination)
}

const heightFixed = () => {
  setProps({
    height: 300
  })
}

const heightAutoFixed = () => {
  setProps({
    height: "calc(100dvh - 320px) "
  })
}

const toggleTableAllSelect = async () => {
  const elTableRef = await getElTableExpose()
  unref(elTableRef)!.toggleAllSelection()
}
const isRowSelection = ref(false)
const toggleTableSelect = async () => {
  isRowSelection.value = !unref(isRowSelection)
  const elTableRef = await getElTableExpose()
  unref(elTableRef)!.toggleRowSelection(unref(dataList)[2], unref(isRowSelection))
  unref(elTableRef)!.toggleRowSelection(unref(dataList)[4], unref(isRowSelection))
}

const showStripe = ref(false)

const toggleStripe = () => {
  showStripe.value = !unref(showStripe)
}

const headerCount = ref(1)

const toggleTableHeader = () => {
  setColumn([
    {
      field: "role",
      path: "label",
      value: `角色${unref(headerCount.value)}`
    }
  ])
  getList()
  ElMessage.success("设置成功，请关注role，角色表头的变化")
  headerCount.value++
}
</script>
<template>
  <VxContainer>
    <div class="vx-use-table">
      <ElTabs v-model="activeTab">
        <ElTabPane class="tab-pane" label="插槽" name="0">
          <ElButton type="primary" @click="settingVisible">显示/隐藏 setting插槽</ElButton>
          <ElButton type="primary" @click="changeSettingText">改变setting插槽内容</ElButton>
        </ElTabPane>
        <ElTabPane class="tab-pane" label="分页" name="1">
          <ElButton type="primary" @click="paginationVisible">显示/隐藏 分页</ElButton>
        </ElTabPane>
        <ElTabPane class="tab-pane" label="固定高度" name="2">
          <ElButton type="primary" @click="heightFixed">设置table固定高度</ElButton>
          <ElButton type="primary" @click="heightAutoFixed">设置table占满屏幕</ElButton>
        </ElTabPane>
        <ElTabPane class="tab-pane" label="table选中" name="3">
          <ElButton type="primary" @click="toggleTableAllSelect">设置table 全选/反选</ElButton>
          <ElButton type="primary" @click="toggleTableSelect">设置table单独选中第3第5行</ElButton>
        </ElTabPane>
        <ElTabPane class="tab-pane" label="斑马纹" name="4">
          <ElButton type="primary" @click="toggleStripe">设置table斑马纹 开启/关闭</ElButton>
        </ElTabPane>
        <ElTabPane class="tab-pane" label="修改表头" name="5">
          <ElButton type="primary" @click="toggleTableHeader">设置table表头</ElButton>
        </ElTabPane>
      </ElTabs>
      <Table
        :stripe="showStripe"
        :loading="loading"
        v-model:pageSize="pageSize"
        v-model:currentPage="currentPage"
        style="width: 100%"
        :data="dataList"
        :columns="columns"
        @row-click="rowClick"
        @register="tableRegister"
        @refresh="refresh"
        row-key="id"
        :pagination="
          showPagination
            ? {
                total
              }
            : void 0
        "
      >
        <template #setting v-if="showSetting">{{ slotCount ? `改变了${slotCount}次` : "" }} </template>
      </Table>
    </div>
  </VxContainer>
</template>
<style scoped>
.tab-pane {
  min-height: 50px;
}
</style>
