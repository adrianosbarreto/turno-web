<template>
  <v-main class="v-main" max-width="412">
    <LeftSideMenu/>
    <MainHeader/>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">

import MainHeader from "@/components/MainHeader.vue";
import LeftSideMenu from "@/components/LeftSideMenu.vue";
</script>


<style scoped lang="scss">
.v-main {
  position: relative;
  height: 60vh;
  border-radius: 2rem;
  border: #3f51b5 1px solid;
  margin: 2rem;
  overflow: hidden;
}
</style>
