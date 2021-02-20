<template>
  <li>
    <small class="page">{{ record.name }}</small>
    <!-- <div class="time">8:25:30</div> -->
    <div class="diff">{{ filter(record.diff) }}</div>
  </li>
</template>

<script>
export default {
  name: "Record",
  props: ["record"],
  methods: {
    filter(time) {
      const n = (Math.round(time / 10) / 100 + "").split(".");

      return n[0] + "." + (n[1] || "") + "0".repeat(2 - (n[1] || "").length);
    },
  },
};
</script>

<style scoped>
.page {
  display: inline;
}
.time {
  padding: 0.5rem;
  display: inline;
}
.diff {
  padding: 0.5rem;
  display: inline;
}
</style>
