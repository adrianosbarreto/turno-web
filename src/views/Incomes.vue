<template>
  <div>
    <div class="background-color">
      <FilterByMonthYear class="filter" type="income" />
    </div>
    <TransactableList :transactions="incomes"/>

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

    <v-container v-else-if="incomes.length === 0 && !isLoading">
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
  </div>

</template>

<script setup lang="ts">

import TransactableList from "@/components/TransactableList.vue";
import FilterByMonthYear from "@/components/FilterByMonthYear.vue";
import useTransactionStore from "@/store/TransactionStore";
import {storeToRefs} from "pinia";

const { incomes, isLoading } = storeToRefs(useTransactionStore());

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
