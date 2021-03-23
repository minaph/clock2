<template>
  <div>
    <div class="inner-stats">
      <Clock class="clock" />

      <StatsElement
        name="Mean"
        :value="filter(stats.mean) + ' ± ' + filter(stats.std) + ' Sec'"
      />
      <StatsElement name="Expected End" :value="expect()" />
    </div>
  </div>
</template>

<script>
import StatsElement from "@/atoms/StatsElement";
import Clock from "@/atoms/Clock";
export default {
  name: "Stats",
  components: {
    StatsElement,
    Clock,
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
.inner-stats {
  padding: 0.5rem;
  border: solid 1px grey;
  display: inline-block;
}
.clock {
  margin: 0 0 0.5rem 0;
}
</style>
