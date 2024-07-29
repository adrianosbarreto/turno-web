<script setup lang="ts">

import ListTransactable from "@/components/TransactableList.vue";
import {Transaction} from "@/types/Transaction";
import CardResumeTransaction from "@/components/TransactionResumeItem.vue";
import TransactionAddButton from "@/components/TransactionAddButton.vue";
import BalanceResumeItem from "@/components/BalanceResumeItem.vue";
import FilterByMonthYear from "@/components/FilterByMonthYear.vue";
import {useRouter} from "vue-router";
import configs from "@/configs";

const router = useRouter();

const data: Transaction[] = configs.transactions;

const monthYear = configs.monthYear;

const incomes : Transaction = {
  "id": 1,
  "amount": 2350.75,
  "description": "Incomes",
  "date": "2024-07-25T10:20:30Z",
  "type": "expense",
  "createdAt": "2024-07-25T10:20:30Z",
  "updatedAt": "2024-07-25T10:20:30Z"
}

const expenses : Transaction = {
  "id": 1,
  "amount": 250.75,
  "description": "Expenses",
  "date": "2024-07-25T10:20:30Z",
  "type": "expense",
  "createdAt": "2024-07-25T10:20:30Z",
  "updatedAt": "2024-07-25T10:20:30Z"

}




const navigate = (route: string) : void => {
  router.push(route);
}

</script>

<template>
  <v-container class="pa-0 ma-0 h-100" >
    <v-row class="h-100">
      <v-col class="h-100">
        <BalanceResumeItem :transaction="incomes">
          <template v-slot:button>
            <FilterByMonthYear :items="monthYear" />
          </template>
        </BalanceResumeItem>
        <CardResumeTransaction :transaction="incomes" color="#daefff">
          <template v-slot:button>
            <TransactionAddButton text="Deposit a check" color="#daefff" :action="() => navigate('/checks')"/>
          </template>
        </CardResumeTransaction>
        <CardResumeTransaction :transaction="expenses" color="#f1f9fe" >
          <template v-slot:button>
            <TransactionAddButton text="Purchase" color="#f1f9fe" :action="() => navigate('/expenses')"/>
          </template>
        </CardResumeTransaction>
        <v-container class="py-5 pb-0">
          <v-row>
            <v-col >
              <span class="text-uppercase my-5 text-primary font-weight-medium">Transactions</span>
            </v-col>
          </v-row>
        </v-container>
        <ListTransactable :transactions="data" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">

</style>
