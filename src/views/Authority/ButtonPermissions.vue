<script lang="ts" setup>
import { VxContainer } from "@/components/VxContainer"
import { useRoutersStore } from "@/store/modules/router"
import { computed } from "vue"
import { hasAuth } from "@/directives/auth/utils"

const routersStore = useRoutersStore()

const user = computed(() => {
  console.log(routersStore.getUser)
  return routersStore.getUser
})
const styles = {
  text: {
    marginLeft: "20px"
  },
  card: {
    marginTop: "20px"
  },
  authText: {
    marginBottom: "20px",
    marginLeft: "20px"
  }
}
</script>
<template>
  <VxContainer>
    <div :style="styles">
      <ElText tag="b">当前用户的路由菜单权限：{{ user.roles }} </ElText
      ><ElText type="danger" :style="styles.text"
        >菜单上有role字段的即需要通过此权限过滤菜单,比如系统菜单是需要admin权限的，不匹配则看不到该菜单</ElText
      ><br />
      <ElText tag="b">当前用户的按钮级别权限：{{ user.auths }} </ElText
      ><ElText type="danger" :style="styles.text"
        >页面上可使用v-auth指令来设置按钮级别权限，跟菜单权限一样，拥有权限即可看到该元素，反之看不见</ElText
      >
      <ElCard :style="styles.card">
        <template #header>
          <span>v-auth指令</span>
        </template>
        <div :style="styles.authText">
          <ElText>有create权限时能看到此按钮： </ElText><ElButton v-auth="['create']" type="success">create</ElButton><br />
        </div>
        <div :style="styles.authText">
          <ElText>有read权限时能看到此按钮： </ElText><ElButton v-auth="['read']" type="primary">read</ElButton><br />
        </div>
        <div :style="styles.authText">
          <ElText>有update权限时能看到此按钮： </ElText><ElButton v-auth="['update']" type="warning">update</ElButton><br />
        </div>
        <div :style="styles.authText">
          <ElText>有delete权限时能看到此按钮： </ElText><ElButton v-auth="['delete']" type="danger">delete</ElButton><br />
        </div>
        <div :style="styles.authText" v-if="hasAuth(user.auths)">
          <ElText>有delete权限时能看到此按钮(使用hasAuth,此方式具有响应式)： </ElText
          ><ElButton v-auth="['delete']" type="danger">delete</ElButton><br />
        </div>
        <ElText type="primary" :style="styles.text"
          >切换权限，请点击右上角头像退出登录，切换用户，使用test用户登录，账号：test， 密码test</ElText
        >
      </ElCard>
    </div>
  </VxContainer>
</template>
