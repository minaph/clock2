<template>
  <div class="control time">
    <small>{{ index }}</small>
    <p class="now">{{ filter(time) }}</p>
    <p class="this">{{ filter(recording) }}</p>
    <div class="buttons">
      <button @click="start">Start</button>
      <!-- <button>Stop</button> -->
      <button @click="rap" class="rap">Rap</button>
      <!-- <button>Reset</button> -->
    </div>
    <p class="clock">
      {{
        new Date().toLocaleString("en-JP", {
          hour: "numeric",
          minute: "numeric",
        })
      }}
    </p>
  </div>
</template>

<script>
export default {
  name: "TimeControl",
  data() {
    return {
      startTime: null,
      now: new Date(),
      previous: new Date(),
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
    recording() {
      if (this.startTime) {
        return this.now.getTime() - this.previous.getTime();
      }
      return 0;
    },
  },
  methods: {
    start() {
      this.$emit("start");
      this.startTime = new Date();
      this.now = this.startTime;
      this.previous = this.now;
      setInterval(() => {
        this.now = new Date();
      }, 50);
    },
    rap() {
      this.$emit("rap");
      this.previous = new Date();
    },
    filter(time) {
      const n = (Math.round(time / 10) / 100 + "").split(".");

      return n[0] + "." + (n[1] || "") + "0".repeat(2 - (n[1] || "").length);
    },
  },
};
</script>

<style scoped>
.buttons {
  display: inline;
}
.this {
  display: inline-block;
  padding: 0rem 0.5rem 1rem 0.5rem;
  font-size: 1.5rem;
  width: 7rem;
  margin-bottom: 0;
}
.now {
  display: inline-block;
  padding: 0rem 0 1rem 2rem;
  font-size: 1.1rem;
  width: 5rem;
  text-align: right;
  margin-bottom: 0;
}
.control {
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.rap {
  width: 5rem;
}
.clock {
  font-size: 1.2rem;
  margin: 0 0 0 1rem;
}
</style>
