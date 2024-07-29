<template>
      <v-tabs
        v-model="tab"
        class="w-100 px-4"
        color="primary"
      >
        <v-tab v-for="item in tabItens" :value="item.tab">
          <template v-slot:default>
            <span class="tab">
              {{item.tab}}
            </span>
          </template>

        </v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab" class="h-100">
        <v-tabs-window-item
          v-for="item in tabItens"
          :key="item.tab"
          :value="item.tab"
          class="h-100"
        >
          <v-container class="h-100">
            <TransactableList :transactions="transactions" />
          </v-container>

        </v-tabs-window-item>
      </v-tabs-window>

    <TransactionRoundedAddButton :action="() => navigate('/checks/new')"/>

</template>

<script setup lang="ts">

import {ref} from "vue";
import TransactableList from "@/components/TransactableList.vue";
import configs from "@/configs";
import TransactionRoundedAddButton from "@/components/TransactionRoundedAddButton.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const tab = ref(null);

const tabItens = [
  { tab: 'pending' },
  { tab: 'accepted' },
  { tab: 'rejected' }
];

const transactions = configs.transactions;

const navigate = (route: string) : void => {
  router.push(route);
}

</script>

<style scoped lang="scss">
:deep(.v-slide-group__content) {
  padding: 0;
  margin: 0;
  display: flex !important;
  width: 100% !important;
  justify-content: space-between !important;

  :deep(button) {
    padding: 0;
    background-color: #FFFFFF !important;
  }
}

.tab{
  color: #2799FB;
}
</style>
