<template>

  <v-main class="v-main" max-width="412">
    <MainHeader/>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">

import MainHeader from "@/components/MainHeader.vue";
</script>


<style scoped lang="scss">
.v-main {
  height: 100px !important;
  border-radius: 2rem;
  border: #3f51b5 1px solid;
  margin: 2rem;
  overflow: hidden;
}
</style>
