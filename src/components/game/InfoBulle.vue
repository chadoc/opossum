<template>
  <div class="op-agenda">
    <slot>
    </slot>
  </div>
</template>
<script setup lang="ts"></script>
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


</style>