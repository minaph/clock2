<template>
  <div>
    <span class="label">{{ name }}: </span
    ><span class="value">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: "StatsElement",
  props: ["name", "value"],
};
</script>

<style scoped>
.label {
  display: inline-block;
  width: 8rem;
}
.value {
  display: inline-block;
  font-weight: bold;
}
</style>
