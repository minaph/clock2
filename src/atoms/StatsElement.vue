<template>
  <div>
    {{ name }}: <b>{{ value }}</b>
  </div>
</template>

<script>
export default {
  name: "StatsElement",
  props: ["name", "value"],
};
</script>

<style></style>
