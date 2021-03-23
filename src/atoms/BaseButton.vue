<template>
  <button class="button" @click="$emit('click')"><slot /></button>
</template>

<script>
export default {
  name: "BaseButton",
};
</script>

<style scoped>
.button {
  border: 1px solid black;
  background: none;
}
</style>
