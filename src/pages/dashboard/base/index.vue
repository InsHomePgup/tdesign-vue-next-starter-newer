<script setup lang="ts">
import MiddleChart from './components/MiddleChart.vue'
import OutputOverview from './components/OutputOverview.vue'
import RankList from './components/RankList.vue'
import TopPanel from './components/TopPanel.vue'

defineOptions({
  name: 'DashboardBase',
})
</script>

<template>
  <div>
    <!-- 顶部 card  -->
    <TopPanel class="row-container" />
    <!-- 中部图表  -->
    <MiddleChart class="row-container" />
    <!-- 列表排名 -->
    <RankList class="row-container" />
    <!-- 出入库概览 -->
    <OutputOverview class="row-container" />
  </div>
</template>

<style scoped>
.row-container:not(:last-child) {
  margin-bottom: 16px;
}
</style>
