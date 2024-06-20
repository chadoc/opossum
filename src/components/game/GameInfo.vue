<template>
  <InfoBulle>
    <ul>
      <li class="title">
        Viens à notre rencontre !
      </li>
      <li>
        Oriente ton téléphone en mode paysage.
      </li>
      <li>
        Chatouille Niko avec ton pouce.
      </li>
      <li>
        Rends visite aux Opossums.
      </li>
      <li>
        MatchMedia: {{ matchMedia }}
      </li>
      <li>
        <button @click="start">Commence !</button>
      </li>
    </ul>
  </InfoBulle>
</template>
<script setup lang="ts">
import InfoBulle from "@/components/game/InfoBulle.vue";
import {computed, onMounted} from "vue";

const emit = defineEmits<{
  (event: 'start'): void
}>()

function start() {
  emit('start')
}

const matchMedia = computed(() => {
  return window.matchMedia("(max-width: 768px)").matches
})

onMounted(() => {
  window.matchMedia("(max-width: 768px)").matches
})

</script>