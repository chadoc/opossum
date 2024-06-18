<template>
  <div class="op-agenda">
    <ul>
      <li style="font-size: 30px">
        En manque d'Opossum ?
      </li>
      <li v-for="next in nextDates" :key="next.event">
        <p>du {{ next.from }} au {{ next.to }}</p>
        <a :href="next.link" target="_blank">{{next.event}}</a> à {{next.location}} {{next.country}}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import {NextDates} from "@/components/game/NextDates";

const dateOptions = {
  // weekday: 'none',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

const nextDates = NextDates.filter(date => {
  const to = new Date(date.to)
  const now = new Date()
  return now.getTime() < to.getTime()
}).map(date => {
  return {
    ...date,
    from: new Date(date.from).toLocaleDateString(undefined, dateOptions),
    to: new Date(date.to).toLocaleDateString(undefined, dateOptions)
  }
})

</script>
<style scoped>
.op-agenda {
  z-index: 999999;
  position: relative;
  background-image: url('./../../assets/speech3.png');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;
}

.op-agenda ul {
  list-style-type: none;
  font-family: julien;
  color: black;
  font-size: 23px;
}
.op-agenda li {
  text-align: center;
  margin: 20px 0 20px 0;
}
</style>