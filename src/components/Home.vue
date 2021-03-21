<template>
  <div>
    <Controls
      :listeners="listeners"
      v-model="bookrecord.bookinfo"
      :prevStartTime="prevStartTime"
      :lastPrevious="lastPrevious"
    />
    <Stats :stats="stats" />
    <RecordList :list="bookrecord.recordlist" />
  </div>
</template>

<script>
import Controls from "./Controls";
import RecordList from "./RecordList";
import Stats from "./Stats";
import { BookRecord, RecordStats } from "@/assets/classes.js";

export default {
  name: "Home",
  components: {
    Controls,
    RecordList,
    Stats,
  },
  data() {
    return {
      bookrecord: new BookRecord(),
      stats: new RecordStats(),

      // prevStartTime: null,
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
          this.bookrecord.rap();
          this.bookrecord.save();
        },
        remove: () => {
          console.log("remove");
          this.bookrecord.remove();
          this.bookrecord = new BookRecord();

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
  },
  watch: {
    bookrecord: {
      handler() {
        const obj = this.bookrecord.getStats();
        Object.keys(obj).forEach((x) => {
          this.stats[x] = obj[x];
        });
      },
      deep: true,
    },
  },
  created() {
    this.bookrecord.load();
    // window.addEventListener("beforeunload", () => {
    //   this.bookrecord.save();
    // });
  },
  beforeUnmount() {
    // this.bookrecord.save();
  },
  methods: {
    // stats() {
    //   // console.log(this.bookrecord)
    //   // console.log(this.bookrecord.getStats)
    //   // this.bookrecord.start()
    //   // console.log(this.bookrecord.getStats)
    //   if (this.bookrecord.index) {
    //     return this.bookrecord.getStats();
    //   }
    //   return {};
    // },
  },
};
</script>

<style scoped></style>
