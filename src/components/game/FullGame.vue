<template>
  <div id="container">
<!--    <img id="userImg" :src="userImg" />-->
    <canvas id="collisionCanvas1" ref="collisionCanvas1"></canvas>
    <canvas id="canvas1" ref="canvas1"></canvas>
    <div id="toolbar">
      <!--<button @click="toggleFullScreen">FullScreen</button>-->
    </div>
    <div class="hiddenAsset">
<!--      <audio src="../../assets/liquid.wav" preload="auto" />-->
      <audio v-if="Config.backgroundSound" autoplay>
        <source src="../../assets/spirit.mp3" type="audio/mpeg">
      </audio>
    </div>
    <div ref="agenda" class="agenda-container" :style="{ width: agendaWidth, height: agendaHeight }">
      <GameInfo v-if="showGameInfo" @start="start" />
      <Agenda v-if="gameEnded" @restart="start" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref, unref} from 'vue'
import {triggerGame} from '@/components/game/Game'
import {Game} from '@/components/game/Game'
import Config from '@/components/game/Config'
import Agenda from "@/components/game/Agenda.vue";
import GameInfo from "@/components/game/GameInfo.vue";

const props = defineProps<{
  userImg?: any | undefined
}>()

const canvas1 = ref<HTMLCanvasElement>()
const collisionCanvas1 = ref<HTMLCanvasElement>()
const agendaWidth = ref('100%')
const agendaHeight = ref('100%')

const game = ref<Game>()
// TODO preload img/wav

const showGameInfo = ref(false)
const gameEnded = ref(false)

const style = computed(() => {
  const width = canvas1.value!.width
  const height = width * ( 9/16)
  return {
    width,
    height
  }
})

function computeInfoBulleSize() {
  const height = canvas1.value!.height - (canvas1.value!.height * 0.15)

  const width = height * (656/520)
  agendaWidth.value = `${width}px`
  agendaHeight.value = `${height}px`
}

async function start() {
  const canvas = unref(canvas1)!
  const collisionCanvas = unref(collisionCanvas1)!
  game.value = triggerGame(canvas, collisionCanvas)
  await toggleFullScreen()
  showGameInfo.value = false
  gameEnded.value = false
}

onMounted(() =>  {
  const canvas = unref(canvas1)!
  const collisionCanvas = unref(collisionCanvas1)!

  const { innerWidth, innerHeight } = window
  canvas.width = innerWidth
  canvas.height = innerWidth * (9 / 16)
  collisionCanvas.width = innerWidth
  collisionCanvas.height = innerHeight

  computeInfoBulleSize()

  window.addEventListener('load', function() {
    showGameInfo.value = true
  })

  window.addEventListener('game-resized', function() {
    computeInfoBulleSize()
  })
  window.addEventListener('game-ended', function() {
    gameEnded.value = true
  })
})

async function toggleFullScreen() {
  return game.value?.toggleFullScreen()
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
  /* border: 5px solid white; */
  max-width: 100%;
  max-height: 100%;
}
#collisionCanvas1 {
  /* background: red; */
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
.agenda-container {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
