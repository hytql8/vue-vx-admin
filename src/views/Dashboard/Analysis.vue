<script lang="ts" setup>
import { ref, onMounted, unref } from "vue"
import { VxIcon } from "@/components/VxIcon"
import { getAnalysisData } from "@/api/analysis"
import { ElMessage } from "element-plus"
import { useECharts } from "@/hooks/useEcharts"
import { EChartsOption } from "echarts"
// echarts初始化
const projectStatistic = ref<Nullable<HTMLDivElement>>()
const email = ref<Nullable<HTMLDivElement>>()

// useEcharts初始化
const pageData = ref<any>({})
// 请求数据
const getData = async () => {
  const { data } = await getAnalysisData()
  if (data.code === 200) {
    return data.data.list
  } else {
    ElMessage.error("数据请求失败~")
    return null
  }
}

onMounted(async () => {
  pageData.value = await getData()
})
onMounted(async () => {
  const data = await getData()
  if (!data) return
  const options = {
    xAxis: {
      data: data.projectStatistic.xAxis
    },
    yAxis: {},
    series: [
      {
        data: data.projectStatistic.yAxis1,
        type: "line",
        stack: "x"
      },
      {
        data: data.projectStatistic.yAxis2,
        type: "line",
        stack: "x"
      }
    ]
  }
  const { setOptions } = useECharts(projectStatistic)
  setOptions(options as EChartsOption)
})
onMounted(async () => {
  const data = await getData()
  if (!data) return
  const options = {
    series: [
      {
        type: "pie",
        data: data.email,
        roseType: "area",
        radius: ["40%", "70%"]
      }
    ]
  }
  const { setOptions } = useECharts(email)
  setOptions(options as EChartsOption)
})

