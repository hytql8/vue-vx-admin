<script setup lang="ts">
import "./Profile.scss"
import { reactive, ref, onMounted } from "vue"
import { VxIcon } from "@/components/VxIcon"
import type { FormInstance, FormRules } from "element-plus"
import { userList } from "@/api/user/index"

type UserInfo = {
  userId?: number
  username?: string
  password?: string
  roleId?: number
  roles?: string[]
  auths?: string[]
  sex?: number
  age?: number
  nickname?: string
  signature?: string
  position?: string
  company?: string
  department?: string
  group?: string
  address?: string
  skills?: string[]
  tags?: string[]
  email?: string
  streetAddress?: string
  phone?: string
}

interface RuleForm {
  name: string
  sex: string
  email: string
  desc: string
  streetAddress: string
  phone: string
}
const ruleFormRef = ref<FormInstance>()
const activeName = ref("first")
const getUserList = async params => {
  const res = await userList(params)
  const userInfos = res.data.data.list[0]
  userInfo.value = userInfos
  ruleForm.name = userInfos.nickname
  ruleForm.sex = userInfos.sex === 0 ? "女" : "男"
  ruleForm.email = userInfos.email
  ruleForm.streetAddress = userInfos.streetAddress
  ruleForm.phone = userInfos.phone
}

onMounted(() => {
  getUserList({ username: "admin", page: 1, pageSize: 10 })
})

const userInfo = ref<UserInfo>({})
const ruleForm = reactive<RuleForm>({
  name: "",
  sex: "",
  email: "",
  desc: "",
  streetAddress: "",
  phone: ""
})
const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  sex: [
    {
      required: true,
      message: "请选择性别",
      trigger: "change"
    }
  ],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
})
const qqLogo = new URL("@/assets/imgs/QQ.png", import.meta.url).href
const vxLogo = new URL("@/assets/imgs/Vx.png", import.meta.url).href
const alipayLogo = new URL("@/assets/imgs/Alipay.png", import.meta.url).href
const url = new URL("@/assets/imgs/Avatar.png", import.meta.url).href
const circleUrl = ref(url)

const onSubmit = () => {
  console.log("submit!")
}
</script>

<template>
  <div class="profile">
    <div class="profile__card">
      <el-card shadow="never" style="max-width: 480px; height: 650px; padding: 0 10px">
        <div class="profile__info-top">
          <div>
            <el-avatar :size="105" :src="circleUrl" />
          </div>
          <div class="info-top-title">{{ userInfo.nickname }}</div>
          <div class="info-top-text">{{ userInfo.signature }}</div>
        </div>
        <div class="profile__info-middle">
          <div class="info">
            <VxIcon icon="charm:person"></VxIcon>
            <span>{{ userInfo.position }}</span>
          </div>
          <div class="info">
            <VxIcon icon="ant-design:home-outlined"></VxIcon>
            <span>{{ `${userInfo.company}-${userInfo.department}-${userInfo.group}` }}</span>
          </div>
          <div class="info">
            <VxIcon icon="basil:location-outline"></VxIcon>
            <span>{{ userInfo.address }}</span>
          </div>
          <div class="info">
            <VxIcon icon="mage:tag"></VxIcon>
            <span>{{ userInfo.skills?.join(",") }}</span>
          </div>
        </div>
        <el-divider />
        <div class="profile__info-bottom">
          <div class="info-bottom-text">标签</div>
          <div class="info-bottom-tag">
            <ElTag v-for="tag in userInfo.tags" :key="tag" class="tag">{{ tag }}</ElTag>
          </div>
        </div>
      </el-card>
    </div>
    <div class="personalEdit">
      <el-card class="personalCard" shadow="never" style="min-width: 480px; height: 650px; padding: 0 0 0 0">
        <el-tabs v-model="activeName">
          <div>
            <el-tab-pane label="基本信息" name="first">
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="auto"
                style="max-width: 600px; margin: 25px 24px"
              >
                <el-form-item label="昵称：" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入您的昵称" />
                </el-form-item>
                <el-form-item label="性别：" prop="sex">
                  <el-select v-model="ruleForm.sex" placeholder="请选择您的性别">
                    <el-option label="保密" value="secrecy" />
                    <el-option label="男" value="male" />
                    <el-option label="女" value="female" />
                  </el-select>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                  <el-input v-model="ruleForm.email" placeholder="请输入您的邮箱" />
                </el-form-item>
                <el-form-item label="个人简介：">
                  <el-input v-model="ruleForm.desc" type="textarea" :rows="4" />
                </el-form-item>
                <el-form-item label="街道地址：">
                  <el-input v-model="ruleForm.streetAddress" placeholder="请输入街道地址" />
                </el-form-item>
                <el-form-item label="联系电话：">
                  <el-input v-model="ruleForm.phone" placeholder="请输入联系电话" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="margin-left: 82px; margin-top: 10px" @click="onSubmit">保存更改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </div>
          <el-tab-pane label="账号绑定" name="second">
            <div class="profile__account">
              <div class="account-item">
                <div class="item-text">
                  <div class="title">密保手机</div>
                  <div class="text">已绑定手机：158****8256</div>
                </div>
                <div>
                  <el-link type="primary">去修改</el-link>
                </div>
              </div>
              <el-divider />
              <div class="account-item">
                <div class="item-text">
                  <div class="title">密保邮箱</div>
                  <div class="text">已绑定邮箱：78456@eclouds.com</div>
                </div>
                <div>
                  <el-link type="primary">去修改</el-link>
                </div>
              </div>
              <el-divider />
              <div class="account-item">
                <div class="item-text">
                  <div class="title">密保问题</div>
                  <div class="text">未设置密保问题</div>
                </div>
                <div>
                  <el-link type="primary">去设置</el-link>
                </div>
              </div>
              <el-divider />
              <div class="account-item">
                <div class="item">
                  <div>
                    <img :src="qqLogo" class="item-logo" />
                  </div>
                  <div class="item-text">
                    <div class="title">绑定QQ</div>
                    <div class="text">当前未绑定QQ账号</div>
                  </div>
                </div>
                <div>
                  <el-link type="primary">去绑定</el-link>
                </div>
              </div>
              <el-divider />
              <div class="account-item">
                <div class="item">
                  <div>
                    <img :src="vxLogo" class="item-logo" />
                  </div>
                  <div class="item-text">
                    <div class="title">绑定微信</div>
                    <div class="text">当前未绑定微信账号</div>
                  </div>
                </div>
                <div>
                  <el-link type="primary">去绑定</el-link>
                </div>
              </div>
              <el-divider />
              <div class="account-item">
                <div class="item">
                  <div>
                    <img :src="alipayLogo" class="item-logo" />
                  </div>
                  <div class="item-text">
                    <div class="title">绑定支付宝</div>
                    <div class="text">当前未绑定支付宝账号</div>
                  </div>
                </div>
                <div>
                  <el-link type="primary">去绑定</el-link>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs__item) {
  padding: 0 20px 10px 20px;
  font-size: 16px;
}
:deep(--el-tabs-header-height) {
  height: 55px;
}
:deep(.personalCard .el-card__body) {
  padding: 13px 27px;
}
:deep(.el-divider--horizontal) {
  margin: 21px 0;
}
</style>
