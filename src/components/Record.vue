<template>
  <li>
    <small class="page">{{record.name}}</small>
    <!-- <div class="time">8:25:30</div> -->
    <div class="diff">{{record.diff/1000}}</div>
  </li>
</template>

<script>
export default {
  name: "Record",
  props:["record"]
};
</script>

<style>
.page{
  display: inline
}
.time{
  padding: 0.5rem;
  display: inline
}
.diff{
  padding: 0.5rem;
  display: inline
}
</style>
