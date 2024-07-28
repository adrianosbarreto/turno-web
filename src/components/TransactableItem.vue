<template>
    <v-list-item class="transaction-item">
      <template v-slot:title>
        <span class="transaction-title">
          {{ props.transaction.description }}
        </span>
      </template>
      <template v-slot:subtitle>
        <span class="transaction-subtitle">
          ${{ formatDateTime(props.transaction.date) || '' }}
        </span>
      </template>
      <template v-slot:append>
        <span :class="[transaction.type == 'expense' ? 'transaction-expense' : '']">
          {{transaction.type == 'expense' ? '-' : ''}}
          ${{ props.transaction.amount }}
        </span>
      </template>
    </v-list-item>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import {Transaction} from "@/types/Transaction";

import formatDateTime from "@/util/DateFormat";

const props = defineProps<{
  transaction: Transaction;
}>();

</script>


<style scoped lang="scss">

  .transaction {

    &-item {
      color: #2184d9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #E0E0E0;
    }

    &-title {
      font-size: 0.8rem;
      font-weight: 700;
    }

    &-subtitle {
      font-size: 0.8rem;
      color: #2184d9;
    }

    &-amount {
      font-size: 1rem;
      font-weight: 400;
    }

    &-expense {
      color: #FF0000;
    }
  }

</style>
