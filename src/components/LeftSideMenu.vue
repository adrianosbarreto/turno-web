<template>
  <div v-if="!leftSideMenuStore.isCollapsed">
      <div class="left-navigation-overlay" @click="toggleMenu"></div>

        <div class="left-navigation">
          <div class="logo text-center py-6">
            <p class="logo-text">BNB Bank</p>
          </div>

          <v-divider></v-divider>

          <v-list class="menu-list py-4">
            <v-list-item v-for="menuItem in menuConfig" :key="menuItem.text" class="px-6" @click="navigateTo(menuItem.route)">
              <template #prepend>
                <v-icon :icon="menuItem.icon"/>
              </template>
              <v-list-item-title class="item-menu-text text-uppercase ">
                {{ menuItem.text }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list-item class="px-6" link @click="logout">
            <template #prepend>
              <v-icon icon="mdi mdi-home" />
            </template>
            <v-list-item-title class="item-menu-text text-uppercase ">
              Logout
            </v-list-item-title>
          </v-list-item>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLeftSideMenuStore } from "@/store/LeftSideMenuStore";
import configs from "@/configs";
import { useRouter } from 'vue-router';

interface menuItem {
  icon: string;
  text: string;
  route: string;
}

const router = useRouter();

const leftSideMenuStore = useLeftSideMenuStore();

const menuConfig : menuItem[] = configs.sideMenuConfig;

function logout() {
  // auth.logout({
  //   makeRequest: true,
  //   redirect: { name: 'login' }
  // })
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
  background-color: #bde0fe;

  &-text {
    font-size: 1.5rem;
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

</style>
