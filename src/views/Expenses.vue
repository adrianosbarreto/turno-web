<template>
  <div class="background-color">
    <FilterByMonthYear class="filter" type="expense" />
  </div>

  <TransactableList :transactions="dataExpense"/>
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

  <v-container v-else-if="dataExpense.length === 0 && !isLoading">
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

  <TransactionRoundedAddButton :action="() => navigate('/expenses/new')"/>
</template>

<script setup lang="ts">

import TransactableList from "@/components/TransactableList.vue";
import FilterByMonthYear from "@/components/FilterByMonthYear.vue";
import TransactionRoundedAddButton from "@/components/TransactionRoundedAddButton.vue";
import {useRouter} from "vue-router";
import useTransactionStore from "@/store/TransactionStore";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const router = useRouter();

const { expenses, isLoading } = storeToRefs(useTransactionStore());

const dataExpense = computed(() => {
  return expenses.value.filter((transaction) => transaction.type === 'expense');
});

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

  .background-color{
    background-color: #F1F9FE;
    padding-bottom: 1rem;
  }
</style>
