<script lang='tsx' setup>
import { getStaticSource } from '@/utils/index'
import { VxIcon } from '@/components/VxIcon';

const url = getStaticSource('@/assets/imgs/Avatar.png')

</script>
<template>
<div class="vx-avatar">
    <ElDropdown placement="bottom" trigger="click" class="el-dropdown-link">
       <div class="vx-dropdown">
        <span class="vx-dropdown__username">系统管理员</span>
        <ElAvatar
            :size="30"
            :src="url"
          />
       </div>
      <template #dropdown>
        <ElDropdownMenu>
            <ElDropdownItem>
                <VxIcon icon="ant-design:user-outlined" />
              <span class="vx-dropdown-item__text">个人中心</span>
            </ElDropdownItem>
            <ElDropdownItem>
                <VxIcon icon="ant-design:unlock-outlined" />
              <span class="vx-dropdown-item__text">修改密码</span>
            </ElDropdownItem>
            <ElDropdownItem>
                <VxIcon icon="mdi:logout" />
              <span class="vx-dropdown-item__text">退出登录</span>
            </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
</div>
</template>
<style lang="scss" scoped>
@import "./Avatar.scss"
</style>