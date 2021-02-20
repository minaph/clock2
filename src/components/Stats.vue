<template>
  <div class="stats">
    <StatsElement name="Mean" :value="Math.round(stats.mean)/1000 + ' ± ' + Math.round(stats.std)/1000 + '秒'" />
    <StatsElement name="Expected End" :value="stats.expectedEnd && stats.expectedEnd.toLocaleString('ja-JP')" />
  </div>
</template>

<script>
import StatsElement from "@/atoms/StatsElement";
export default {
  name: "Stats",
  components: {
    StatsElement,
  },
  props: ["stats"],
};
</script>

<style>
.stats {
  margin: 0.5rem;
}
</style>
