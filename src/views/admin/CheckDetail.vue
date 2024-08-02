<template>
  <div class="">
    <div v-if="loading" class="text-center pt-16">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-card v-else class="ma-4 pt-10" elevation="0">
      <div class="flex-column justify-space-between">
        <v-row class="pa-4">
          <v-col cols="12" class="my-4">
            <v-label class="text-field text-uppercase font-weight-bold pt-4">
              <v-icon size="30" :icon="mdiAccount"> </v-icon>
              <p class="pl-3">Customer</p>
            </v-label>
          </v-col>
          <v-col cols="12" class="py-0 pl-11">
            <p class="text-md text-primary">
              {{ check.username }}
            </p>
          </v-col>
          <v-col cols="12" class="pb-0">
            <v-label class="text-field text-uppercase font-weight-bold">
              <v-icon size="30" :icon="mdiEmail"> </v-icon>
              <p class="pl-3">Customer email</p>
            </v-label>
          </v-col>
          <v-col cols="12" class="py-0 pl-11">
            <div class="d-flex align-center justify-space-between">
              <p class="text-md text-primary">
                {{ check.email }}
              </p>
              <v-btn variant="text">
                <v-icon size="30" :icon="mdiChevronRight" color="#2799FB"> </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" class="pb-0">
            <v-label class="text-field text-uppercase font-weight-bold">
              <v-icon size="30" :icon="mdiAccount"> </v-icon>
              <p class="pl-3">Account</p>
            </v-label>
          </v-col>
          <v-col cols="12" class="py-0 pl-11">
            <div class="d-flex align-center justify-space-between">
              <p class="text-md text-primary">
                {{ check.account }}
              </p>
              <v-btn variant="text">
                <v-icon size="30" :icon="mdiChevronRight" color="#2799FB"> </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" class="pb-0">
            <v-label class="text-field text-uppercase font-weight-bold">
              <v-icon size="30" :icon="mdiCash100"> </v-icon>
              <p class="pl-3">Reported amount</p>
            </v-label>
          </v-col>
          <v-col cols="12" class="py-0 pl-11">
            <p class="text-md text-primary">
              ${{ check.amount }}
            </p>
          </v-col>
        </v-row>
      </div>
      <div class="image pt-4">
        <v-img height="100%" cover :src="check.picture"></v-img>
      </div>
      <v-container fluid class="py-4">
        <v-row class=" pa-4">
          <v-col>
            <v-btn
              class="text-xxs text-uppercase py-3 mr-3"
              variant="outlined"
              color="primary"
              width="100%"
              height="100%"
              elevation="0"
              @click="rejectCheck"
            >
              <v-icon :icon="mdiAlphaXCircle"></v-icon>
              <p class="font-weight-bold">Reject</p>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              class="text-xxs text-uppercase py-3 ml-3"
              color="primary"
              width="100%"
              height="100%"
              elevation="0"
              @click="acceptCheck"
            >
              <v-icon :icon="mdiCheckCircle"></v-icon>
              <p class="font-weight-bold">Accept</p>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

    </v-card>
  </div>

</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import type { Ref } from 'vue'

import {
  mdiAccount,
  mdiEmail,
  mdiChevronRight,
  mdiCash100,
  mdiCheckCircle,
  mdiAlphaXCircle
} from '@mdi/js'
import {useRoute, useRouter} from "vue-router";
import {evaluateCheck, getCheckById} from "@/services/CheckService";
import {useNotificationStore} from "@/store/NotificationStore";

const loading = ref(false)
const router = useRoute();
const routerRedirect = useRouter();

const notificationStore = useNotificationStore();

const routeId = router.params.id;

interface Check {
  id: number
  amount: number
  picture: string
  username: string
  email: string
  account: string
}

const check: Ref<Check> = ref({
  id: 0,
  amount: 0.0,
  picture: '',
  username: '',
  email: '',
  account: ''
})


onMounted(() => {

  loading.value = true
  getCheckById(routeId)
    .then((res) => {
      check.value = res.data.data
    })
    .finally(() => {
      loading.value = false
    })
})

function acceptCheck() {
  evaluateCheck(routeId, 'approve')
    .then((response) => {
      if(response.status === 200){
        notificationStore.showNotification(
          `${response.data.message}`,
          'success',
          2000
        );
        routerRedirect.push('/admin/check-control')
      }
      else{
        console.log(response.message)
        notificationStore.showNotification(
          `${response.message}`,
          'error',
          2000
        );
      }
    });
}

function rejectCheck() {
  evaluateCheck(routeId, 'reject')
    .then((response) => {
      if(response.status === 200){
        notificationStore.showNotification(
          `${response.data.message}`,
          'success',
          2000
        );

        routerRedirect.push('/admin/check-control')
      }
      else{
        console.log(response.message)
        notificationStore.showNotification(
          `${response.message}`,
          'error',
          2000
        );
      }
    });
}



</script>

<style lang="scss">
.text-field{
  color: #2799FB;
  font-size: 0.7rem;
  //background-color: #F51E00;
}

.text-md{
  font-size: 1.2rem;
  color: #2799FB;
  padding-left: 2.0rem;
  padding-bottom: 1rem;
  font-weight: 700;

}

.text-large{
  font-size: 1.5rem;
  color: #2799FB;
}

.image {
  max-height: 350px;
  max-width: 400px;
}

.button-end-page {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
