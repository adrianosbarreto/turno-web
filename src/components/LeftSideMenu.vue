<template>
  <div v-if="leftSideMenuStore.isCollapsed">
      <div class="left-navigation-overlay" @click="toggleMenu"></div>
          <transition name="slide">
            <div class="left-navigation">

              <div class="logo text-center py-6">
                <p class="logo-text">BNB Bank</p>
              </div>

              <v-divider></v-divider>

              <v-list class="menu-list py-4">
                <v-list-item v-for="menuItem in menuConfigFiltered" :key="menuItem.text" class="px-6" @click="navigateTo(menuItem.route)">
                  <template #prepend>
                    <v-icon :icon="menuItem.icon"/>
                  </template>
                  <v-list-item-title class="item-menu-text text-uppercase ">
                    {{ menuItem.text }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
              <v-list-item class="py-10 px-7" link @click="logout">
                <template #prepend>
                  <v-icon :icon="mdiLogout" />
                </template>
                <v-list-item-title class="item-menu-text text-uppercase " @click="doLogout">
                  Logout
                </v-list-item-title>
              </v-list-item>
            </div>
          </transition>
    </div>
</template>

<script setup lang="ts">
import { useLeftSideMenuStore } from "@/store/LeftSideMenuStore";
import configs from "@/configs";
import { useRouter } from 'vue-router';
import {mdiLogout} from "@mdi/js";
import {logout} from "@/services/AuthService";
import axiosCommon from "@/plugins/axios";
import {useNotificationStore} from "@/store/NotificationStore";

const notificationStore = useNotificationStore();

interface menuItem {
  icon: string;
  text: string;
  route: string;
}

const router = useRouter();

const leftSideMenuStore = useLeftSideMenuStore();

const menuConfig : menuItem[] = configs.sideMenuConfig;

const menuConfigFiltered = menuConfig.filter((item) => {
  return item.route.includes('admin') && localStorage.getItem('user_type') === 'admin'
    || !item.route.includes('admin');
});

async function doLogout(){
  await logout().then((response) => {
    if(response.status === 200) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_type');
      localStorage.removeItem('account_id');
      delete axiosCommon.defaults.headers.common['Authorization'];

      notificationStore.showNotification(
        `${response.data.message}`,
        'success',
        2000
      );

      router.push('/login');

    }
    else{
      notificationStore.showNotification(
        `${response.data.message}`,
        'info',
        2000
      );
    }
  })
}


function toggleMenu() {
  leftSideMenuStore.toggleCollapse();
}

function navigateTo(route: string) {
  toggleMenu();
  if (route) {
    router.push(route);
  }
}
</script>

<style scoped lang="scss">
.left-navigation {
  background-color: #2799fb;
  color: white;
  height: 100%;
  width: 200px;
  position: absolute;
  z-index: 1000;
}

.left-navigation-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 999;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #bde0fe;
  height: 13%;

  &-text {
    font-size: 2rem;
    font-weight: 300;
  }
}

.menu-list{
  background-color: #2799FB;
  color: #FFFFFF;

  font-size: 0.8rem;
}

.item-menu-text{
  font-size: 0.8rem;
  font-weight: 600;
  padding-left: 16px;
}

:deep(.v-list-item__spacer){
  width: 16px;
  display: none;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 10s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

</style>
