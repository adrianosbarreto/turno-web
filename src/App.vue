<template>
  <v-app class="d-flex justify-center align-center">
    <v-main class="v-main" max-width="412">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
  .v-main {
    //padding: 1rem;
    height: 100px !important;
    border-radius: 2rem;
    border: #3f51b5 1px solid;
    margin: 2rem;
    overflow: hidden;
  }


</style>
