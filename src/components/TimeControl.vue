<template>
  <div class="control time">
    <div class="box">
      <div class="upper">
        <small>{{ index }}</small>
        <span class="sum">{{ filter(time) }}</span>
        <span class="now">{{ filter(recording) }}</span>
      </div>

      <div class="input-box"><slot /></div>
    </div>
    <div class="buttons">
      <BaseButton @click="start">Start</BaseButton>
      <!-- <button>Stop</button> -->
      <BaseButton @click="rap" class="rap">Rap</BaseButton>
      <BaseButton @click="reset" class="reset">Reset</BaseButton>
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
      previous: new Date(),
    };
  },
  props: ["index", "prevStartTime", "lastPrevious"],
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
  created() {
    this.startTime = this.prevStartTime;
    if (this.startTime) {
      if (this.lastPrevious) {
        this.previous = this.lastPrevious;
      } else {
        this.previous = this.startTime;
      }
      setInterval(() => {
        this.now = new Date();
      }, 50);
    }
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
    reset() {
      this.$emit("remove");
    },
  },
};
</script>

<style scoped>
.buttons {
  display: inline-block;
  margin-top: 0.5rem;
  padding-left: 2rem;
}

.now {
  display: inline-block;
  padding: 0rem 0.5rem 0rem 0.5rem;
  font-size: 1.5rem;
  width: 7rem;
  margin: 0 0 0 0;
}
.sum {
  display: inline-block;
  padding: 0rem 0 0 2rem;
  font-size: 1.1rem;
  width: 5rem;
  text-align: right;
  margin-bottom: 0;
}
/* .control {
  margin-bottom: 1rem;
  margin-top: 1rem;
} */

.rap {
  width: 5rem;
}

.input-box {
  /* display: inline-block; */
  margin: 0.3rem 0 0rem 0;
  text-align: center;
}

.box {
  display: inline-block;
}
</style>
