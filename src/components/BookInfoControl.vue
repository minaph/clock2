<template>
  <details class="bookinfo">
    <summary>Book info details</summary>
    <div class="infolist">
      <div v-for="k in Object.keys(bookinfo)" :key="k">
        {{ k }}: <input type="text" v-model="info[k]" />
      </div>

      <!-- Title: <input type="text" v-model="info.title" /> -->
    </div>
    <button @click="$emit('update', cinfo)">register</button>
  </details>
</template>

<script>
export default {
  name: "BookInfoControl",
  props: {
    bookinfo: Object,
  },
  data() {
    return {
      info: this.bookinfo,
    };
  },
  computed: {
    cinfo() {
      const obj = this.info;
      "start end step index".split(" ").forEach((x) => {
        obj[x] = this.info[x] - 0;
      });
      obj.setStart(obj.start);
      return obj;
    },
  },
};
</script>

<style scoped>
.bookinfo {
  margin-bottom: 0.5rem;
}
</style>
