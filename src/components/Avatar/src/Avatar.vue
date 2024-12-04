<script lang="ts" setup>
import { computed, ref, reactive } from "vue"
import { VxIcon } from "@/components/VxIcon"
import { useI18n } from "vue-i18n"
import { useAppStore } from "@/store/modules/app"
import { useLocaleStore } from "@/store/modules/locale"
import { useRoutersStore } from "@/store/modules/router"
import { useTagsStore } from "@/store/modules/tags"

import { outLogin } from "@/api/user"
import { ElMessageBox, ElMessage, FormInstance, FormRules, progressProps } from "element-plus"
import { useStorage } from "@/hooks/useStorage"
import { useRouter } from "vue-router"
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElAvatar, ElLoading } from "element-plus"
import { property } from "lodash"

const appStore = useAppStore()
const localeStore = useLocaleStore()
const routersStore = useRoutersStore()
const tagsStore = useTagsStore()
const dialogFormVisible = ref(false)
const formLabelWidth = "100px"
const ruleFormRef = ref<FormInstance>()

const passwordPass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入旧密码"))
  } else {
    callback()
  }
}

const newPasswordPass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入新密码"))
  } else if (value.length > 16 || value.length < 6) {
    callback(new Error("请输入6到16位密码"))
  } else if (value === ruleForm.password) {
    callback(new Error("新密码不能与旧密码相同"))
  } else {
    callback()
  }
}

const confirmNewPasswordPass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请确认新密码"))
  } else if (value.length > 16 || value.length < 6) {
    callback(new Error("请输入6到16位密码"))
  } else if (value !== ruleForm.newPassword) {
    callback(new Error("新密码与当前密码不一致"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  password: "",
  newPassword: "",
  confirmNewPassword: ""
})

const rules = reactive<FormRules<typeof ruleForm>>({
  password: [{ required: true, validator: passwordPass, trigger: "blur" }],
  newPassword: [{ required: true, validator: newPasswordPass, trigger: "blur" }],
  confirmNewPassword: [{ required: true, validator: confirmNewPasswordPass, trigger: "blur" }]
  // confirmNewPassword: [{ validator: validatePass2, trigger: "blur" }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      dialogFormVisible.value = false
      ElMessage({
        message: "修改成功！",
        type: "success"
      })
      formEl.resetFields()
    } else {
      ElMessage.error("提交失败！")
    }
  })
}

const cancelForm = (formEl: FormInstance | undefined) => {
  dialogFormVisible.value = false
  formEl.resetFields()
}

const { clear } = useStorage("localStorage")

const isFold = computed(() => appStore.getIsFold)
const isSeemMoblie = computed(() => appStore.getIsSeemMoblie)

defineOptions({
  name: "VxAvatar"
})

const { t } = useI18n()
const { push } = useRouter()

const url = new URL("@/assets/imgs/Avatar.png", import.meta.url).href

//个人中心
const goToUserInfo = () => {
  push("/personal/profile")
}

//修改密码
const changePassword = () => {
  dialogFormVisible.value = true
}

// 退出登录
const loginOut = () => {
  ElMessageBox.confirm(t("login.outDesp"), t("login.warn"), {
    confirmButtonText: t("login.confirm"),
    cancelButtonText: t("login.cancel"),
    type: "warning"
  }).then(async () => {
    const loadingInstance = ElLoading.service({ fullscreen: true })
    const {
      data: { code }
    } = await outLogin()
    console.log(code)
    if (code === 200) {
      // 清除本地user和路由缓存
      clear()
      // 清除状态管理
      appStore.$reset()
      localeStore.$reset()
      routersStore.$reset()
      tagsStore.$reset()
      ElMessage({
        type: "success",
        message: t("login.outSuccess")
      })
      push({
        name: "Login"
      })
      loadingInstance.close()
    }
  })
}
</script>
<template>
  <div class="vx-avatar">
    <ElDropdown placement="bottom" trigger="click" class="el-dropdown-link">
      <div class="vx-dropdown">
        <!-- eslint-disable  -->
        <span :class="isSeemMoblie ? (isFold ? 'vx-dropdown__username' : 'vx-dropdown__username--fold') : 'vx-dropdown__username'"
          >系统管理员</span
        >
        <!-- eslint-enable  -->
        <ElAvatar :size="30" :src="url" />
      </div>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem @click="goToUserInfo">
            <VxIcon icon="ant-design:user-outlined" />
            <span class="vx-dropdown-item__text">{{ t("personalCenter.personalCenter") }}</span>
          </ElDropdownItem>
          <ElDropdownItem @click="changePassword">
            <VxIcon icon="ant-design:unlock-outlined" />
            <span class="vx-dropdown-item__text">{{ t("personalCenter.changePassword") }}</span>
          </ElDropdownItem>
          <ElDropdownItem>
            <VxIcon icon="mdi:logout" />
            <span class="vx-dropdown-item__text" @click="loginOut">{{ t("personalCenter.loginOut") }}</span>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>

  <el-dialog v-model="dialogFormVisible" title="修改密码" width="450">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
      <el-form-item label="旧密码" :label-width="formLabelWidth" prop="password">
        <el-input
          v-model="ruleForm.password"
          autocomplete="off"
          type="password"
          :show-password="true"
          placeholder="请输入旧密码"
        />
      </el-form-item>
      <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
        <el-input
          v-model="ruleForm.newPassword"
          autocomplete="off"
          type="password"
          :show-password="true"
          placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmNewPassword">
        <el-input
          v-model="ruleForm.confirmNewPassword"
          autocomplete="off"
          type="password"
          :show-password="true"
          placeholder="请再次输入新密码"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelForm(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
@use "./Avatar.scss";
</style>
