<template>
  <div id="welcome">
    <p v-if="Config.requireLandscapeMode && !landscapeMode" style="text-align: justify">
      Veuillez tourner votre telephone en mode paysage
    </p>
    <div v-else>
      <div v-if="loading" class="loader">
        <img src="../assets/loading.webp">
      </div>
      <FullGame v-show="play && landscapeMode" :user-img="userImg" />
      <CameraAccess v-if="!play" @pictureTaken="pictureTaken"  />
    </div>
  </div>
</template>
<script setup lang="ts">

import CameraAccess from '@/components/CameraAccess.vue'
import FullGame from '@/components/game/FullGame.vue'
import {onMounted, ref} from 'vue'
import Config from '@/components/game/Config'
/*
import { defineAsyncComponent } from 'vue'

const FullGame = defineAsyncComponent({
  loader: () => import('@/components/game/FullGame.vue')
})
*/
const loading = ref(true)
const play = ref(false)
const userImg = ref<any>()
const landscapeMode = ref(false)

onMounted(() => {
  window.addEventListener('game-loaded', () => {
    loading.value = false
  })
  landscapeMode.value = screen.orientation.type.indexOf('landscape') > -1

  if (Config.requireLandscapeMode) {
    window.addEventListener('orientationchange', (event) => {
      landscapeMode.value = screen.orientation.type.indexOf('landscape') > -1
    })
  }
  if (!Config.requestUserPicture) {
    play.value = true
  }
  // loading.value = false
})


function pictureTaken({ img }: { img: any }) {
  // console.log('pic is', img)
  userImg.value = img
  play.value = true
}

</script>
<style scoped>
#welcome {
  display: flex;
  justify-content: center;
  font-family: julien;
  font-size: 7vh;
  color: white;
}
.loader {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
}
</style>
