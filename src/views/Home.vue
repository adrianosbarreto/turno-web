<template>
  <v-container class="pa-0 ma-0 h-100" >
    <v-row class="h-100">
      <v-col class="h-100">
        <BalanceResumeItem :card-resume="balance">
          <template v-slot:button>
            <FilterByMonthYear :items="monthYear" />
          </template>
        </BalanceResumeItem>
        <CardResumeTransaction :card-resume="incomes" color="#daefff">
          <template v-slot:button>
            <TransactionAddButton text="Deposit a check" color="#daefff" :action="() => navigate('/checks')"/>
          </template>
        </CardResumeTransaction>
        <CardResumeTransaction :card-resume="expenses" color="#f1f9fe" >
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

        <v-container v-if="isLoading" class="h-50" >
          <v-row
            class="d-flex justify-center align-center"
            style="height: 100%;"
          >
            <v-col
              cols="auto"
              class="d-flex flex-column justify-center align-center"
            >
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
              <span class="display-1">Loading...</span>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-else-if="transactions.length === 0 && !isLoading">
          <v-row
            class="d-flex justify-center align-center"
            style="height: 100%;"
          >
            <v-col
              cols="auto"
              class="d-flex flex-column justify-center align-center"
            >
              <p>No transactions found for the selected period.</p>

            </v-col>
          </v-row>
        </v-container>
        <ListTransactable v-else :transactions="transactions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

import ListTransactable from "@/components/TransactableList.vue";
import CardResumeTransaction from "@/components/TransactionResumeItem.vue";
import TransactionAddButton from "@/components/TransactionAddButton.vue";
import BalanceResumeItem from "@/components/BalanceResumeItem.vue";
import FilterByMonthYear from "@/components/FilterByMonthYear.vue";
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import useTransactionStore from "@/store/TransactionStore";
import { storeToRefs } from "pinia";
import { CardResume } from "@/types/CardResume";
import { getLast12Months } from "@/util/DateFormat";

const router = useRouter();

const transactionStore = useTransactionStore();

const { totalBalance, totalIncome, totalExpense, transactions, isLoading} = storeToRefs(transactionStore);

onMounted(async () => {
  await getTransactions();
});

async function getTransactions() {
  return transactionStore.fetchTransactions(4)
}

const monthYear = getLast12Months();

const balance : CardResume = {
  "amount": totalBalance,
  "description": "Balance",
}

const incomes : CardResume = {
  "amount": totalIncome,
  "description": "Incomes",
}

const expenses : CardResume = {
  "amount": totalExpense,
  "description": "Expenses",
}

const navigate = (route: string) : void => {
  router.push(route);
}

</script>

<style scoped lang="scss">

</style>
