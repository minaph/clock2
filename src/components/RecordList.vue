<template>
  <TimeControl
    @start="start"
    @rap="rap"
    @remove="remove"
    v-bind="controlValue"
    class="controller"
  >
    <input type="text" v-model="label" class="input" @blur="save" />
  </TimeControl>
  <ul>
    <Record
      v-for="li in bookrecord.recordlist"
      :key="li.name"
      :record="li"
      @blur="save"
    />
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
      label: localStorage.getItem("goingTaskName") || "",
    };
  },
  computed: {
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
  methods: {
    start() {
      this.bookrecord.start();
      this.save();
    },
    rap() {
      this.bookrecord.rap(this.label);
      this.label = "";
      // this.bookrecord.recordlist[0].setLabel(label);
      this.save();
    },
    remove() {
      if (!confirm("Are you sure?")) {
        return;
      }
      this.bookrecord.remove();
      this.$emit("update:bookrecord", new BookRecord());

      localStorage.removeItem("goingTaskName");

      location.reload();
    },
    save() {
      localStorage.setItem("goingTaskName", this.label);
      this.bookrecord.save();
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
