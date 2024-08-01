<template>
  <FilterByMonthYear class="filter" type="check-pending"/>
  <TransactableList v-if="!isLoading" :transactions="tabItemData"/>
  <v-container v-if="isLoading" class="h-50" >
    <v-row
      class="d-flex justify-center align-center"
    >
      <v-col
        cols="auto"
        class="d-flex flex-column justify-center align-center"
      >
        <v-skeleton-loader
          v-for="n in 10"
          :key="n"
          elevation="0"
          min-width="400"
          type="list-item-two-line"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else-if="tabItemData.length === 0 && !isLoading">
    <v-row
      class="d-flex justify-center align-center"
      style="height: 100%;"
    >
      <v-col
        cols="auto"
        class="d-flex flex-column justify-center align-center"
      >
        <p>No data found for the selected period.</p>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import TransactableList from "@/components/TransactableList.vue";
import FilterByMonthYear from "@/components/FilterByMonthYear.vue";

import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import useTransactionStore from "@/store/TransactionStore";
import {ref, watch} from "vue";

const router = useRouter();

const transactionStore = useTransactionStore();
const { pendingChecks, isLoading } = storeToRefs(transactionStore);

const tabItemData = ref([]);

// onMounted(async () => {
//   await transactionStore.fetchChecks(4);
// });

watch(pendingChecks, (newValue) => {
  fillTabItemData(newValue);
});

function fillTabItemData(apiResponse: any) {
  tabItemData.value = apiResponse;
}

function navigate(route: string) : void {
  router.push(route);
}
</script>

<style scoped lang="scss">
.filter{
  color: #2799FB;
  width: 200px;
  margin: 0 1rem;
  font-size: 16px;
}
</style>