const loading = ref(false)
</script>
<template>
  <div>
    <ElSkeleton style="width: 240px" :loading="loading" animated :throttle="500">
      <template #template>
        <div class="analysis">
          <ElCard>
            <div>
              <ElSkeletonItem variant="image" style="width: 50px; height: 50px" />
            </div>
            <div>
              <ElSkeletonItem variant="text" style="margin-right: 16px" />
              <ElSkeletonItem variant="text" style="width: 30%" />
            </div>
          </ElCard>

          <ElCard>
            <div>
              <ElSkeletonItem variant="image" style="width: 50px; height: 50px" />
            </div>
            <div>
              <ElSkeletonItem variant="text" style="margin-right: 16px" />
              <ElSkeletonItem variant="text" style="width: 30%" />
            </div>
          </ElCard>
          <ElCard>
            <div>
              <ElSkeletonItem variant="image" style="width: 50px; height: 50px" />
            </div>
            <div>
              <ElSkeletonItem variant="text" style="margin-right: 16px" />
              <ElSkeletonItem variant="text" style="width: 30%" />
            </div>
          </ElCard>
          <ElCard>
            <div>
              <ElSkeletonItem variant="image" style="width: 50px; height: 50px" />
            </div>
            <div>
              <ElSkeletonItem variant="text" style="margin-right: 16px" />
              <ElSkeletonItem variant="text" style="width: 30%" />
            </div>
          </ElCard>
        </div>
      </template>
      <template #default>
        <div class="analysis">
          <div class="analysis-left">
            <div class="card-area">
              <ElCard class="analysis-el-card" shadow="hover" v-for="v in pageData.jingangDistrict" :key="v.name">
                <div class="analysis-card">
                  <div class="analysis-card-lf">
                    <VxIcon :icon="v.icon" :color="v.color" :hover-color="v.color" :size="50" />
                  </div>
                  <div class="analysis-card-rt">
                    <p class="t1">{{ v.num }}</p>
                    <p class="t2">{{ v.name }}</p>
                  </div>
                </div>
              </ElCard>
            </div>
            <div class="small-charts-area">
              <ElCard class="small-charts-area-lf" shadow="never"
                ><div class="small-charts-area-lf__header">
                  <p class="t1">Project Statistic</p>
                  <VxIcon
                    :size="20"
                    icon="lucide:ellipsis"
                    color="var(--theme-text-color)"
                    hover-color="var(--theme-text-color)"
                  />
                </div>
                <div class="small-charts-area-lf__charts" ref="projectStatistic"></div
              ></ElCard>
              <ElCard class="small-charts-area-rt" shadow="never"
                ><div class="small-charts-area-rt__header">
                  <p class="t1">Email</p>
                  <VxIcon
                    :size="20"
                    icon="lucide:ellipsis"
                    color="var(--theme-text-color)"
                    hover-color="var(--theme-text-color)"
                  />
                </div>
                <div class="small-charts-area-lf__charts" ref="email"></div
              ></ElCard>
            </div>
            <div class="large-charts-area">
              <ElCard shadow="never">
                <div class="large-charts-area__header">
                  <p class="t1">Statistic</p>
                  <VxIcon
                    :size="20"
                    icon="lucide:ellipsis"
                    color="var(--theme-text-color)"
                    hover-color="var(--theme-text-color)"
                  />
                </div>
                <div class="large-charts-area__charts"></div>
              </ElCard>
            </div>
          </div>
          <div class="analysis-right">
            <ElCard class="analysis-server-status" shadow="never">
              <div class="analysis-server-status__header">
                <p class="t1">Server Status</p>
                <VxIcon :size="20" icon="lucide:ellipsis" color="var(--theme-text-color)" hover-color="var(--theme-text-color)" />
              </div>
              <div class="analysis-server-status__container">
                <div class="analysis-server-status__progress"><ElProgress :percentage="50" /></div>
                <div class="analysis-server-status__progress"><ElProgress :percentage="50" /></div>
                <div class="analysis-server-status__progress"><ElProgress :percentage="50" /></div>
                <div class="analysis-server-status__progress"><ElProgress :percentage="50" /></div>
                <div class="analysis-server-status__progress"><ElProgress :percentage="50" /></div>
              </div>
              <div class="analysis-server-status__footer">
                <ElStatistic title="Daily active users" :value="268500" />
                <ElStatistic title="Daily active users" :value="268500" />
                <ElStatistic title="Daily active users" :value="268500" />
              </div>
            </ElCard>
            <ElCard class="analysis-market-previews" shadow="never">
              <div class="analysis-market-previews__header">
                <p class="t1">Market Previews</p>
                <VxIcon :size="20" icon="lucide:ellipsis" color="var(--theme-text-color)" hover-color="var(--theme-text-color)" />
              </div>
              <ElScrollbar class="analysis-market-previews-out-box">
                <div class="analysis-market-previews__container" v-for="v in 10">
                  <div class="container-lf">
                    <div class="lf-icon"></div>
                    <div class="lf-text">
                      <div class="t1">LTC/USD</div>
                      <div class="t2">March</div>
                    </div>
                  </div>
                  <div class="container-rt">
                    <div class="t1">120.45</div>
                    <div class="t2">1.24%</div>
                  </div>
                </div>
              </ElScrollbar>
            </ElCard>
            <ElCard class="analysis-project" shadow="never">
              <div class="analysis-project__header">
                <p class="t1">Project</p>
                <VxIcon :size="20" icon="lucide:ellipsis" color="var(--theme-text-color)" hover-color="var(--theme-text-color)" />
              </div>
              <div class="analysis-project__container">
                <ElScrollbar class="project-list">
                  <div class="project-list-for" v-for="v in 10">
                    <ElProgress :percentage="50" />
                    <div class="progress-tips">
                      <div class="t1">Web Design</div>
                      <div class="t2">61 times</div>
                    </div>
                  </div>
                </ElScrollbar>
                <div class="project-tag">
                  <div class="title">Tag</div>
                  <div class="tags">
                    <ElTag style="margin-right: 16px">#JavaScript</ElTag>
                    <ElTag style="margin-right: 16px">#Java</ElTag>
                    <ElTag style="margin-right: 16px">#TypeScript</ElTag>
                  </div>
                </div>
              </div>
            </ElCard>
          </div>
        </div>
      </template>
    </ElSkeleton>
  </div>
</template>
<style scoped>
@import "./Analysis.scss";
</style>
