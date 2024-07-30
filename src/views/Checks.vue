<template>
      <v-tabs
        v-model="tab"
        class="w-100 px-4"
        color="primary"
      >
        <v-tab v-for="item in tabItemData" :value="item.tab">
          <template v-slot:default>
            <span class="tab">
              {{item.tab}}
            </span>
          </template>

        </v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab" class="h-100">
        <v-tabs-window-item
          v-for="item in tabItemData"
          :key="item.tab"
          :value="item.tab"
          class="h-100"
        >
          <v-container class="ma-0 pa-0 h-100">
            <TransactableList :transactions="item.data" />
          </v-container>

        </v-tabs-window-item>
      </v-tabs-window>

    <TransactionRoundedAddButton :action="() => navigate('/checks/new')"/>

</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import TransactableList from "@/components/TransactableList.vue";
import TransactionRoundedAddButton from "@/components/TransactionRoundedAddButton.vue";
import {useRouter} from "vue-router";
import {getChecks} from "@/services/CheckService";

const router = useRouter();

const tab = ref(null);

const tabItemData = ref([
  { tab: 'pending', type: 'pending', data: [] },
  { tab: 'accepted', type: 'accept',  data: [] },
  { tab: 'rejected', type: 'reject',  data: [] }
]);

onMounted(async () => {
  await getCheckDataForTabs();
});

async function getCheckDataForTabs() {
  return getChecks('1', 5, 1996).then((response) => {
    console.log(response.data)
    tabItemData.value.forEach((tab) => {
      console.log(tab.type, response.data.data[tab.type]);
      tab.data = response.data.data[tab.type] ;
    });

    console.log(tabItemData);
  })
}

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
