import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
  const notification = ref({
    message: '',
    type: 'info', // 'success' ou 'error'
    duration: 3000,
  });

  function showNotification(message: string, type = 'info', duration = 3000) {
    notification.value = { message, type, duration };
    setTimeout(() => {
      notification.value = { message: '', type: 'info', duration: 3000 };
    }, duration);
  }

  return {
    notification,
    showNotification,
  };
});
