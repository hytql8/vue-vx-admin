<script setup lang="ts">
import { VxContainer } from "@/components/VxContainer"
import { onMounted, computed } from "vue"
import { ref, reactive } from "vue"
import { roleList, deleteRoleList } from "@/api/user"
import type { ComponentSize, FormInstance } from "element-plus"
import { ElMessage } from "element-plus"
import { useWindowSize } from "@vueuse/core"

const scrollBarRef = ref(null)
const { height } = useWindowSize()
const tableHeight = computed(() => {
  if (scrollBarRef.value) scrollBarRef.value.setScrollTop(height.value)
  return height.value - 335
})
const loading = ref(true)
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const size = ref<ComponentSize>("default")
const background = ref(false)
const disabled = ref(false)
const dialogFormVisible = ref(false)

const updateForm = reactive({
  user: "",
  region: "",
  date: "",
  textarea: ""
})

const getRoleList = async params => {
  loading.value = true
  const res = await roleList(params)
  const data = res.data.data.list
  const totalData = res.data.data.total
  total.value = totalData
  list.value = data
  loading.value = false
}
const handleSizeChange = () => {
  getRoleList({ page: currentPage.value, pageSize: pageSize.value })
  // console.log(`${val} items per page`)
}
const handleCurrentChange = () => {
  getRoleList({ page: currentPage.value, pageSize: pageSize.value })
  // console.log(`current page: ${val}`)
}

onMounted(() => {
  getRoleList({ page: currentPage.value, pageSize: pageSize.value })
})

const list = ref([])

const ruleFormRef = ref<FormInstance>()
const ruleForm = ref({
  user: "",
  region: "",
  date: "",
  textarea: ""
})

const onSubmit = () => {
  console.log("submit!")
  console.log(ruleForm)
  getRoleList({
    page: currentPage.value,
    pageSize: pageSize.value,
    roleName: ruleForm.value.region,
    role: ruleForm.value.user,
    creatTime: ruleForm.value.date,
    remark: ruleForm.value.textarea
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  // console.log(ruleForm)
  ruleForm.value = {
    user: "",
    region: "",
    date: "",
    textarea: ""
  }
  getRoleList({
    page: currentPage.value,
    pageSize: pageSize.value,
    roleName: ruleForm.value.region,
    role: ruleForm.value.user,
    creatTime: ruleForm.value.date,
    remark: ruleForm.value.textarea
  })
}

const deleteTableData = async row => {
  let { roleId } = row
  const res = await deleteRoleList({ roleId })
  getRoleList({ page: currentPage.value, pageSize: pageSize.value })
  console.log(res)
  ElMessage({
    message: res.data.data as unknown as string,
    type: "success"
  })
}

const updateTableData = row => {
  // console.log(row)
  updateForm.date = row.createTime
  updateForm.region = row.roleName
  updateForm.textarea = row.remark
  updateForm.user = row.role
  dialogFormVisible.value = true
}
</script>

<template>
  <VxContainer>
    <div>
      <el-scrollbar style="height: 120px" ref="scrollBarRef">
        <el-form
          ref="ruleFormRef"
          :inline="true"
          :model="ruleForm"
          class="demo-form-inline"
          style="max-width: 1300px"
          label-width="70px"
        >
          <el-form-item label="权限">
            <el-input v-model="ruleForm.user" placeholder="请输入" clearable style="width: 300px" />
          </el-form-item>
          <el-form-item label="权限名">
            <el-input v-model="ruleForm.region" placeholder="请输入" clearable style="width: 300px" />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker v-model="ruleForm.date" type="date" placeholder="请选择" clearable style="width: 300px" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="ruleForm.textarea" style="width: 300px" :rows="2" type="textarea" placeholder="请输入描述" />
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm(ruleFormRef)" style="margin-left: 15px">重置</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div style="margin-top: 30px">
        <el-table v-loading="loading" :data="list" style="width: 100%" :border="true" :height="tableHeight">
          <el-table-column fixed prop="role" label="权限" width="150" />
          <el-table-column prop="roleName" label="权限名" width="120" />
          <el-table-column prop="createTime" label="创建时间" width="120" />
          <el-table-column prop="remark" label="描述" width="820" />

          <el-table-column fixed="right" label="" min-width="100">
            <template #default="{ row }">
              <el-button link type="primary" size="small" @click="updateTableData(row)"> 修改 </el-button>

              <el-popconfirm title="确定删除这一项吗？" @confirm="deleteTableData(row)">
                <template #reference>
                  <el-text size="small" type="danger" style="margin-left: 10px; cursor: pointer">删除</el-text>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="demo-pagination-block" style="margin-top: 15px">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :size="size"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <el-dialog v-model="dialogFormVisible" title="修改权限" width="500">
        <el-form :model="updateForm" label-width="70px">
          <el-form-item label="权限">
            <el-input v-model="updateForm.user" placeholder="请输入" clearable style="width: 300px" />
          </el-form-item>
          <el-form-item label="权限名">
            <el-input v-model="updateForm.region" placeholder="请输入" clearable style="width: 300px" />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker v-model="updateForm.date" type="date" placeholder="请选择" clearable style="width: 300px" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="updateForm.textarea" style="width: 300px" :rows="2" type="textarea" placeholder="请输入描述" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"> 提交 </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </VxContainer>
</template>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
