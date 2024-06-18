<template>
  <div class="op-agenda">
    <ul>
      <li v-for="next in nextDates" :key="next.event">
        <p>{{ next.from }} - {{ next.to }}</p>
        <a :href="next.link" target="_blank">{{next.event}}</a> à {{next.location}} {{next.country}}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import {NextDates} from "@/components/game/NextDates";

const nextDates = NextDates.filter(date => {
  const to = new Date(date.to)
  const now = new Date()
  return now.getTime() < to.getTime()
})

</script>
<style scoped>
.op-agenda {
  padding: 20px 20px 20px 20px;
  z-index: 999999;
  position: absolute;
  background-image: url('./../../assets/speech3.png');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>