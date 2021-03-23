<template>
  <div>
    <BookInfoControl v-model:bookinfo="bookrecord.bookinfo" />
    <!-- <Controls
      :listeners="listeners"
      :prevStartTime="prevStartTime"
      :lastPrevious="lastPrevious"
    > -->
    <Stats :stats="stats" class="stats" />
    <!-- </Controls> -->
    <RecordList v-model:bookrecord="bookrecord" />
  </div>
</template>

<script>
import RecordList from "./RecordList";
import Stats from "./Stats";
import { BookRecord, RecordStats } from "@/assets/classes.js";
import BookInfoControl from "./BookInfoControl";

export default {
  name: "Home",
  components: {
    RecordList,
    Stats,
    BookInfoControl,
  },
  data() {
    return {
      bookrecord: new BookRecord(),
      stats: new RecordStats(),

    };
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
  },
};
</script>

<style scoped>
.stats {
  margin: 2rem 0 0 5%;
}
</style>
