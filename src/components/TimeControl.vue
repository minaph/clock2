<template>
  <div class="control time">
    <p>{{new Date().toLocaleString("en-JP", {hour: "numeric", minute: "numeric"})}}</p>
    <small>{{ index }}</small>
    <p class="now">{{ time / 1000 }}</p>
    <div class="buttons">
      <button @click="start">Start</button>
      <!-- <button>Stop</button> -->
      <button @click="$emit('rap')" class="rap">Rap</button>
      <!-- <button>Reset</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeControl",
  data() {
    return {
      startTime: null,
      now: new Date(),
    };
  },
  props: ["index"],
  computed: {
    time() {
      if (this.startTime) {
        return this.now.getTime() - this.startTime.getTime();
      }
      return 0;
    },
  },
  methods: {
    start() {
      this.$emit("start");
      this.startTime = new Date();
      this.now = this.startTime;
      setInterval(() => {
        this.now = new Date();
      }, 50);
    },
  },
};
</script>

<style>
.buttons {
  display: inline;
}
.now {
  display: inline;
  padding: 2rem;
  font-size: 1.5rem;
}
.control {
  margin-bottom: 1rem;
}

.rap {
  width: 5rem;
}
</style>
