<template>
  <ul>
    <Record v-for="li in list" :key="li.name" :record="li"/>
  </ul>
</template>

<script>
import Record from "./Record"
export default {
  name: "RecordList",
  components:{
    Record
  },
  props:["list"]
}
</script>

<style scoped>

</style>