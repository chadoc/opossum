<template>
  <div id="container">
<!--    <img id="userImg" :src="userImg" />-->
    <canvas id="collisionCanvas1" ref="collisionCanvas1"></canvas>
    <canvas id="canvas1" ref="canvas1"></canvas>
    <div id="toolbar">
      <button @click="toggleFullScreen">FullScreen</button>
      <button @click="restart">Restart</button>
    </div>
    <div class="hiddenAsset">
<!--      <audio src="../../assets/liquid.wav" preload="auto" />-->
      <audio v-if="Config.backgroundSound" autoplay>
        <source src="../../assets/spirit.mp3" type="audio/mpeg">
      </audio>
    </div>
    <div ref="agenda" :style="{ width: agendaWidth, height: agendaHeight }">
      <Agenda v-if="gameEnded" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref, unref} from 'vue'
import {triggerGame} from '@/components/game/Game'
import {Game} from '@/components/game/Game'
import Config from '@/components/game/Config'
import Agenda from "@/components/game/Agenda.vue";

const props = defineProps<{
  userImg?: any | undefined
}>()

const canvas1 = ref<HTMLCanvasElement>()
const collisionCanvas1 = ref<HTMLCanvasElement>()
const fullScreenButton = ref<HTMLButtonElement>()
const agendaWidth = ref('100%')
const agendaHeight = ref('100%')

const game = ref<Game>()
// TODO preload img/wav

const gameEnded = ref(false)

const style = computed(() => {
  const width = canvas1.value?.width
  const height = width * ( 9/16)
  return {
    width,
    height
  }
})

function computeAgendaSize() {
  const height = canvas1.value!.height - (canvas1.value!.height * 0.5)
  const width = height * (656/520)
  agendaWidth.value = `${width}px`
  agendaHeight.value = `${height}px`
}

onMounted(() =>  {
  const canvas = unref(canvas1)!
  const collisionCanvas = unref(collisionCanvas1)!

  const { innerWidth, innerHeight } = window
  canvas.width = innerWidth
  canvas.height = innerHeight
  collisionCanvas.width = innerWidth
  collisionCanvas.height = innerHeight

  window.addEventListener('load', function() {
    game.value = triggerGame(canvas, collisionCanvas)
    //game.value?.toggleFullScreen()
  })

  window.addEventListener('game-resized', function() {
    computeAgendaSize()
  })

  window.addEventListener('game-ended', function() {
    gameEnded.value = true
  })

})

function toggleFullScreen() {
  game.value?.toggleFullScreen()
}

function restart() {
  window.location.reload()
}

</script>
<style scoped>
#container {
  display: flex;
  justify-content: center;
}

#canvas1, #collisionCanvas1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid white;
  max-width: 100%;
  max-height: 100%;
}
#collisionCanvas1 {
  //background: red;
  opacity: 0;
}
.hiddenAsset {
  display: none;
}
#toolbar {
  display: flex;
  justify-content: center;
  gap: 3px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  max-height: 40px;
}
#toolbar button {
  font-family: julien;
  font-size: 20px;
  padding: 10px;
}
</style>
