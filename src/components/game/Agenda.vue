<template>
  <InfoBulle>
    <ul>
      <li class="title">
        En manque d'Opossum ?
      </li>
      <li v-for="next in nextDates" :key="next.event">
        <p>du {{ next.from }} au {{ next.to }}</p>
        <a :href="next.link" target="_blank">{{next.event}}</a> à {{next.location}} {{next.country}}
      </li>
      <li>
        <button @click="restart">Pas eu assez ?</button>
      </li>
    </ul>
  </InfoBulle>
  <div class="op-agenda">

  </div>
</template>
<script setup lang="ts">
import {NextDates} from "@/components/game/NextDates";
import InfoBulle from "@/components/game/InfoBulle.vue";

const emit = defineEmits<{
  (event: 'restart')
}>()

function restart() {
  emit('restart')
}

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