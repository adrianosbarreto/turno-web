<template>
  <div class="background-color">
    <FilterByMonthYear class="filter" type="expense" />
  </div>

  <TransactableList :transactions="dataExpense"/>
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

const { expenses } = storeToRefs(useTransactionStore());

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
