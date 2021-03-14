<template>
  <div>
    <BookInfoControl
      :bookinfo="modelValue"
      @update="$emit('update:modelValue', $event)"
    />
    <TimeControl
      @start="listeners.start"
      @rap="listeners.rap"
      @remove="listeners.remove"
      :index="modelValue.index"
      :prevStartTime="prevStartTime"
      :lastPrevious="lastPrevious"
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
    prevStartTime: Date,
    lastPrevious: Date
  },
};
</script>

<style scoped></style>
