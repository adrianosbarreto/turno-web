<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row>
      <v-col cols="12">
        <BalanceResumeItem :card-resume="balance">
          <template v-slot:button>
            <FilterByMonthYear type="all"/>
          </template>
        </BalanceResumeItem>
        <CardResumeTransaction :card-resume="incomes" color="#daefff">
          <template v-slot:button>
            <TransactionAddButton text="Deposit a check" color="#daefff" :action="() => navigate('/checks/new')"/>
          </template>
        </CardResumeTransaction>
        <CardResumeTransaction :card-resume="expenses" color="#f1f9fe" >
          <template v-slot:button>
            <TransactionAddButton text="Purchase" color="#f1f9fe" :action="() => navigate('/expenses/new')"/>
          </template>
        </CardResumeTransaction>
        <v-container class="pt-4 pb-2">
          <v-row>
            <v-col >
              <span class="text-uppercase ma-4 text-primary font-weight-medium">Transactions</span>
            </v-col>
          </v-row>
        </v-container>

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

        <v-container v-else-if="data.length === 0 && !isLoading">
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
        <v-container>
          <v-row>
            <v-col>
              <ListTransactable :transactions="data" />
            </v-col>
          </v-row>
        </v-container>
<!--        <ListTransactable v-else :transactions="data" />-->
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
import {useAccountStore} from "@/store/AccountStore";

const router = useRouter();

const transactionStore = useTransactionStore();

const { totalBalance, totalIncome, totalExpense, data, isLoading} = storeToRefs(transactionStore);

onMounted(async () => {
  await getTransactions();
});

async function getTransactions() {
  return transactionStore.fetchTransactions(useAccountStore().account_id)
}

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
