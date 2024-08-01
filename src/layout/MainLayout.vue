<template>
    <LeftSideMenu/>
    <MainHeader/>
    <router-view class="h-100" />
    <Notification />
</template>

<script setup lang="ts">

import MainHeader from "@/components/MainHeader.vue";
import LeftSideMenu from "@/components/LeftSideMenu.vue";
import Notification from "@/components/Notification.vue";
</script>


<style scoped lang="scss">
//.v-main {
//  position: relative;
//  height: 30vh;
//  border-radius: 2rem;
//  border: #3f51b5 1px solid;
//  margin: 2rem;
//  overflow: hidden;
//
//  @media (max-width: 480px) {
//    height: 100vh;
//    margin: 0;
//    border: none;
//  }
//}


</style>
