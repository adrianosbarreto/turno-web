<template>
  <div class="bg-tertiary w-100 h-100">
    <FilterByMonthYear class="filter" type="check" />
  </div>


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

import {onMounted, ref, watch} from "vue";
import TransactableList from "@/components/TransactableList.vue";
import TransactionRoundedAddButton from "@/components/TransactionRoundedAddButton.vue";
import {useRouter} from "vue-router";
import FilterByMonthYear from "@/components/FilterByMonthYear.vue";
import {storeToRefs} from "pinia";
import useTransactionStore from "@/store/TransactionStore";


const transactionStore = useTransactionStore();
const { checks } = storeToRefs(transactionStore);

const router = useRouter();

const tab = ref(null);

const tabItemData = ref([
  { tab: 'pending', type: 'pending', data: [] },
  { tab: 'accepted', type: 'accept',  data: [] },
  { tab: 'rejected', type: 'reject',  data: [] }
]);

onMounted(async () => {
  await transactionStore.fetchChecks(4);
});

watch(checks, (newValue) => {
  fillTabItemData(newValue);
});

function fillTabItemData(apiResponse: any) {
  tabItemData.value.forEach((item) => {
    const key = item.type;

    console.log(apiResponse);

    if (apiResponse[key]) {
      console.log(apiResponse[key]);
      item.data = apiResponse[key];
    }
  });

  console.log(tabItemData.value);
}



// async function getCheckDataForTabs() {
//   return transactionStore.fetchChecks().then((response) => {
//
//     tabItemData.value.forEach((tab) => {
//       tab.data = response.data.data[tab.type] ;
//     });
//
//   })
// }

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

.filter{
  color: #2799FB;
  width: 200px;
  margin: 0 1rem;

}

.bg-tertiary{
  background-color: #F1F9FE;
}
</style>
