<script lang="ts" setup>
import { ref } from "vue"
import { VxIcon } from "@/components/VxIcon"
/**
 * #FF626D
 * #7D6AEB
 * #3CC2E0
 * #F07758
 */
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
              <ElCard class="analysis-el-card" shadow="hover">
                <div class="analysis-card">
                  <div class="analysis-card-lf">
                    <VxIcon icon="ant-design:project-filled" color="#F07758" hover-color="#F07758" :size="50" />
                  </div>
                  <div class="analysis-card-rt">
                    <p class="t1">932</p>
                    <p class="t2">project</p>
                  </div>
                </div>
              </ElCard>
              <ElCard class="analysis-el-card" shadow="hover">
                <div class="analysis-card">
                  <div class="analysis-card-lf">
                    <VxIcon icon="ant-design:project-filled" color="#F07758" hover-color="#F07758" :size="50" />
                  </div>
                  <div class="analysis-card-rt">
                    <p class="t1">932</p>
                    <p class="t2">project</p>
                  </div>
                </div>
              </ElCard>
              <ElCard class="analysis-el-card" shadow="hover">
                <div class="analysis-card">
                  <div class="analysis-card-lf">
                    <VxIcon icon="ant-design:project-filled" color="#F07758" hover-color="#F07758" :size="50" />
                  </div>
                  <div class="analysis-card-rt">
                    <p class="t1">932</p>
                    <p class="t2">project</p>
                  </div>
                </div>
              </ElCard>
              <ElCard class="analysis-el-card" shadow="hover">
                <div class="analysis-card">
                  <div class="analysis-card-lf">
                    <VxIcon icon="ant-design:project-filled" color="#F07758" hover-color="#F07758" :size="50" />
                  </div>
                  <div class="analysis-card-rt">
                    <p class="t1">932</p>
                    <p class="t2">project</p>
                  </div>
                </div>
              </ElCard>
            </div>
            <div class="small-charts-area">
              <ElCard class="small-charts-area-lf" shadow="never"
                ><div class="small-charts-area-lf__header">
                  <p class="t1">Project Statistic</p>
                  <VxIcon
                    :size="30"
                    icon="lucide:ellipsis"
                    color="var(--theme-text-color)"
                    hover-color="var(--theme-text-color)"
                  /></div
              ></ElCard>
              <ElCard class="small-charts-area-rt" shadow="never"
                ><div class="small-charts-area-rt__header">
                  <p class="t1">Emall</p>
                  <VxIcon
                    :size="30"
                    icon="lucide:ellipsis"
                    color="var(--theme-text-color)"
                    hover-color="var(--theme-text-color)"
                  /></div
              ></ElCard>
            </div>
          </div>
          <div class="analysis-right">
            <ElCard class="analysis-server-status">
              <div class="analysis-server-status__header">
                <p class="t1">Server Status</p>
                <VxIcon :size="30" icon="lucide:ellipsis" color="var(--theme-text-color)" hover-color="var(--theme-text-color)" />
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
          </div>
        </div>
      </template>
    </ElSkeleton>
  </div>
</template>
<style scoped>
@import "./Analysis.scss";
</style>
