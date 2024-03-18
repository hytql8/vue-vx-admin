<script setup lang="ts">
import { VxIcon } from "@/components/VxIcon"
import { ref, Ref } from "vue"

const url = new URL("@/assets/imgs/Avatar.png", import.meta.url).href

const weathers = [
  {
    src: "meteocons:clear-day-fill",
    tips: "今天天气晴朗，18℃ - 22℃，适合外出~"
  },
  {
    src: "meteocons:drizzle-fill",
    tips: "今天天气有小雨，12℃ - 16℃，外出记得带伞，做好保暖~"
  },
  {
    src: "meteocons:thunderstorms-extreme-fill",
    tips: "今天天气雷阵雨，10℃ - 14℃，外出请注意安全，尽量不要外出~"
  }
]
const randomIndex = Math.floor(Math.random() * weathers.length)
const weather = ref({}) as unknown as Ref<{
  src: string
  tips: string
}>
weather.value = weathers[randomIndex]

const activities: {
  content: string
  timestamp: string
  type?: "success" | "danger" | "primary" | "warning" | "info"
}[] = [
  {
    content: "hytql8 pushed to hytql8/VxAdmin",
    timestamp: "2024-03-17",
    type: "success"
  },
  {
    content: "hytql8 closed pull request Dev in hytql8/VxAdmin",
    timestamp: "2024-03-15",
    type: "danger"
  },
  {
    content: "zhangsan pushed to hytql8/VxAdmin",
    timestamp: "2024-03-05",
    type: "primary"
  },
  {
    content: "zhangsan pull request Dev in hytql8/VxAdmin",
    timestamp: "2024-03-05"
  },
  {
    content: "hytql8 pull request Dev in hytql8/VxAdmin",
    timestamp: "2024-03-05"
  },
  {
    content: "hytql8 pull request Dev in hytql8/VxAdmin",
    timestamp: "2024-03-05"
  },
  {
    content: "hytql8 pull request Dev in hytql8/VxAdmin",
    timestamp: "2024-03-05"
  },
  {
    content: "hytql8 pull request Dev in hytql8/VxAdmin",
    timestamp: "2024-03-05"
  }
]

