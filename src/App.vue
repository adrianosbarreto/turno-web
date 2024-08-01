<template>
  <v-app class="app-content">
    <v-main class="main-content" max-width="412">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">


.app-content{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    height: 100vh;
  }

  :deep(.v-application__wrap){
    height: 90vh;

  }

  .main-content{
    position: relative;
    min-height: 90vh;
    max-height: 90vh;
    border-radius: 2rem;
    border: #3f51b5 1px solid;
    margin: 2rem;
    overflow: hidden;

    @media (max-width: 480px) {
      height: 100vh;
      border: none;
    }
  }

}

</style>
