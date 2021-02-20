<template>
  <div class="stats">
    <StatsElement
      name="Mean"
      :value="filter(stats.mean) + ' ± ' + filter(stats.std) + ' Sec'"
    />
    <StatsElement name="Expected End" :value="expect()" />
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
  methods: {
    filter(time) {
      const n = (Math.round(time / 10) / 100 + "").split(".");

      return n[0] + "." + (n[1] || "") + "0".repeat(2 - (n[1] || "").length);
    },
    expect() {
      const result = [
        this.stats.expectedEnd.toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        this.filter(this.stats.expectedRange / 60) + " Min",
      ];
      return result.join(" ± ");
    },
  },
};
</script>

<style scoped>
.stats {
  margin: 0.5rem;
}
</style>
