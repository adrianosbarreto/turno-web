<template>
  <div class="background-color">
    <FilterByMonthYear class="filter" type="income" />
  </div>
  <TransactableList :transactions="incomes"/>
</template>

<script setup lang="ts">

import TransactableList from "@/components/TransactableList.vue";
import FilterByMonthYear from "@/components/FilterByMonthYear.vue";
import useTransactionStore from "@/store/TransactionStore";
import {storeToRefs} from "pinia";

const { incomes } = storeToRefs(useTransactionStore());

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
