<template>
    <v-list-item class="transaction-item">
      <template v-slot:title>
        <span class="transaction-title">
          {{ description }}
        </span>
      </template>
      <template v-slot:subtitle>
        <span class="transaction-subtitle">
          {{ date }}
        </span>
      </template>
      <template v-slot:append>
        <span :class="[transaction.type == 'expense' ? 'transaction-expense' : '']">
          {{ amount }}
        </span>
      </template>
    </v-list-item>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import {Transaction} from "@/types/Transaction";

import formatDateTime from "@/util/DateFormat";

const props = defineProps<{
  transaction: Transaction;
}>();

const description = computed(() => {
  const description = props.transaction.description;
  return description.length > 30 ? `${description.slice(0, 30)}...` : description;
});

const date = computed(() => {
  return formatDateTime(props.transaction.created_at) || '';
});

const amount = computed(() => {
  return `${props.transaction.type == 'expense' ? '-' : ''}$${props.transaction.amount}`;
});

</script>


<style scoped lang="scss">

  .transaction {

    &-item {
      color: #2184d9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #2799FB20;

    }

    &-title {
      font-size: 0.8rem;
      font-weight: 700;
      width: 30%;
    }

    &-subtitle {
      font-size: 0.8rem;
      color: #2184d9;
      max-width: 60%;
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
