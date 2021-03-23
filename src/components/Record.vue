<template>
  <li>
    <small class="page">{{ record.name }}</small>
    <!-- <div class="time">8:25:30</div> -->
    <div class="diff">{{ filter(record.diff) }}</div>
    <input class="input" type="text" v-model="value" />
  </li>
</template>

<script>
export default {
  name: "Record",
  props: ["record"],
  methods: {
    filter(time) {
      const n = (Math.round(time / 10) / 100 + "").split(".");

      return n[0] + "." + (n[1] || "") + "0".repeat(2 - (n[1] || "").length);
    },
  },
  computed: {
    value: {
      get() {
        return this.record.label;
      },
      set(label) {
        console.log(label)
        this.record.setLabel(label);
      },
    },
  },
};
</script>

<style scoped>
.page {
  display: inline;
}
.time {
  padding: 0.5rem;
  display: inline;
}
.diff {
  padding: 0.5rem;
  display: inline;
}

.input {
  border: none;
}

.input:focus {
  border: 1px solid black;
}
</style>
