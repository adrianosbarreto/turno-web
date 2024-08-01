<template>
  <v-container class="header pa-0 ma-0" :style="{'background-color':currentHeaderConfig.config.background}">
    <div class="menu">
        <v-icon
          @click="toggleMenu"
          :color="currentHeaderConfig.config.color"
          :icon="mdiMenu"
        >
        </v-icon>
    </div>
    <h1 :class="[currentHeaderConfig.title == title ? 'text-header' : 'text-header-secondary']">
      {{currentHeaderConfig.title}}
    </h1>
  </v-container>
</template>

<script setup lang="ts">
import { useLeftSideMenuStore } from "@/store/LeftSideMenuStore";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import configs from "@/configs";
import {mdiMenu} from "@mdi/js";

const leftSideMenustore = useLeftSideMenuStore();

const route = useRoute();

const title = 'BNB Bank'

const initialAppHeaderConfig = {
  title: title,
  config: configs.headerConfig['default']
};

const currentHeaderConfig = ref(initialAppHeaderConfig);


function toggleMenu() {
  leftSideMenustore.toggleCollapse();
}

watch(() => route.name,
  (currentRouteName) => {

    if(typeof currentRouteName === 'string'){
      if (currentRouteName.toLowerCase() === 'home') {
        currentHeaderConfig.value.config = configs.headerConfig['default'];
        currentHeaderConfig.value.title = title;
      } else {
        currentHeaderConfig.value.config = configs.headerConfig['secondary'];
        currentHeaderConfig.value.title = currentRouteName;
      }
    }
  });

</script>

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

      &-secondary {
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #2799FB;
      }
    }
  }
</style>

