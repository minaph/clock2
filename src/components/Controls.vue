<template>
  <div>
    <BookInfoControl
      :bookinfo="modelValue"
      @update="$emit('update:modelValue', $event)"
    />
    <TimeControl
      @start="listeners.start"
      @rap="listeners.rap"
      :index="modelValue.index"
    />
  </div>
</template>

<script>
import TimeControl from "./TimeControl";
import BookInfoControl from "./BookInfoControl";

export default {
  name: "Controls",
  components: {
    TimeControl,
    BookInfoControl,
  },
  props: {
    listeners: Object,
    modelValue: Object,
  },
};
</script>

<style scoped></style>
