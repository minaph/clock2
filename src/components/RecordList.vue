<template>
  <TimeControl
    @start="listeners.start"
    @rap="listeners.rap"
    @remove="listeners.remove"
    v-bind="controlValue"
    class="controller"
  >
    <input type="text" v-model="label" class="input" />
  </TimeControl>
  <ul>
    <Record v-for="li in bookrecord.recordlist" :key="li.name" :record="li" />
  </ul>
</template>

<script>
import { BookRecord } from "@/assets/classes.js";
import TimeControl from "./TimeControl";
import Record from "./Record";
export default {
  name: "RecordList",
  components: {
    Record,
    TimeControl,
  },
  props: ["bookrecord"],
  data() {
    return {
      label: "",
    };
  },
  computed: {
    listeners() {
      return {
        start: () => {
          this.bookrecord.start();
          this.bookrecord.save();
        },
        rap: () => {
          this.bookrecord.rap(this.label);
          this.label = "";
          // this.bookrecord.recordlist[0].setLabel(label);
          this.bookrecord.save();
        },
        remove: () => {
          if (!confirm("Are you sure?")) {
            return;
          }
          this.bookrecord.remove();
          this.$emit("update:bookrecord", new BookRecord());

          location.reload();
        },
      };
    },
    prevStartTime() {
      return this.bookrecord.recordlist?.startTime;
    },
    lastPrevious() {
      return this.bookrecord.recordlist?.[0];
    },
    index() {
      return this.bookrecord.bookinfo.index;
    },
    controlValue() {
      return {
        index: this.index,
        prevStartTime: this.prevStartTime,
        lastPrevious: this.lastPrevious,
      };
    },
  },
};
</script>

<style scoped>
.controller {
  margin: 2rem 0 2rem 0;
}

.input {
  /* border: 1px solid black; */
  border: none;
  outline: none;
  padding: 0.1rem;
  background: #ebebeb;
}
/* .input {
  border: none;
} */
</style>