const member: {
  id: number | string
  avatar?: string
  username?: string
  sex?: number | string
  status?: number | string
  time?: string
}[] = [
  {
    id: 7,
    avatar: new URL("@/assets/imgs/Avatar.png", import.meta.url).href,
    username: "hytql8",
    sex: 1,
    status: 1,
    time: "2023-10-01"
  },
  {
    id: 8,
    avatar: new URL("@/assets/imgs/avatar2.png", import.meta.url).href,
    username: "花子丶",
    sex: 1,
    status: 2,
    time: "2023-11-01"
  },
  {
    id: 9,
    avatar: new URL("@/assets/imgs/avatar1.png", import.meta.url).href,
    username: "小埋",
    sex: 0,
    status: 1,
    time: "2023-11-01"
  },
  {
    id: 10,
    avatar: new URL("@/assets/imgs/avatar3.png", import.meta.url).href,
    username: "veliot",
    sex: 0,
    status: 0,
    time: "2023-12-07"
  },
  {
    id: 11,
    avatar: new URL("@/assets/imgs/avatar4.png", import.meta.url).href,
    username: "zhangsan",
    sex: 1,
    status: 0,
    time: "2023-12-31"
  },
  {
    id: 12,
    avatar: new URL("@/assets/imgs/avatar5.png", import.meta.url).href,
    username: "wangmazi",
    sex: 2,
    status: 1,
    time: "2024-01-01"
  }
]
</script>
<template>
  <div>
    <ElCard shadow="never">
      <div class="workplace-header">
        <div class="header-left">
          <ElAvatar class="header-left__avatar" :size="50" :src="url"></ElAvatar>
          <div class="header-left__tips">
            <div class="tips-greeting">早安, 系统管理员, 开始您一天的工作吧!</div>
            <div class="tips-weather">
              <VxIcon :icon="weather.src" :size="20" /><span>{{ weather.tips }}</span>
            </div>
          </div>
        </div>
        <div class="header-right">
          <ElStatistic class="static" :value="20">
            <template #title>
              <div class="static-title"><VxIcon icon="octicon:project-symlink-24" :size="14" /><span>项目数</span></div>
            </template></ElStatistic
          >
          <ElStatistic class="static" :value="6">
            <template #title>
              <div class="static-title"><VxIcon icon="map:travel-agency" :size="14" /><span>代办项</span></div>
            </template></ElStatistic
          >
          <ElStatistic class="static" :value="18">
            <template #title>
              <div class="static-title"><VxIcon icon="eva:message-circle-outline" :size="14" /><span>消息</span></div>
            </template></ElStatistic
          >
        </div>
      </div>
    </ElCard>
    <div class="workplace-module">
      <ElCard shadow="hover" class="module-card">
        <div class="module-box">
          <VxIcon icon="mdi:account" color="#69c0ff" hover-color="var(--theme-color)" :size="30" />
          <span>用户</span>
        </div>
      </ElCard>
      <ElCard shadow="hover" class="module-card">
        <div class="module-box">
          <VxIcon icon="ri:line-chart-line" color="rgb(149, 222, 100)" hover-color="var(--theme-color)" :size="30" />
          <span>分析</span>
        </div>
      </ElCard>
      <ElCard shadow="hover" class="module-card">
        <div class="module-box">
          <VxIcon icon="ri:line-chart-line" color="rgb(255, 156, 110)" hover-color="var(--theme-color)" :size="30" />
          <span>分析</span>
        </div>
      </ElCard>
      <ElCard shadow="hover" class="module-card">
        <div class="module-box">
          <VxIcon icon="ri:line-chart-line" color="rgb(179, 127, 235)" hover-color="var(--theme-color)" :size="30" />
          <span>分析</span>
        </div>
      </ElCard>
      <ElCard shadow="hover" class="module-card">
        <div class="module-box">
          <VxIcon icon="ri:line-chart-line" color="rgb(255, 192, 105)" hover-color="var(--theme-color)" :size="30" />
          <span>分析</span>
        </div>
      </ElCard>
    </div>
    <div class="workplace-active">
      <ElCard shadow="never" class="active-card">
        <template #header>
          <div class="card-header">
            <span>动态</span>
          </div>
        </template>
        <ElScrollbar :height="250">
          <ElTimeline style="max-width: 600px">
            <ElTimelineItem
              v-for="(activity, index) in activities"
              :type="activity.type"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </ElTimelineItem>
          </ElTimeline>
        </ElScrollbar>
      </ElCard>
      <ElCard shadow="never" class="active-card">
        <template #header>
          <div class="card-header">
            <span>成员</span>
          </div>
        </template>
        <ElScrollbar :height="250">
          <div class="member-list" v-for="v in member" :key="v.id">
            <div class="member-list__left">
              <ElAvatar :src="v.avatar" :size="30" />
              <!-- <span>{{ v.username }}</span> -->
              <div class="user-message">
                <span class="username">{{ v.username }}</span>
                <span class="user-message__detail">
                  <VxIcon
                    v-if="v.sex === 1 || v.sex === 0"
                    :icon="v.sex === 1 ? 'ant-design:man-outlined' : 'ant-design:woman-outlined'"
                    :color="v.sex === 1 ? '#33A3EC' : '#F6425A'"
                    :hover-color="v.sex === 1 ? '#33A3EC' : '#F6425A'"
                  />
                  <span v-else class="scr">保密</span>
                  <span class="time">加入时间：{{ v.time }}</span>
                </span>
              </div>
            </div>
            <div class="member-list__right">
              <!--@ts-ignore-->
              <ElTag :type="`${v.status === 0 ? 'info' : v.status === 1 ? 'success' : 'danger'}`">
                {{ v.status === 0 ? "离线" : v.status === 1 ? "在线" : "已停用" }}
              </ElTag>
            </div>
          </div>
        </ElScrollbar>
      </ElCard>
    </div>
  </div>
</template>

<style scoped>
@import "./Workplace.scss";
</style>
