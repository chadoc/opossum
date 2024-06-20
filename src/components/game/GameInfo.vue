<template>
  <InfoBulle>
    <ul>
      <li class="title">
        Vient à notre rencontre !
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
        <button @click="start">Commence !</button>
      </li>
    </ul>
  </InfoBulle>
</template>
<script setup lang="ts">
import InfoBulle from "@/components/game/InfoBulle.vue";

const emit = defineEmits<{
  (event: 'start'): void
}>()

function start() {
  emit('start')
}

</script>