<template>
  <v-container class="header pa-0 ma-0">
    <div class="menu">
        <v-icon
          @click="toggleMenu"
        >
          mdi-menu
        </v-icon>
    </div>

    <h1 class="text-header">BNB Bank</h1>
  </v-container>
</template>

<style scoped lang="scss">

  .header {
    background-color: #BDE0FE;
    color: white;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4.5rem; //36px
    position: relative;

    .menu{
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }

    .text-header {
      font-size: 1.5rem;
      font-weight: 300;
      color: #FFFFFF;
      text-align: center;
      width: 100vw;
    }
  }

</style>
<script setup lang="ts">
  import { useLeftSideMenuStore } from "@/store/LeftSideMenuStore";

  const leftSideMenustore = useLeftSideMenuStore();

  function toggleMenu() {
    leftSideMenustore.toggleCollapse();
  }




</script>
