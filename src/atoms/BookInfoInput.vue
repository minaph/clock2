<template>
  <span class="label">{{ label }}: </span><input type="text" v-model="value" />
</template>

<script>
export default {
  name: "BookInfoInput",
  props: ["modelValue", "label"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped>
.label {
  display: inline-block;
  width: 3rem;
}
</style>
