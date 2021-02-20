<template>
  <div>
    <Controls :listeners="listeners" v-model="bookrecord.bookinfo" />
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
    };
  },
  computed: {
    listeners() {
      return {
        start: () => this.bookrecord.start(),
        rap: () => this.bookrecord.rap(),
      };
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

<style></style>
