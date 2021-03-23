<template>
  <p class="clock">
    {{
      new Date().toLocaleString("en-JP", {
        hour: "numeric",
        minute: "numeric",
      })
    }}
  </p>
</template>

<script>
export default {};
</script>

<style>
.clock {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
