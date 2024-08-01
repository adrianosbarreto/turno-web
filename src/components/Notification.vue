<template>
  <transition name="fade" class="w-100">
    <v-card elevation="0" v-if="notification.message"
            class="d-flex justify-center align-center w-100"
            :class="['notification', notification.type]" @click="hide">
      <span class="text-center">{{ notification.message }}</span>
    </v-card>
  </transition>
</template>

<script setup>
import { useNotificationStore } from '@/store/NotificationStore';
import { computed } from 'vue';

const notificationStore = useNotificationStore();

const notification = computed(() => notificationStore.notification);

function hide() {
  notificationStore.notification.message = '';
}
</script>

<style scoped>
.notification {
  position: absolute;
  bottom: 2.5rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
  width: 92% !important;

}

.success, .info{
  background-color: #F1F9FE;
  color: #2799FB;
}

.error {
  background-color: #f44336;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
