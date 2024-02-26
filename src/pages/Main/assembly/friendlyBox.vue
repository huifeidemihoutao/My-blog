<template>
  <div class="friednly_box">
   维护中.....

  </div>
</template>

<script lang='ts' setup>
import { ref } from "vue";
defineProps<{friendlyBoxList:object}>()
</script>

<style lang="less" scoped>
 .friednly_box::v-deep .el-tabs__header{
   padding-left: 10px;
  }
.friednly_box {
  min-height: 60vh;
  width: 100%;
  position: relative;
}
</style>