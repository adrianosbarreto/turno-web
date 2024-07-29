<template>
  <FilterByMonthYear :items="monthYear" class="filter" />
  <TransactableList :transactions="data"/>
</template>

<script setup lang="ts">
import {Transaction} from "@/types/Transaction";
import configs from "@/configs";
import TransactableList from "@/components/TransactableList.vue";
import FilterByMonthYear from "@/components/FilterByMonthYear.vue";

import {useRouter} from "vue-router";

const router = useRouter();

const data: Transaction[] = configs.transactions;

const monthYear = configs.monthYear;

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
